import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layouts/main/main.component';
import { ConvertTextComponent } from './layouts/convert-text/convert-text.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CryptographyComponent } from './layouts/cryptography/cryptography.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ConvertTextComponent,
    CryptographyComponent
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
