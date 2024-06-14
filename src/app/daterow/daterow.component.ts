import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-daterow',
  templateUrl: './daterow.component.html',
  styleUrl: './daterow.component.css'
})
export class DaterowComponent {
  @Input() title: string = '';
  @Input() heure: string = '';
  @Input() lieu: string = '';
  @Input() description: string = '';
  @Input() jour: string = '';
  @Input() le: string = '';
  @Input() mois: string = '';
  @Input() img: string = '';
  @Input() isOK: boolean = false;

}
