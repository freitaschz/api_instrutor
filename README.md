# API Instrutor

[![Forks][forks-shield]][forks-url]
[![Stars][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

API desenvolvida, como trabalho no curso Técnico em Desenvolvimento de Sistemas, usando NodeJS e o Express.

> Uma API para cadastro de instrutores e classes, verificação e exclusão dos mesmos. Ambos possuem validações, atribuições e formatações.

### Requisitos

-   [x] Deve ser possível cadastrar um instrutor
-   [x] Deve ser possível cadastrar turmas
-   [x] Deve ser possível vincular turmas ao instrutor
-   [ ] Deve ser possível desvincular turmas ao instrutor
-   [x] Deve ser possível buscar todos os instrutores
-   [x] Deve ser possível buscar um instrutor pelo registro
-   [x] Deve ser possível buscar um instrutor pelo cpf
-   [x] Deve ser possível buscar um/vários instrutores pelo nome
-   [x] Deve ser possível buscar todas as turmas
-   [x] Deve ser possível buscar todas as turmas de um instrutor
-   [x] Deve ser possível buscar uma turma de uma instrutor
-   [x] Deve ser possível alterar o nome, e-mail, data de nascimento e telefone de um instrutor
-   [x] Deve ser possível alterar (atualizar) a senha do instrutor
-   [x] Deve ser possível deletar um instrutor
-   [x] Deve ser possível deletar uma turma

### Regras de Negócio

-   [x] Não deve ser possível cadastrar uma instrutor com registro já existente
-   [x] Não deve ser possível cadastrar uma turma com o código já existente
-   [x] Não deve ser possível buscar um instrutor não existente
-   [x] Não deve ser possível buscar uma turma não existente
-   [x] Não deve ser possível excluir um instrutor não existente
-   [x] Não deve ser possível excluir uma turma não existente
-   [x] Não deve ser possível excluir uma turma se esta estiver vinculada para algum instrutor
-   [x] Não deve ser possível vincular a mesma turma para o mesmo instrutor

### Ajustes e melhorias

O projeto está concluído de acordo com os requisitos do trabalho, mas ainda em desenvolvimento com futuras atualizações, como objetivo de melhorar a API e obter mais conhecimento nos estudos em cima dela. As próximas atualizações serão voltadas para as seguintes tarefas:

-   [x] Validação de CPF
-   [x] Formatação de CPF
-   [x] Formatação de número de celular

## 🚀 Tecnologias Utilizadas

-   `NodeJS`
-   `Express`
-   `Insomnia`

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.

[⬆ Voltar ao topo](#)<br>

<!-- BADGE LINKS & IMAGES -->

[forks-shield]: https://img.shields.io/github/forks/thiagofqs/api_instrutor.svg?style=for-the-badge
[forks-url]: https://github.com/thiagofqs/api_instrutor/network/members
[stars-shield]: https://img.shields.io/github/stars/thiagofqs/api_instrutor.svg?style=for-the-badge
[stars-url]: https://github.com/thiagofqs/api_instrutor/stargazers
[issues-shield]: https://img.shields.io/github/issues/thiagofqs/api_instrutor.svg?style=for-the-badge
[issues-url]: https://github.com/thiagofqs/api_instrutor/issues
[license-shield]: https://img.shields.io/github/license/thiagofqs/api_instrutor.svg?style=for-the-badge
[license-url]: https://github.com/thiagofqs/api_instrutor/blob/main/LICENSE
