import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TlvDecoderService {

  static CLASS_UNIVERSAL = 0x00;
  static CLASS_APPLICATION = 0x40;
  static CLASS_CONTEXT = 0x80;
  static CLASS_PRIVATE = 0xC0;
  static DATA_PRIMITIVE = 0x00;
  static DATA_CONSTRUCTED = 0x20;

  static STD_TAG_SEQUENCE = "30";
  static STD_TAG_STRING = "0C";
  static STD_TAG_INTEGER = "02";
  static STD_TAG_BOOLEAN = "01";

  constructor() { }

  public decode(input: string): any {
    let result:any;

    if (!this.isTLVSequence(input)) {
      result = new TLV();

      result.tag = this.getTag(input);
      result.length = this.getLength(result.tag, input);
      result.primitive = this.isDataPrimitive(result.tag);

      if (result.primitive) {
        result.value = this.getValue(result.tag, result.length, input);
      }
      else{
        result.value = [];
        let sequence:string = this.getValue(result.tag,result.length,input);
        while(sequence!==""){
          let childTlv:TLV = new TLV();
          childTlv.tag = this.getTag(sequence);
          childTlv.length = this.getLength(childTlv.tag,sequence);
          childTlv.value = this.getValueInSequence(childTlv.tag,childTlv.length,sequence);

          childTlv = this.decode(`${childTlv.tag}${childTlv.length}${childTlv.value}`);
          
          result.value.push(childTlv);

          sequence = this.getNextSequence(childTlv,sequence);
        }
      }

    }
    else {

    }

    return result;
  }

  private isTLVSequence(input: string): boolean {
    return this.getTag(input) === TlvDecoderService.STD_TAG_SEQUENCE
  }
  private getNextSequence(tlv:TLV,input:string):string{
    return input.substring(tlv.toString(false).length);
  }

  private getTag(input: string): string {
    //check if tag is 2 bytes
    let tag: string = input.substring(0, 2);
    if ((parseInt(tag, 16) & 0x1F) == 0x1F) {
      //tag can be more then 2 bytes
      let idx: number = 2;
      var tempTag: string = input.substring(idx, idx + 2);
      tag = tag + tempTag;
      while ((parseInt(tempTag, 16) & 0x80) == 0x80) {
        idx += 2;
        tempTag = input.substring(idx, idx + 2);
        tag = tag + tempTag;
      }
      return tag;
    }
    else {
      return tag;
    }
  }
  private getValue(tag: string, len: string, input: string): string {
  
    let lenInt:number = this.convertLen(len);
    var value = input.substring(tag.length + len.length);

    //validate value length
    if ((value.length / 2) == lenInt) {
      return value;
    }
    else {
      throw new Error(`inconsistent length ${value}`);
    }

  }
  private getValueInSequence(tag:string,len:string,tlv:string):string{
    
    var lenInt = this.convertLen(len);
    var start = tag.length + len.length;
    var end = tag.length + len.length + lenInt * 2;
    return tlv.substring(start,end);

}

  private getLength(tag: string, input: string) {
    //get first byte of length;
    let len: string = input.substring(tag.length, tag.length + 2);
    switch (len) {
      case "81": return input.substring(tag.length, tag.length + 4);
      case "82": return input.substring(tag.length, tag.length + 6);
      case "83": return input.substring(tag.length, tag.length + 8);
      default: return len;
    }
  }

  private convertLen(len:string):number{
    var firstLen: string = len.substring(0, 2);
    var lenInt:number;
    if ((firstLen === "81") || (firstLen === "82") || (firstLen === "83")) {
      lenInt = parseInt(len.substring(2), 16);
    }
    else {
      lenInt = parseInt(len,16);
    }

    return lenInt;
  }
  private isDataPrimitive(tag: string): boolean {
    let firstTag: number = parseInt(tag.substring(0, 2), 16);
    return ((firstTag & 0x20) == TlvDecoderService.DATA_PRIMITIVE);
  }
}




export class TLV {
  tag: string;
  length: string;
  primitive: boolean;
  value: any;

  public toString(pretty?:boolean,level?:number):string{
    let tab:string = "";
    let i:number;

    if(level == undefined){
      level = 0;
    }

    //create tab
    for(i=0;i<level;i++){
      tab = tab+'\t';
    }


    let result:string;
    if(pretty){
      result = `${tab}${this.tag} ${this.length}`
    }
    else{
      result = this.tag+this.length;
    };
    if(this.primitive){
      if(pretty){
        result = result.concat(` ${this.value}`);
      }
      else{
        result = result + this.value;
      }
      
    }
    else{
      for(let child of this.value){
        if(pretty){
          result = result.concat(`\n${child.toString(pretty,level+1)}`);
        }
        else{
          result = result.concat(child.toString(pretty));
        }

        
      }
    }

    return result;

  } 

}

