class ValidadorFormulario {
    constructor() {
        this.formulario = document.getElementById("form-register");
        this.eventos()
    }

    eventos() {
        this.formulario.addEventListener("submit", e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas();

        if (camposValidos && senhasValidas) {
            console.log("Formulário enviado!")
            this.formulario.submit();
        }
    }

    camposSaoValidos() {
        let valido = true;

        for (let msgErro of this.formulario.querySelectorAll(".msg-erro")) {
            msgErro.remove();
        }

        for(let campo of this.formulario.querySelectorAll(".input-text")) {
            const label = campo.previousElementSibling.innerText;
            if (!campo.value) {
                this.criaErro(campo, `O campo "${label}" não pode ser vazio.`);
                valido = false;
            }

            if (campo.id === "input-name" || campo.id === "input-surname") {
                if (campo.value) {
                   if (campo.classList.contains("campo-erro")) {
                       campo.classList.remove("campo-erro")
                    }
                }
            }

            if (campo.id === "input-cpf") {
                if (!this.validarCPF(campo)) valido = false;
            }

            if (campo.id === "input-user") {
                if (!this.validarUser(campo)) valido = false;
            }
        }

        return valido;
    }

    criaErro(campo, mensagem) {
        const span = document.createElement("span");
        span.innerText = mensagem;
        span.classList.add("msg-erro");
        campo.classList.add("campo-erro")
        campo.insertAdjacentElement("afterend", span);
    }

    validarCPF(campo) {
        const cpf = new ValidadorCPF(campo.value);
        if(!cpf.validar()) {
            this.criaErro(campo, "CPF inválido.")
            return false;
        }
        if (campo.classList.contains("campo-erro")) {
            campo.classList.remove("campo-erro");
        }
        return true;
    }

    validarUser(campo) {
        const user = campo.value;
        let valido = true;
        if(user.length < 3 || user.length > 12) {
            this.criaErro(campo, "O nome de usuário deve ter entre 3 e 12 caractereres.");
            campo.classList.add("campo-erro");
            valido = false;
        }
        if(!user.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, "O nome de usuário deve conter apenas letras e/ou números.");
            campo.classList.add("campo-erro");
            valido = false;
        }
        if (campo.classList.contains("campo-erro") && valido === true) {
            campo.classList.remove("campo-erro");
        }
        return valido
    }

    senhasSaoValidas() {
        let valido = true;

        const senha = document.getElementById("input-password");
        const rsenha = document.getElementById("input-rpassword");

        if (rsenha.value !== senha.value) {
            valido = false;
            this.criaErro(rsenha, "As senhas precisam ser iguais.")
            rsenha.classList.add("campo-erro");
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valido = false;
            this.criaErro(senha, "A senha precisa ter entre 6 e 12 caracteres")
            senha.classList.add("campo-erro");
        }
        if (senha.classList.contains("campo-erro") && valido === true) {
            senha.classList.remove("campo-erro");
        }if (rsenha.classList.contains("campo-erro") && valido === true) {
            rsenha.classList.remove("campo-erro");
        }
        return valido;
    }
}

const validador = new ValidadorFormulario();