import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { User } from '../models/user.model';
import { UserObservableService  } from '../services';

@Injectable()
export class UserResolveGuard implements Resolve<User> {

  constructor(
    private userObservableService: UserObservableService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> | null {
    console.log('UserResolve Guard is called');
    const id = +route.paramMap.get('userID');

    if (id) {
      return this.userObservableService.getUser(id)
      .pipe(
        catchError(() => {
          this.router.navigate(['/users']);
          return of(null);
        })
      );
    } else {
      return of(new User(null, '', ''));
    }
  }
}
