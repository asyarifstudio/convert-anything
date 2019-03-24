import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { TextConverterService } from 'src/app/service/text-converter/text-converter.service';

@Component({
  selector: 'as-convert-text',
  templateUrl: './convert-text.component.html',
  styleUrls: ['./convert-text.component.scss']
})
export class ConvertTextComponent implements OnInit {

  inputForms:any[] = [];

  inputFormat:number;
  constructor(private textConverter:TextConverterService) {
    this.inputForms.push(
      {
        "id":"inputAscii",
        "title":"ASCII",
        "text":"",
        "format":TextConverterService.FORMAT_ASCII
      }
    );
    this.inputForms.push(
      {
        "id":"inputHex",
        "title":"Hexadecimal",
        "text":"",
        "format":TextConverterService.FORMAT_HEX
      }
    );
    this.inputForms.push(
      {
        "id":"inputBin",
        "title":"Binary",
        "text":"",
        "format":TextConverterService.FORMAT_BIN
      }
    )
  }

  ngOnInit() {
  }

  onFocus(id:string){
    for(let form of this.inputForms){
      if(id == form.id){
        this.inputFormat = form.format;
        break;
      }
    }
  }

  onTextChanged(value:string){
    for(let form of this.inputForms){
      if(this.inputFormat !=  form.format){
        form.text = this.convert(form.format,value);
      }
    }
  }

  convert(format:number,input:string){
    let result:string;

    try{
      result = this.textConverter.convert(input,this.inputFormat,format);
      if(format == TextConverterService.FORMAT_HEX){
        result = result.toUpperCase();
      }
    }
    catch(err){
      result = err;
    }
    return result;
  }

  onCopyToClipboard(el:any){
    el.focus();
    el.select();
    document.execCommand("copy");
  }

}
