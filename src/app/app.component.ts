import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogin = false;
  showReport = false;

  showLoginForm(event) {
    this.showLogin = event;
  }
  showReportForm(event) {
    this.showReport = event;
  }

}
