import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/service/auth.service';
import { User } from 'src/app/login/state/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$();
  }

  login(): void {
    this.router.navigate(['login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }
}
