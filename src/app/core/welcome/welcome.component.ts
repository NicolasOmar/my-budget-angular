import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// SERVICES
import { AuthService } from '@auth/services/auth.service';
// INTERFACES
import { UserModel } from '@auth/interfaces/user.interface';

@Component({
  selector: 'budget-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public userName: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.sub = this.authService.loggedUser.subscribe((response: UserModel) => {
      this.userName = response ? `${response.name} ${response.lastName}` : null;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
