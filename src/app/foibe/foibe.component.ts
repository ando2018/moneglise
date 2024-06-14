import { Component } from '@angular/core';
import { DataGlobal } from '../data-global';

@Component({
  selector: 'app-foibe',
  templateUrl: './foibe.component.html',
  styleUrl: './foibe.component.css'
})
export class FoibeComponent {
  srcUrl: string = DataGlobal.urlFpmaFoibe;
}
