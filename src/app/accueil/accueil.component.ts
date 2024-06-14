import { Component, OnInit } from '@angular/core';
import { ServiceDbService } from '../service-db.service';
import { DataGlobal } from '../data-global';
import { articleModel, eventModel, infoModel, saryModel } from '../model-data';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  versionVerset: string = "<p>© 2000 Société biblique française - Bibli'O</p>"; 
  urlApi: string = DataGlobal.urlVerset;
  urlApiDataEvents: string = DataGlobal.urlBase + "readEvenements";
  urlApiDataArticles: string = DataGlobal.urlBase + "readArticles";
  urlApiDataInfos: string = DataGlobal.urlBase + "readInfos";
  urlApiDataSarySampana: string = DataGlobal.urlBase + "readPhotos";
  urlApiDataSarySampanaMembres: string = DataGlobal.urlBase + "readPhotosSampana";
  urlApiDataSaryBiraoMembres: string = DataGlobal.urlBase + "readPhotosBirao";
  isProd: boolean = DataGlobal.isProd;
  dataArcticles: Array<articleModel> = [];
  dataEvents: Array<eventModel> = [];
  dataEventsDefault: Array<eventModel> = [];
  dataSarySampana: Array<any> = [];
  dataSaryBirao: Array<any> = [];
  dataInfos: Array<infoModel> = [];
  myModal: any = document.getElementById('myModal');
  imgIdDefault: number = 1645;
  imgId: number = (this.imgIdDefault + (Math.floor(Math.random() * (20 - 1 + 1)) + 1)) >= 1676 ? this.imgIdDefault : (this.imgIdDefault + (Math.floor(Math.random() * (20 - 1 + 1)) + 1));
  srcDayUrl: string = DataGlobal.urlImgVerset  + this.imgId + "/1280x1280.jpg";
  text: string = DataGlobal.textArticle;
  textModalSelected: string = '';
  titleModalSelected: string = '';
  imgModalSelected: string = '';
  dateModalSelected: string = '';
  dataSaryCateg: Array<saryModel> = [];
  loading: any =  {
    articles : false,
    events: false,
    infos: false,
    verset: false,
    photos:false

  }
  constructor(private serviceDbService: ServiceDbService, private route: Router) { }

  ngOnInit() {

    //var now: any = new Date();
    //var start: any = new Date(now.getFullYear(), 0, 0);
    //var diff = now - start;
    //var oneDay = 1000 * 60 * 60 * 24;
    //var day = Math.floor(diff / oneDay);

    this.loading = {
      articles: true,
      events: true,
      infos: true,
      verset: true,
      photos:true
    }


    this.serviceDbService.getContentJSON(this.srcDayUrl).subscribe(res => {  
      this.loading.verset = false;
      if (res && res.pageProps && res.pageProps.verseOfTheDayImageURL) {
        this.srcDayUrl = res.pageProps.verseOfTheDayImageURL; 
      }
      if (res && res.pageProps && res.pageProps.version) {
        this.versionVerset = res.pageProps.version.copyright_long.html;
      }
    }, er => {
      this.loading.verset = false;
    })

    this.serviceDbService.getContentJSON(this.urlApiDataEvents).subscribe(res => {
      this.loading.events = false;
      if (res) {
        res.map((r: eventModel) => {
          r.date = new Date(r.date)
        });
        this.dataEvents = res.sort(function (a: eventModel, b: eventModel) {
          var c: any = new Date(a.date);
          var d: any = new Date(b.date);
          return c - d;
        })

        this.dataEvents.forEach(res => {
        res.isOK = res.date > new Date()
        }) 
        this.dataEventsDefault = this.dataEvents.sort(function (a: eventModel, b: eventModel) {
          var c: any = new Date(a.date);
          var d: any = new Date(b.date);
          return c - d;
        });
        this.dataEvents = res.sort(function (a: eventModel, b: eventModel) {
          var c: any = new Date(a.date);
          var d: any = new Date(b.date);
          return c - d;
        }).filter((foo: eventModel) => foo.date >= new Date()).slice(0, 5);
      }
    }, err => {
      this.loading.events = false;
    })


    this.serviceDbService.getContentJSON(this.urlApiDataArticles).subscribe(res => {
      this.loading.articles = false;
      if (res) {
        res.map((r: articleModel) => {
          r.date = new Date(r.date),
            r.description = unescape(r.description)
        });
        this.dataArcticles = res.sort(function (a: articleModel, b: articleModel) {
          var c: any = new Date(a.date);
          var d: any = new Date(b.date);
          return d - c;
        })
      }
    }, err => {
      this.loading.articles = false;
    })

    this.serviceDbService.getContentJSON(this.urlApiDataInfos).subscribe(res => {
      this.loading.infos = false;
      if (res) {
        res.map((r: infoModel) => {
          r.date = new Date(r.date),
            r.description = unescape(r.description)
        });
        this.dataInfos = res.sort(function (a: infoModel, b: infoModel) {
          var c: any = new Date(a.date);
          var d: any = new Date(b.date);
          return d - c;
        })
      }
    }, err => {
      this.loading.infos = false;
    })


    this.serviceDbService.getContentJSON(this.urlApiDataSarySampanaMembres).subscribe(res => {
      if (res) {
        this.dataSarySampana = res;
      }
      this.loading.photos = false;
    }, err => {
      this.loading.photos = false;
    })

    this.serviceDbService.getContentJSON(this.urlApiDataSaryBiraoMembres).subscribe(res => {
      if (res) {
        this.dataSaryBirao = res;
      }
      this.loading.photos = false;
    }, err => {
      this.loading.photos = false;
    })


    
  }

  selectArticle(id: string) {
    let dataSElected: articleModel = this.dataArcticles[this.dataArcticles.findIndex(x => x.id.toString() === id.toString())];
    this.imgModalSelected = dataSElected.img == undefined ? '' : dataSElected.img;
     this.textModalSelected = dataSElected.description.replaceAll('\r\n','</br>').replaceAll('é','\u00E9');
    this.titleModalSelected = dataSElected.title;
    this.dateModalSelected = dataSElected.date.toString();
    $('#myModal').modal('show');
  }

  clearArticleSelected() {
    this.imgModalSelected = "";
    this.textModalSelected = "";
    this.titleModalSelected = "";
    this.dateModalSelected = "";
  }

  getActiveRoute(url: string) {
    return this.route.url == url ? 'nav-active' : '';
  }

  openModalEvent() {
    $('#myModalEvent').modal('show');
  }

}
