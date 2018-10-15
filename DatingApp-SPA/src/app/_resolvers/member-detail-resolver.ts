import {Injectable} from '@angular/core';
import { User } from '../_models/user';
import {Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { pipeBind1 } from '@angular/core/src/render3/pipe';
import { catchError } from 'rxjs/operators';
import { of, pipe, Observable } from 'rxjs';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
