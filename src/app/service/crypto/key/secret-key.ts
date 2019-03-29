import { Key } from './key';

export interface SecretKey extends Key {
    setKey(keyValue:string):void;
    getKey():string;
}