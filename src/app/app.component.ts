import { Component } from '@angular/core';
import { LgsAuthService } from './lgs-state/lgs-auth/lgs-auth.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: LgsAuthService) {}
}
