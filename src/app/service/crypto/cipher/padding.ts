export abstract class Padding {
    algo:number;

    constructor(algo:number){
        this.algo = algo;
    }
    
    doPadding(input:string, length:number):string{
        return null
    }
}