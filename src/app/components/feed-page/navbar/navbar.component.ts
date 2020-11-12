import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.services';


// import { AuthService } from 'auth';


/*import { LoggingService, Config } from 'loggerservice';*/

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  private returnUrl = '/';

  constructor( private router: Router, private authService: AuthService) {

  this.router.events.subscribe((event) => {

    if (event instanceof NavigationEnd) {

      this.returnUrl = event.url;

      // this.logger.info('NavbarComponent returnUrl: ' + this.returnUrl);
    }

  });

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

    ngOnInit(): void {
    }

    display = false;
    onPress() {
      this.display = true;
  }

}