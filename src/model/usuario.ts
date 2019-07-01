export class Usuario{

    
    nome : string;
    dNascimento: number;
    cpf : number;
    cnpj: number;
    cep: number;
    telefone : number;
    foto : string;

    constructor(){
    }

    setDados(obj : any){
        this.nome = obj.nome;
        this.cpf = obj.cpf;
        this.cnpj = obj.cnpj;
        this.cep = obj.cep;
        this.telefone = obj.telefone;
    }
}