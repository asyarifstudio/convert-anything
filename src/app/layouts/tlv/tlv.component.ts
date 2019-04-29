import { Component, OnInit } from '@angular/core';
import { TlvDecoderService } from 'src/app/service/tlv/tlv-decoder.service';

@Component({
  selector: 'as-tlv',
  templateUrl: './tlv.component.html',
  styleUrls: ['./tlv.component.scss']
})
export class TLVComponent implements OnInit {

  inputForms:any[] = [];

  inputFormat:number;
  activeForm:string;
  constructor(private TlvConverter:TlvDecoderService) {
    this.inputForms.push(
      {
        "id":"input",
        "title":"Input TLV String (BERTLV format)",
        "text":"",
        "editable":true,
        "showLength":true,
        "wrap":"on"
      }
    );
    this.inputForms.push(
      {
        "id":"output",
        "title":"Decoded Result",
        "text":"",
        "editable":true,
        "showLength":false,
        "wrap":"off"
      }
    )
  }

  ngOnInit() {
  }

  onTextChanged(value:string){
    if(this.activeForm != this.inputForms[0].id){
      return;
    }
    try{
      this.inputForms[1].text = this.TlvConverter.decode(value);
    }
    catch(er){
      this.inputForms[1].text = er;
    }
  }

  onFocus(id:string){
    this.activeForm = id;
  }
}
