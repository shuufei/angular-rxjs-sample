import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-angular-reactive-component',
  templateUrl: './angular-reactive-component.component.html',
  styleUrls: ['./angular-reactive-component.component.scss'],
})
export class AngularReactiveComponentComponent implements OnInit {
  readonly stepSelect = new FormControl('step0');

  constructor() {}

  ngOnInit(): void {}
}
