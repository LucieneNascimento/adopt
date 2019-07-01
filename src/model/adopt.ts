export class Adopt{

    id : string;
    nome : string;
    tipo : string;
    idade : string;
    genero : string;
    raca : string;
    tamanho : string;
    foto: string;
    
    constructor (obj : any){
        this.nome = obj.nome;
        this.tipo = obj.tipo;
        this.idade = obj.idade;
        this.genero = obj.genero;
        this.raca = obj.raca;
        this.tamanho = obj.tamanho;
        this.foto = obj.foto;
    }
}