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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TableComponent,
    NavigationComponent,
    HeaderComponent
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
