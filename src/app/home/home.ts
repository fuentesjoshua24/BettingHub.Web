import { Component } from '@angular/core';
import { Head } from '../head/head';
import { Foot } from '../foot/foot';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
    imports: [
    Head,
    Foot,
    RouterOutlet
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
