import { Cipher } from '../../cipher/cipher';
import { DES } from './des';
import { DESKey } from './des-key';

export class DESCipher extends Cipher {
    encrypt(input:string):string{
        return DES.compute((<DESKey>this.key),input,true);
    }
    decrypt(input:string):string{
        return DES.compute((<DESKey>this.key),input,false);
    }
}