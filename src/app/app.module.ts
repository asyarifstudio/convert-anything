import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layouts/main/main.component';
import { ConvertTextComponent } from './layouts/convert-text/convert-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CryptographyComponent } from './layouts/cryptography/cryptography.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { TLVComponent } from './layouts/tlv/tlv.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ConvertTextComponent,
    CryptographyComponent,
    InputFormComponent,
    TLVComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
