import { SecretKey } from '../../key/secret-key';

export class DESKey implements SecretKey {
    keyType:number;

    constructor(keyType:number){
        this.keyType = keyType;
    }
    setKey(keyValue:string):void{}
    getKey(keyValue:string):void{}
    getType():number{
        return this.keyType;
    }
    getSize():number{
        return null;
    }
}