import { SecretKey } from '../../key/secret-key';

export class DESKey implements SecretKey {
    private keyValue:string;
    
    keyType:number;

    constructor(keyType:number){
        this.keyType = keyType;
    }
    setKey(keyValue:string):void{
        this.keyValue = keyValue;
    }
    getKey():string{
        return this.keyValue;
    }
    getType():number{
        return this.keyType;
    }
    getSize():number{
        return (this.keyValue.length / 2);
    }
}