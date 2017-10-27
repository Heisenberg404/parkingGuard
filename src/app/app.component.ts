import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogin = false;
  showReport = false;
  showLoader = false;
  sessionUser;
  showLoginForm(event) {
    this.showLogin = event;
  }
  showReportForm(event) {
    this.showReport = event;
  }

  changeValueLoader(event) {
    if (event) {
      this.showLoader = true;
    }else {
      this.showLoader = false;
    }
  }

  changeLoader(event) {
    console.log('el valor del loader es:' + event);
    this.showLoader = event;
  }
}
