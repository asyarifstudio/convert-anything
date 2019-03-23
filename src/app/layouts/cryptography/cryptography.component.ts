import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/service/crypto/crypto.service';
import { Key } from 'src/app/service/crypto/key/key';
import { SecretKey } from 'src/app/service/crypto/key/secret-key';
import { Cipher } from 'src/app/service/crypto/cipher/cipher';
import { Padding } from 'src/app/service/crypto/cipher/padding';

@Component({
  selector: 'as-cryptography',
  templateUrl: './cryptography.component.html',
  styleUrls: ['./cryptography.component.scss']
})
export class CryptographyComponent implements OnInit {

  constructor(private crypto:CryptoService) { }

  ngOnInit() {
  }

  test(){
    let key:SecretKey = <SecretKey>this.crypto.buildKey(CryptoService.KEY_DES);
    let padding:Padding = this.crypto.getPadding(CryptoService.PADDING_ALGO_ZERO_PADDING);
    let cipher:Cipher = this.crypto.getCipher(CryptoService.CRYPTO_ALGO_DES);
    key.setKey("test");

    cipher.setKey(key);
    cipher.setPadding(padding);

    cipher.encrypt("test value");
    cipher.decrypt("test value");
    
  }

}
