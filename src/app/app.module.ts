import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Cards6Component } from './cards6/cards6.component';
import { Cards12Component } from './cards12/cards12.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    Cards6Component,
    Cards12Component,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
