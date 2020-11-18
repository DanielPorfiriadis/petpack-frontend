import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

// import { AuthService } from 'auth';


/*import { LoggingService, Config } from 'loggerservice';*/


//Search Bar
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { element } from 'protractor';

export interface Username {
  username: string;
}
//End Search Bar

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //Search Bar {{option.name}}

  //End Search Bar

  @Output() toggleSidenav = new EventEmitter<void>();

  private returnUrl = '/';
    

  constructor(private router: Router, private authService: AuthService) {

    this.router.events.subscribe( (event) => {

      if (event instanceof NavigationEnd) {

        this.returnUrl = event.url;

        //this.logger.info('NavbarComponent returnUrl: ' + this.returnUrl);
      }

    } );

  }
  myControl = new FormControl();
  options: Username[] = this.authService.getUsernames();
  filteredOptions: Observable<Username[]>;

  public onProfile() {

    this.router.navigate(['users/profile']);
  }

  public logout() {

    this.authService.logout();
  }

  public settings(){
    // this.settings.....kati
  }

  display = false;
  onPress() {
    this.display = true;
  }

  //Search Bar
  ngOnInit(): void {
    console.log(this.options);
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }

  displayFn(user: Username): string {
    return user && user.username ? user.username : ''; //User.ts
  }

  private _filter(name: string): Username[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.username.toLowerCase().indexOf(filterValue) === 0);
  }
  //End Search Bar

}