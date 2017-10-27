import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { TableComponent } from './components/table/table.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ParkingApiService} from './services/parkingApi.service';
import {HttpModule} from '@angular/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PriceComponent } from './components/price/price.component';
import { ReportsComponent } from './components/reports/reports.component';
import { LoaderComponent } from './components/loader/loader.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TableComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    PriceComponent,
    ReportsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ParkingApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
