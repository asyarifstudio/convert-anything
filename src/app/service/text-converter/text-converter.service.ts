import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextConverterService {

  public static FORMAT_ASCII:number = 1;
  public static FORMAT_HEX:number = 2;
  public static FORMAT_BIN:number = 3;
  
  constructor() { }

  /**
   * do text conversion
   * @param input input data
   * @param inputFormat input Format
   * @param outputFormat output format
   */
  public convert(input:string,inputFormat:number,outputFormat:number):string{
    // hex will be intermediate result
    let intermediate:string;
    let result: string;

    this.checkFormat(input,inputFormat);

    switch(inputFormat){
      case TextConverterService.FORMAT_ASCII:
        intermediate = this.AsciiToHex(input);
        break;
      case TextConverterService.FORMAT_BIN:
        intermediate = this.binToHex(input);
        break;
      default:
        intermediate = input;
        break;
    }

    switch(outputFormat){
      case TextConverterService.FORMAT_ASCII:
        result = this.HexToAscii(intermediate);
        break;
      case TextConverterService.FORMAT_BIN:
        result = this.hexToBin(intermediate);
        break;
      default:
        result = intermediate;
        break;
    }
    return result;
    
  }

  private checkFormat(input:string,format:number){
    let i:number;
    let charPoint:number;
   
    if(format == TextConverterService.FORMAT_HEX){
      let temp:string = input.toUpperCase();
      for(i = 0 ; i<temp.length ; i++){
        charPoint = temp[i].charCodeAt(0);
        if(!( (charPoint>= 48 && charPoint <= 57) || (charPoint>= 65 && charPoint <= 70))){
          throw new Error(`Character "${input[i]}" at index ${i} is invalid`);
        }
      }      
    }

    if(format == TextConverterService.FORMAT_BIN){
      for(i = 0 ; i<input.length ; i++){
        charPoint = input[i].charCodeAt(0);
        if(! (charPoint>= 48 && charPoint <= 49)){
          throw new Error(`Character "${input[i]}" at index ${i} is invalid`);
        }
      }
    }
  }
  /**
  * do padding at the beginning
  * @param input input
  * @param modulus the modulus, if the input.length % modulus != 0, do padding
  * @param pad one char of value, ussually "0"
  */
  private doPadding(input:string,modulus:number,pad:string){
    if(input.length % modulus != 0){
      let remaining:number = modulus - (input.length%modulus);
      input = input.padStart(input.length + remaining,pad);
    }

    return input;
  }

  /**
   * Convert String of Ascii to string of Hexadecimal
   * every letter in the input will be converted to 1 byte of hexadecimal value, 0 will be appended if the value<=0x0F
   * @param input input in Ascii
   */
  private AsciiToHex(input:string):string{
    let result:string = "";
    let i:number;

    for(i = 0 ;i < input.length; i++){
      result += this.doPadding(input[i].charCodeAt(0).toString(16),2,"0");
    }
    return result;
  }
  /**
   * Convert String of Hexadecimal to string of Ascii
   * input shall only contains 0-9, a-f. if length is not multiple of 2, it will be padded
   * @param input input in Hexadecimal
   */
  private HexToAscii(input:string):string{
    let result:string = "";
    let i:number;

    input = this.doPadding(input,2,"0");

    for(i = 0 ;i <input.length; i+=2){
      result += String.fromCharCode(parseInt(input.substr(i,2),16));
    }
    return result;
  }
  /**
   * convert string of binary value to hexadecimal
   * the input contains only 1 and 0
   * if length is not multiple of 8, it will be padded with 0 in left
   * @param input input in binary
   * 
   */
  private binToHex(input:string):string{
    let result:string = "";
    let i:number;

    input = this.doPadding(input,8,"0");

    for(i =0 ;i < input.length ; i += 8){
      result += this.doPadding(parseInt(input.substr(i,8),2).toString(16),2,"0");
    }
    
    return result;
  }

  /**
   * convert string of hexadecimal value to binary
   * input shall only contains 0-9, a-f. if length is not multiple of 2, it will be padded
   * @param input input in hexadecimal
   * 
   */
  private hexToBin(input:string):string{
    let result:string = "";
    let i:number;

    input = this.doPadding(input,2,"0");

    for(i = 0 ;i < input.length; i+=2){
      result += this.doPadding(parseInt(input.substr(i,2),16).toString(2),8,"0");
    }
    return result;
  }
}
