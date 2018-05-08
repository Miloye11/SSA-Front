import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecordsComponent } from './records/records.component';


// Dodatni importi
import { IRecord } from "../app/Models/IRecord";
import { ICityName } from "../app/Models/ICityName";
import { ITypeName } from "../app/Models/ITypeName";
import { RecordsService } from "../app/Services/records.service";
import { CityNameService } from "../app/Services/city-name.service";
import { TypeNameService } from "../app/Services/type-name.service";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //Za pretragu
import { Ng2OrderModule } from 'ng2-order-pipe'; //Za sortiranje
import {NgxPaginationModule} from 'ngx-pagination'; // Za paginaciju
import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './login/login.component'; //Za DatePicker


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecordsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    Ng2SearchPipeModule, //Za pretragu
    Ng2OrderModule, //Za sortiranje
    NgxPaginationModule,//Za paginaciju
    BsDatepickerModule.forRoot() //Dodataka za odabir datuma


  ],
  providers: [RecordsService, CityNameService, TypeNameService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
