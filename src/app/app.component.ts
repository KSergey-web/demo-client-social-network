import { Component } from '@angular/core';
import { SinginService } from './signin/services/singin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InWork';
  
  
  constructor(
    private signInService: SinginService,
) { }
}
