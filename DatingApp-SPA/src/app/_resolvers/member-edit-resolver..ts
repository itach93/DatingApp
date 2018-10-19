import {Injectable} from '@angular/core';
import { User } from '../_models/user';
import {Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { pipeBind1 } from '@angular/core/src/render3/pipe';
import { catchError } from 'rxjs/operators';
import { of, pipe, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private authService: AuthService,
             private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
