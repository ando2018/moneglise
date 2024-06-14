import { Component, Input } from '@angular/core';
import { mpikambanaModel, nomImgModel } from '../model-data';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent  {
  @Input() profil: string = '';
  @Input() img?: string = '';
  @Input() coupleNomImg: Array<nomImgModel> = [];
  @Input() descripion?: string = '';
  @Input() categorie: string= '';
  @Input() mpikambana?: Array<mpikambanaModel> = [];

}
