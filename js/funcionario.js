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
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: ${this.salario.toFixed(2)}`;
    }
}

class FuncionarioController {
    constructor() {
        this.funcionarios = [];
        this.editando = false;
        this.indexEditando = null;
        this.init();
    }

    init() {
        document.getElementById("btsalvar").addEventListener("click", (e) => this.salvar(e));
        document.getElementById("btbuscar").addEventListener("click", () => {
            const nome = document.getElementById("nomebusca").value;
            const resultado = this.buscarPorNome(nome);
            const resultadoEl = document.getElementById("resultadoBusca");

            if(resultado) {
                resultadoEl.innerText = `Funcionário encontrado: ${resultado.toString()}`;
            } 
            else {
                resultadoEl.innerText = "Funcionário não encontrado.";
            }
        });
    }

    salvar(e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const idade = parseInt(document.getElementById("idade").value);
        const cargo = document.getElementById("cargo").value;
        const salario = parseFloat(document.getElementById("salario").value);

        const funcionario = new Funcionario();

        funcionario.set_nome(nome);
        funcionario.set_idade(idade);
        funcionario.set_cargo(cargo);
        funcionario.set_salario(salario);

        if(this.editando) {
            this.funcionarios[this.indexEditando] = funcionario;
            this.editando = false;
            this.indexEditando = null;
            document.getElementById("btsalvar").value = "Salvar";
        }
        else {
            this.funcionarios.push(funcionario);
        }

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

            const actionCell = row.insertCell(5);

            const btEditar = document.createElement("button");
            btEditar.innerText = "Editar";
            btEditar.type = "button";
            btEditar.addEventListener("click", () => this.editar(index));

            const btExcluir = document.createElement("button");
            btExcluir.innerText = "Excluir";
            btExcluir.type = "button";
            btExcluir.addEventListener("click", () => this.excluir(index));

            actionCell.appendChild(btEditar);
            actionCell.appendChild(btExcluir);
        });
    }

    editar(index) {
        const funcionario = this.funcionarios[index];

        document.getElementById("nome").value = funcionario.get_nome();
        document.getElementById("idade").value = funcionario.get_idade();
        document.getElementById("cargo").value = funcionario.get_cargo();
        document.getElementById("salario").value = funcionario.get_salario();

        this.editando = true;
        this.indexEditando = index;
        document.getElementById("btsalvar").value = "Salvar Edição";

        this.excluir(index);
    }

    excluir(index) {
        this.funcionarios.splice(index, 1);
        this.atualizarTabela();
    }

    buscarPorNome = (nome) => this.funcionarios.find(f => f.get_nome().toLowerCase() === nome.toLowerCase());

    limpaFormulario() {
        document.getElementById("nome").value = "";
        document.getElementById("idade").value = "";
        document.getElementById("cargo").value = "";
        document.getElementById("salario").value = "";
    }
}

new FuncionarioController();

