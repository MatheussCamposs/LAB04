class Funcionario{
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    get_nome() { return this.nome; }
    get_idade() { return this.idade; }
    get_cargo() { return this.cargo; }
    get_salario() { return this.salario; }

    set_nome(nome) { this.nome = nome; }
    set_idade(idade) { this.idade = idade; }
    set_cargo(cargo) { this.cargo = cargo; }
    set_salario(salario) { this.salario = salario; }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salario: ${this.salario.toFixed(2)}`;
    }
}

class FuncionarioController {
    constructor() {
        this.funcionarios = [];
        this.init();
    }

    init() {
        document.getElementById('btsalvar').addEventListener("click", (e) => this.salvar(e));
    }

    salvar(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const cargo = document.getElementById('cargo').value;
        const salario = parseFloat(document.getElementById('salario').value);

        const funcionario = new Funcionario();

        funcionario.set_nome(nome);
        funcionario.set_idade(idade);
        funcionario.set_cargo(cargo);
        funcionario.set_salario(salario);

        this.funcionarios.push(funcionario);

        this.atualizarTabela();
        this.limpaFormulario();
    }

    atualizarTabela() {
        const tabela = document.getElementById("tabela");
        tabela.innerHTML = "";

        this.funcionarios.forEach((funcionario, index) => {
            const row = tabela.insertRow();

            row.insertCell(0).innerText = index + 1;
            row.insertCell(1).innerText = funcionario.get_nome();
            row.insertCell(2).innerText = funcionario.get_idade();
            row.insertCell(3).innerText = funcionario.get_cargo();
            row.insertCell(4).innerText = funcionario.get_salario().toFixed(2);
        });
    }

    limpaFormulario() {
        document.getElementById('nome').value = '';
        document.getElementById('idade').value = '';
        document.getElementById('cargo').value = '';
        document.getElementById('salario').value = '';
    }
}

new FuncionarioController();

