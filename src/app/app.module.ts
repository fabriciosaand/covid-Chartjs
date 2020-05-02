import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar'; 

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DatePipe } from '@angular/common';
import { ApiService } from './api.service';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DatePipe, ApiService],
  exports: [MatToolbarModule]
  //providers: [ApiService]
})
export class AppModule { }
