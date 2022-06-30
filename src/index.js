const express = require("express");
const app = express();
app.use(express.json());

/**
 * name - string
 * employeeRegistration - string
 * password - string
 * cpf - string
 * email - string
 * birthDate - string
 * cellPhone - string
 * classes - []
 * createdAt - string
 */
const employees = [];

/**
 * name - string
 * id - string
 * createdAt - string
 */
const classes = [];

function verifyIfEmployeeAlreadyExists(req, res, next) {
    const {employeeRegistration} = req.body;
    const employeeAlreadyExists = employees.some((employee) => 
        employee.employeeRegistration === employeeRegistration
    );
    if(employeeAlreadyExists) {
        return res.status(400).json({
            error: "Employee already exists!"
        });
    };
    return next();
};

function verifyIfEmployeeExists(req, res, next) {
    const {employeeRegistration} = req.body;
    const employee = employees.find((employee) => 
        employee.employeeRegistration === employeeRegistration
    );
    if(!employee) {
        return res.status(400).json({
            error: "Employee not found!"
        });
    };
    req.employee = employee;
    return next();
};

function verifyIfClassAlreadyExists(req, res, next) {
    const {id} = req.body;
    const classAlreadyExists = classes.some((classId) => 
        classId.id === id
    );
    if(classAlreadyExists) {
        return res.status(400).json({
            error: "Class already exists!"
        });
    };
    return next();
};

function verifyIfClassExists(req, res, next) {
    const {id} = req.body;
    const classId = classes.find((classId) => 
        classId.id === id
    );
    if(!classId) {
        return res.status(400).json({
            error: "Class not found!"
        });
    };
    req.classId = classId;
    return next();
};

function verifyIfClassAlreadyLinkedEmployee(req, res, next) {
    const {id} = req.body;
    const {employee} = req;
    if(employee.class.indexOf(id) === -1) {
        return next();
    } else {
        return res.status(400).json({
            error: "Class already linked!"
        });
    };
};

function nameFormated(name) {
    return name.toUpperCase();
};

function verifyClassLinkedEmployee(req, res, next) {
    const {classId} = req;
    if(classId.employee == "") {
        return next();
    } else {
        return res.status(400).json({
            error: "Class linked at employee!"
        });
    };
};

function verifyLogin(req, res, next) {
    const {employee} = req;
    const {cpf, senha} = req.headers;
    if(employee.cpf === cpfFormated(cpf) && employee.senha === senha) {
        return next();
    } else {
        return res.status(400).json({
            error: "Invalid login!"
        });
    };
};

function verifyCPF(req, res, next) {
    const {cpf} = req.body;
    let add, rev;
    //cpf = cpf.replace(/[^\d]+/g,'');
	if(cpf == '') {
        return res.json({
            error: "Invalid CPF!"
        })
    }
	// Elimina CPFs inválidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999") {
			return res.json({
                error: "Invalid CPF!"
            })
    }
    add = 0;
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
        return res.json({
            error: "Invalid CPF!"
        })
	// Valida 2º digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10))) {
    return res.json({
        error: "Invalid CPF!"
    })
    }
	return next();   
};

function cpfFormated(cpf) {
    return cpf.substring(0, 3)+"."+cpf.substring(3, 6)+"."+cpf.substring(6, 9)+"-"+cpf.substring(9, 11);
};

function cellFormated(number) {
    return number.substring(0, 3)+" ("+number.substring(3, 5)+") "+number.substring(5, 10)+"-"+number.substring(10, 14);
};

function monthFormated(value) {
    if(value<10) {
        return "0"+value;
    } else {
        return value;
    };
};

function dateFormated(day, month, year) {
    return day+"/"+month+"/"+year;
};

app.post("/register/employee", verifyIfEmployeeAlreadyExists, verifyCPF, (req, res) => {
    const {name, employeeRegistration, password, cpf, email, birthDate, cellPhone} = req.body;
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = monthFormated(newDate.getMonth()+1);
    const day = newDate.getDate();
    employees.push({
        name: nameFormated(name),
        employeeRegistration,
        cpf: cpfFormated(cpf),
        password,
        email,
        birthDate,
        cellPhone: cellFormated(cellPhone),
        createdAt: dateFormated(day, month, year),
        class: []
    });
    return res.status(201).send();
});

app.post("/register/class", verifyIfClassAlreadyExists, (req, res) => {
    const {name, id} = req.body;
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = monthFormated(newDate.getMonth()+1);
    const day = newDate.getDate();
    classes.push({
        name,
        id,
        createdAt: dateFormated(day, month, year),
        employee: []
    });
    return res.status(201).send();
});

app.put("/register/employee/class", verifyIfEmployeeExists, verifyIfClassExists, verifyIfClassAlreadyLinkedEmployee, (req, res) => {
    const {employee, classId} = req;
    const {id} = req.body;
    employee.class.push(id);
    classId.employee.push(employee.employeeRegistration);
    return res.status(201).send();
});

app.get("/employees", (req, res) => {
    return res.status(201).send(employees);
});

app.get("/search/registration", verifyIfEmployeeExists, (req, res) => {
    const {employee} = req;
    return res.status(201).send(employee);
});

app.get("/search/cpf", verifyCPF, (req, res) => {
    const {cpf} = req.body;
    const searchByCPF = employees.find((searchByCPF) => 
        searchByCPF.cpf === cpfFormated(cpf)
    );
    if(!searchByCPF) {
        return res.status(400).json({
            error: "Employee not found!"
        });
    };
    return res.status(201).send(searchByCPF);
});

app.get("/search/name", (req, res) => {
    const {name} = req.body;
    const searchByName = employees.find((searchByName) => 
        searchByName.name === nameFormated(name)
    );
    if(!searchByName) {
        return res.status(400).json({
            error: "Employee not found!"
        });
    };
    return res.status(201).send(searchByName);
});

app.get("/classes", (req, res) => {
    return res.status(201).send(classes);
});

app.get("/search/classes/registration", verifyIfEmployeeExists, (req, res) => {
    const {employee} = req;
    return res.status(201).send(employee.class);
});

app.get("/search/class", verifyIfClassExists, (req, res) => {
    const {classId} = req;
    return res.status(201).send(classId);
});

app.patch("/employee", verifyIfEmployeeExists, verifyLogin, (req, res) => {
    const {name, password, email, birthDate, cellPhone} = req.body;
    const {employee} = req;
    employee.name = name;
    employee.password = password;
    employee.email = email;
    employee.birthDate = birthDate;
    employee.cellPhone = cellFormated(cellPhone);
    return res.status(201).send();
});

app.delete("/employee", verifyIfEmployeeExists, (req, res) => {
    const {employee} = req;
    if(employee.class != "") {
        for (const valueClass of classes) {
            for (const valueEmployee of valueClass.employee) {
                if(valueEmployee === employee.employeeRegistration) {
                    break;
                };
            };
            const index = (valueClass.employee).indexOf(employee.employeeRegistration);
            (valueClass.employee).splice(index, 1);
            break;
        };
    };
    const index = employees.indexOf(employee);
    employees.splice(index, 1);
    return res.status(200).json(employees);
});

app.delete("/class", verifyIfClassExists, verifyClassLinkedEmployee,(req, res) => {
    const {classId} = req;
    const index = classes.indexOf(classId);
    classes.splice(index, 1);
    return res.status(200).json(classes);
});

app.listen(3333);