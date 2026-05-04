class ValidadorCPF {
    constructor(cpf) {
        Object.defineProperty(this, "CPFLimpo", {
            writable: false,
            enumerable: false,
            configurable: false,
            value: cpf.replace(/\D+/g, '')
        })
    }

    sequencia() {
        return this.CPFLimpo.charAt(0).repeat(11) === this.CPFLimpo;
    }

    static gerarDigito(CPFSemDigitos) {
        let total = 0;
        let reverso = CPFSemDigitos.length + 1;
        for (let stringNumerica of CPFSemDigitos) {
            total += reverso * Number(stringNumerica);
            reverso--
        }
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : "0";
    }

    gerarCPF() {
        const CPFSemDigitos = this.CPFLimpo.slice(0, -2);
        const digito1 = ValidadorCPF.gerarDigito(CPFSemDigitos);
        const digito2 = ValidadorCPF.gerarDigito(CPFSemDigitos + digito1);
        this.CPFGerado = CPFSemDigitos + digito1 + digito2;
    }

    validar() {
        if(!this.CPFLimpo) return false;
        if(typeof this.CPFLimpo !== "string") return false;
        if(this.CPFLimpo.length !== 11) return false;
        if (this.sequencia()) return false;
        this.gerarCPF()
        return this.CPFGerado === this.CPFLimpo
    }
}