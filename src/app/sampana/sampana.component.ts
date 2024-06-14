import { Component, OnInit } from '@angular/core';
import { ServiceDbService } from '../service-db.service';
import { articleModel } from '../model-data';
import { DataGlobal } from '../data-global';
declare var $: any;
@Component({
  selector: 'app-sampana',
  templateUrl: './sampana.component.html',
  styleUrl: './sampana.component.css'
})
export class SampanaComponent implements OnInit {
  urlApiDataArticles: string = DataGlobal.urlBase + "readArticles";
  textModalSelected: string = '';
  titleModalSelected: string = '';
  imgModalSelected: string = '';
  dateModalSelected: string = '';
  dataArcticles: Array<articleModel> = [];
  loading: boolean = false;
  isProd: boolean = DataGlobal.isProd;

  constructor(private serviceDbService: ServiceDbService) { }

  ngOnInit() {
    this.loading = true;
    this.serviceDbService.getContentJSON(this.urlApiDataArticles).subscribe(res => {
      this.loading = false;
      if (res) {
        res.map((r: articleModel) => {
          r.date = new Date(r.date)
        })
        this.dataArcticles = res.sort(function (a: articleModel, b: articleModel) {
          var c: any = new Date(a.date);
          var d: any = new Date(b.date);
          return d - c;
        });
      }
    }, err => {
      this.loading = false;
    })
  }


  selectArticle(id: string) {
    let dataSElected: articleModel = this.dataArcticles[this.dataArcticles.findIndex(x => x.id.toString() === id.toString())];
    this.imgModalSelected = dataSElected.img;
    this.textModalSelected = dataSElected.description.replaceAll('\r\n', '</br>').replaceAll('é', '\u00E9');;
    this.titleModalSelected = dataSElected.title;
    this.dateModalSelected = dataSElected.date.toString();
    $('#myModalSampana').modal('show');
  }

  clearArticleSelected() {
    this.imgModalSelected = "";
    this.textModalSelected = "";
    this.titleModalSelected = "";
    this.dateModalSelected = "";
  }
}
