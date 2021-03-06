import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { TLV } from 'src/app/service/tlv/tlv-decoder.service';

@Component({
  selector: 'as-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  

  @Input('id') id:string;
  @Input('title') title:string;
  @Input('showLength') showLength:boolean;
  @Input('buttonCopy') buttonCopy:boolean;
  @Input('line') line:number;
  @Input('editable') editable:boolean = true;
  @Input('wrap') wrap:string = "on"
  @Input()
  set text(text:any){
    if(text instanceof TLV){
      this.inputForm.nativeElement.value = (<TLV>text).toString(true);
    }
    else{
      this.inputForm.nativeElement.value = text;
    }
  } 

  @Output() focus = new EventEmitter<string>();
  @Output() textChanged = new EventEmitter<string>();


  @ViewChild("inputForm") inputForm: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onFocus(){
    this.focus.emit(this.id);
  }

  onTextChanged(){
    this.textChanged.emit(this.inputForm.nativeElement.value);
  }

  onCopyToClipboard(){
    this.inputForm.nativeElement.focus();
    this.inputForm.nativeElement.select();
    document.execCommand("copy");
  }

}
