import { Key } from '../key/key';
import { Padding } from './padding';
import { CryptoService } from '../crypto.service';
import { ZeroPadding } from '../padding/zero-padding';

export abstract class Cipher {
    algo:number;
    key:Key;
    padding:Padding;

    constructor(algo:number){
        this.algo = algo;
    }

    setPadding(padding:Padding){
        this.padding = padding;
    }

    setKey(key:Key):void{
        this.key = key;
    }
    encrypt(input:string):string{return null}
    decrypt(input:string):string{return null}
    getAlgo():number{
        return this.algo;
    }
}