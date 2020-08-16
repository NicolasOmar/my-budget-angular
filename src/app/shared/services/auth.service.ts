import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// API SERVICES
import { ApiUserService } from 'src/app/api/api-user.service';
// INTERFACES
import { UserPayload, UserModel, UserResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedUser = new BehaviorSubject<UserModel>(null);

  constructor(private apiUserService: ApiUserService) {}

  public logIn(user: UserPayload): Observable<UserResponse> {
    return this.apiUserService.logIn(user).pipe(
      tap((data: UserResponse) => {
        const formedObj = {
          ...data.userLogged,
          token: data.token
        };

        this.setLocalUser(formedObj);
        this.loggedUser.next(formedObj);
      })
    );
  }

  public autoLogIn() {
    const userData: UserModel = this.getLocalUser();
    if (userData) {
      this.loggedUser.next(userData);
    }
  }

  private setLocalUser(userData: UserModel) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  private getLocalUser(): UserModel | null {
    return JSON.parse(localStorage.getItem('userData'));
  }
}
