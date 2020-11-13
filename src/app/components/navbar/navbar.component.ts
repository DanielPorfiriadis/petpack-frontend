import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

// import { AuthService } from 'auth';


/*import { LoggingService, Config } from 'loggerservice';*/


//Search Bar
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface User {
  name: string;
}
//End Search Bar

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //Search Bar {{option.name}}
  myControl = new FormControl();
  options: User[] = [   //User.ts
    {name: 'Bill'},
    {name: 'Gillia'},
    {name: 'Pap'},
    {name: 'Daniel'},
    {name: 'Boletos'},
    {name: 'Naya'}
  ];
  filteredOptions: Observable<User[]>;
  //End Search Bar

  @Output() toggleSidenav = new EventEmitter<void>();

  private returnUrl = '/';
    authService: any;

  constructor(private router: Router,) {

    this.router.events.subscribe( (event) => {

      if (event instanceof NavigationEnd) {

        this.returnUrl = event.url;

        //this.logger.info('NavbarComponent returnUrl: ' + this.returnUrl);
      }

    } );

  }

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
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : ''; //User.ts
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  //End Search Bar

}
