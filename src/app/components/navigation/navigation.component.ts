import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  showLogin = false;
  @Output() showLoginOut = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  showLoginForm(){
    this.showLogin = true;
    this.showLoginOut.emit(this.showLogin);
  }

}
