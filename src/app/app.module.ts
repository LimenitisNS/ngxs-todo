import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from "@ngxs/store";

import { AppComponent } from './app.component';
import {TodoModule} from "./todo/todo.module";
import {TodoState} from "./todo/store/todo";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    TodoModule,
    NgxsModule.forRoot([TodoState]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
