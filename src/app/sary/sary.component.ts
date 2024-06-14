import { Component, OnInit } from '@angular/core';
import { categSaryModel, saryModel } from '../model-data';
import { ServiceDbService } from '../service-db.service';
import { DataGlobal } from '../data-global';

declare var $: any;
@Component({
  selector: 'app-sary',
  templateUrl: './sary.component.html',
  styleUrl: './sary.component.css'
})
export class SaryComponent implements OnInit {
  urlApiDataSary: string = DataGlobal.urlBase + "readPhotos";
  dataSaryCateg: Array<saryModel> = [];
  dataSaryVideoCateg: Array<any> =[];
  imgModalSelected: string = '';
  idxSelected: number = 0;
  categSary: string = '';
  dataSary: Array<saryModel> = [];
  dataCategVideo: Array<saryModel> = [];
  loading: boolean = false;
  isProd: boolean = DataGlobal.isProd;

  constructor(private serviceDbService: ServiceDbService) { }


  ngOnInit(): void {
    this.serviceDbService.getContentJSON(this.urlApiDataSary).subscribe(res => {
      this.loading = true;
      if (res) {
        this.dataSaryCateg = res;
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    }) 
  }

  openCateg(id: string) {
    $('.collapse-'+id).collapse('toggle')
  }


  imgSelected(event: any) {
    this.imgModalSelected = event.url;
    this.idxSelected = event.id;
    this.categSary = event.categ;
    this.dataSary = event.dataSary.img;
    $('#myModalSary').modal('show');
  }
  hideModal() {
    $('#myModalSary').modal('hide');
  }

}
