import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-standby',
  templateUrl: './standby.component.html',
  styleUrls: ['./standby.component.scss'],
})
export class StandbyComponent implements OnInit {
  loading: boolean = false;
  messge: string = '';
  errors: string[] = [];
  isActive: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const clientID = localStorage.getItem('clientID');
    if (clientID) {
      this.loading = true;
      this.userService.getUser(clientID).subscribe({
        next: (response) => {
          if (response) {
            const user = response;
            this.isActive = !!user?.isActive;
            if (this.isActive) this.messge = 'Votre compte a déjà été activé';
            if (!this.isActive)
              this.messge = "Compte en cours d'activation !!!!!";
          }
        },
        error: (error) => {
          console.log(error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
