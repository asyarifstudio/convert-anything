import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { TextConverterService } from 'src/app/service/text-converter/text-converter.service';

@Component({
  selector: 'as-convert-text',
  templateUrl: './convert-text.component.html',
  styleUrls: ['./convert-text.component.scss']
})
export class ConvertTextComponent implements OnInit {

  INPUT_ID_ASCII:string = "inputAscii";
  INPUT_ID_HEX:string = "inputHex";
  INPUT_ID_BIN:string = "inputBin";

  @ViewChild("inputAscii") inputAscii: ElementRef;
  @ViewChild("inputHex") inputHex: ElementRef;
  @ViewChild("inputBin") inputBin: ElementRef;

  inputFormat:number;
  constructor(private textConverter:TextConverterService) { }

  ngOnInit() {
  }

  onFocus(id:string){
    switch(id){
      case this.INPUT_ID_ASCII:
        this.inputFormat = TextConverterService.FORMAT_ASCII;
        break;
      case this.INPUT_ID_HEX:
        this.inputFormat = TextConverterService.FORMAT_HEX;
        break;
      case this.INPUT_ID_BIN:
        this.inputFormat = TextConverterService.FORMAT_BIN;
        break;
    }
  }

  onTextChanged(value:string){

    this.convert(this.inputAscii,TextConverterService.FORMAT_ASCII,value);
    this.convert(this.inputHex,TextConverterService.FORMAT_HEX,value);
    this.convert(this.inputBin,TextConverterService.FORMAT_BIN,value);
  }

  convert(el:ElementRef, elFormat:number,input:string){
    let result:string;
    if(this.inputFormat== elFormat) return;

    try{
      result = this.textConverter.convert(input,this.inputFormat,elFormat);  
    }
    catch(err){
      result = err;
    }

    el.nativeElement.value = result;
  }

}
