import { Injectable } from '@angular/core';
import { Cipher } from './cipher/cipher';
import { DESCipher } from './algo/DES/des-cipher';
import { Key } from './key/key';
import { DESKey } from './algo/DES/des-key';
import { Padding } from './cipher/padding';
import { ZeroPadding } from './padding/zero-padding';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  /** crypto algo */
  public static CRYPTO_ALGO_DES:number = 1;

  /** padding algo */
  public static PADDING_ALGO_ZERO_PADDING:number = 1;

  /** key object */
  public static KEY_DES:number = 1;

  constructor() { }

  getCipher(algo:number):Cipher{
    let cipher:Cipher;

    if(algo==CryptoService.CRYPTO_ALGO_DES){
      cipher = new DESCipher(algo);
    }

    return cipher;
  }

  getPadding(algo:number):Padding{
    let padding:Padding;

    if(algo==CryptoService.PADDING_ALGO_ZERO_PADDING){
      padding = new ZeroPadding(algo);
    }

    return padding;
  }

  buildKey(keyType:number):Key{
    let key:Key;

    if(keyType == CryptoService.KEY_DES){
      key = new DESKey(keyType);
    }
    return key;
  }

}
