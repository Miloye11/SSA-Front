import { Component, OnInit } from '@angular/core';

// Dodatni importi
import { IRecord } from "../Models/IRecord";
import { ICityName } from "../Models/ICityName";
import { ITypeName } from "../Models/ITypeName";
import { RecordsService } from "../Services/records.service";
import { CityNameService } from "../Services/city-name.service";
import { TypeNameService} from "../Services/type-name.service";
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';




@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  constructor(private recordsService: RecordsService,public datepipe: DatePipe, private typeNameService: TypeNameService, private cityNameService: CityNameService) { }

  public numberOfRecords: number;

  public records:IRecord[] = []; // Deklaracija praznog niza po tipu interfejsa IRecord

  public filteredRecords: IRecord[] = [];

  public typeNames: ITypeName[] = [];

  public filteredApartmentType: string = "";//pokupljen select sa fronta iz dropdown-a!

  public listOfApartmentTypes: string[] = [];

  public cityNames: ICityName[] = [];

  public filteredCityName: string = "";

  public listOfCityNames: string[] = [];
  public filteredDate: string;


  today: Date;
  public todayString: string;

  week: Date;
  public weekString: string;

  month: Date;
  public monthString: string;

  AllDate: Date;
  public AllDateString: string;


  bsValue: Date;
  maxDate: Date;
  bsRangeValue: Date[];
  date1: string;
  date2: string;



  getRecords(): void {
    this.recordsService.getRecords()
      .subscribe(data => {
        this.records = data;
        this.filteredRecords = JSON.parse(JSON.stringify(this.records));

      });
  }

  getTypeName():void {
    this.typeNameService.getTypeName()
      .subscribe(data => {
        this.typeNames = data;
        this.listOfApartmentTypes = JSON.parse(JSON.stringify(this.typeNames));
      });
  }

  getCityName():void {
    this.cityNameService.getCityName()
      .subscribe(data => {
        this.cityNames = data;
        this.listOfCityNames = JSON.parse(JSON.stringify(this.cityNames));
      });
  }
  
  filter() {
    this.filteredRecords = this.records;
    if (this.filteredApartmentType) {
      this.filteredRecords = JSON.parse(JSON.stringify(
        this.filteredRecords.filter(r => r.Type_Name === this.filteredApartmentType)));
    }
    if (this.filteredCityName) {
      this.filteredRecords = JSON.parse(JSON.stringify(
        this.filteredRecords.filter(r => r.City_Name === this.filteredCityName)));
    }
    if (this.filteredDate === this.todayString) {
      this.filteredRecords = JSON.parse(JSON.stringify(
        this.filteredRecords.filter(r => r.Date_Time.substr(0, 10) === this.todayString)));
    }
    if (this.filteredDate === this.weekString) {
      this.filteredRecords = JSON.parse(JSON.stringify(
        this.filteredRecords.filter(r => r.Date_Time.substr(0, 10) >= this.weekString)));
    }
    if (this.filteredDate === this.monthString) {
      this.filteredRecords = JSON.parse(JSON.stringify(
        this.filteredRecords.filter(r => r.Date_Time.substr(0, 10) >= this.monthString)));
    }
    if (this.filteredDate === this.AllDateString) {
      this.filteredRecords = JSON.parse(JSON.stringify(
        this.filteredRecords.filter(r => r.Date_Time.substr(0, 10) >= this.AllDateString)));
    }
    if (this.bsRangeValue) {
      this.bsValue = new Date();
      this.bsValue = this.bsRangeValue[0];
      this.date1 = this.datepipe.transform(this.bsValue, 'yyyy-MM-dd');
      this.maxDate = new Date();
      this.maxDate = this.bsRangeValue[1];
      this.date2 = this.datepipe.transform(this.maxDate, 'yyyy-MM-dd');

      this.filteredRecords = JSON.parse(JSON.stringify(
        this.filteredRecords.filter(r => r.Date_Time.substr(0, 10) >= this.date1 && r.Date_Time.substr(0, 10) <= this.date2)));

    }
    
    }

   

  


  //Za sortiranje
  public key: string;
  reverse: boolean = false;
  sort(key) {
    if (key == "Person_Name" || key == "Person_Surname" || key == "City_Name" || "Date_Time") {
      this.key = key;
      this.reverse = !this.reverse;
    }
  }

  //Za paginaciju
  p: number = 1;

  ngOnInit() {
    this.getRecords();
    this.getTypeName();
    this.getCityName();
    this.today = new Date();
    this.todayString = this.datepipe.transform(this.today, 'yyyy-MM-dd');
    this.week = new Date();
    this.week.setDate(this.week.getDate() - 7);
    this.weekString = this.datepipe.transform(this.week, 'yyyy-MM-dd');
    this.month = new Date();
    this.month.setDate(this.month.getDate() - 30);
    this.monthString = this.datepipe.transform(this.month, 'yyyy-MM-dd');
    this.AllDate = new Date();
    this.AllDate.setDate(this.AllDate.getDay() - 15000);
    this.AllDateString = this.datepipe.transform(this.AllDate, 'yyyy-MM-dd');

  }

}
