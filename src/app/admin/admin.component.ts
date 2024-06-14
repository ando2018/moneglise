import { Component, HostListener } from '@angular/core';
import { ServiceDbService } from '../service-db.service';
import { Router } from '@angular/router';
import { articleModel, eventModel, infoModel, profilModel, saryModel } from '../model-data';
import { DataGlobal } from '../data-global';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {

  public innerWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.innerWidth = window.innerWidth;
  }

  urlApiDataArticles: string = DataGlobal.urlBase + "readArticles";
  urlApiDataSarySampana: string = DataGlobal.urlBase + "readPhotos";
  urlApiDataSarySampanaMembres: string = DataGlobal.urlBase + "readPhotosSampana";
  urlApiDataSaryBiraoMembres: string = DataGlobal.urlBase + "readPhotosBirao";
  urlApiDataSary: string = DataGlobal.urlBase + "readPhotos";
  dataArcticles: Array<articleModel> = [];
  dataSarySampana: Array<any> = [];
  dataSaryBirao: Array<any> = [];
  dataSaryCateg: Array<saryModel> = [];
  dataInfos: Array<infoModel> = [];
  dataEvents: Array<eventModel> = [];
  dataProfils: Array<profilModel> = [];
  dataPhotos: Array<saryModel> = [];
  textModalSelected: string = '';
  titleModalSelected: string = '';
  imgModalSelected: string = '';
  dateModalSelected: string = '';
  selectedType: string = 'photo';
  videoNameInput: string = "";
  dataAlls: any;
  loading: any = {
    articles: false,
    hafa: false,
    birao: false,
    sampana: false
  };

  isAddArticles: boolean = false;
  fileArticle?: File  // Variable to store file
  fileSampana?: File // Variable to store file
  fileBirao?: File // Variable to store file
  filePhoto?: File ; // Variable to store file
  isProd: boolean = DataGlobal.isProd;

  constructor(private http: HttpClient, private serviceDbService: ServiceDbService, private route: Router, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.loading = {
      articles: true,
      hafa: true,
      birao: true,
      sampana: true
    };
    this.loadArticle();
    this.loadSampana();
    this.loadBiraoMembres();
    this.loadPhotos();
    this.loadAll();
  }

  loadPhotos() {
    this.serviceDbService.getContentJSON(this.urlApiDataSary).subscribe(res => {
      if (res) {
        this.dataSaryCateg = res;
      }
      this.loading.hafa = false;
    }, err => {
      this.loading.hafa = false;
    })
  }

  loadArticle() {
    this.serviceDbService.getContentJSON(this.urlApiDataArticles).subscribe(res => {
      this.loading.articles = false;
      if (res) {
        res.map((r: articleModel) => {
          r.date = new Date(r.date),
            r.description = unescape(r.description),
            r.descriptionDefault = unescape(r.description)
        });
        this.dataArcticles = res.sort(function (a: articleModel, b: articleModel) {
          var c: any = new Date(a.id);
          var d: any = new Date(b.id);
          return d - c;
        })
        this.dataArcticles.forEach(res => {
          res.description = res.description.length > 250 ? res.description.slice(0, 250) + '...' : res.description;
        })
      }
    }, err => {
      this.loading.articles = false;
    })

  }

  loadSampana() {
    this.serviceDbService.getContentJSON(this.urlApiDataSarySampanaMembres).subscribe(res => {
      if (res) {
        this.dataSarySampana = res;
      }
      this.loading.sampana = false;
    }, err => {
      this.loading.sampana = false;
    })
  }

  loadAll() {
    this.serviceDbService.getContentJSON(DataGlobal.urlBase + "readAlls").subscribe(res => {
      this.dataAlls = res;
      this.dataInfos = res.infos;
      this.dataEvents = res.evenements;
      this.dataProfils = res.profil;
      
    }).add(() => {
      this.loading.hafa = false;
    });
  }

  loadBiraoMembres() {
    this.serviceDbService.getContentJSON(this.urlApiDataSaryBiraoMembres).subscribe(res => {
      if (res) {
        this.dataSaryBirao = res;
      }
      this.loading.birao = false;
    }, err => {
      this.loading.birao = false;
    })
  }

  onChangePhotoFile(event: any) {
   this.filePhoto = event.target.files[0];
  }
  onChangeSampanaFile(event: any) {
    this.fileSampana = event.target.files[0];
  }
  onChangeBiraoFile(event: any) {
    this.fileBirao = event.target.files[0];
  }
  onChangeArticleFile(event: any) {
    this.fileArticle = event.target.files[0];
  }

  onUploadArticle(idx: string): Observable<any> {
    if (this.fileArticle) {
      const file: File | null = this.fileArticle;
      const formData: FormData = new FormData();
      formData.append("id", idx);
      formData.append('file', file);
      this.serviceDbService.postContentJSON( DataGlobal.urlBase + "uploadNews", formData)
        .subscribe(res => {
        this.loading.birao = false;
      }, err => {
          this.loading.birao = false;
        }).add(() => {
          this.fileArticle = undefined;
          this.loadArticle();
        });
    }
    return of({})
  }

  onUploadSampana(): Observable<any> {
    if (this.fileSampana) {
      this.loading.sampana = true;
      const file: File | null = this.fileSampana;
      const formData: FormData = new FormData();
      formData.append("folder", "SAMPANA");
      formData.append('file', file);
      this.serviceDbService.postContentJSON(DataGlobal.urlBase + "uploadimg", formData).subscribe(res => {
        if (res) {
          this.dataSarySampana = res;
        }
        this.loading.sampana = false;
      }, err => {
        this.loading.sampana = false;
      }).add(() => {
        this.fileSampana = undefined;
        //Called when operation is complete (both success and error)
      });
    }
    return of({})
  }

  onUploadBirao(): Observable<any> {
    if (this.fileBirao) {
      this.loading.birao = true;
      const file: File | null = this.fileBirao;
      const formData: FormData = new FormData();
      formData.append("folder", "BIRAO");
      formData.append('file', file);
      this.serviceDbService.postContentJSON(DataGlobal.urlBase + "uploadimg", formData).subscribe(res => {
        if (res) {
          this.dataSaryBirao = res;
        }
        this.loading.birao = false;
      }, err => {
        this.loading.birao = false;
      }).add(() => {
        this.fileBirao = undefined;
        //Called when operation is complete (both success and error)
      });
    }
    return of({})
  }

  onUploadPhoto(folder: string): Observable<any> {
    if (this.filePhoto) {
      this.loading.hafa = true;
      const file: File | null = this.filePhoto;
      const formData: FormData = new FormData();
      formData.append("folder", folder);
      formData.append('file', file);
      this.serviceDbService.postContentJSON(DataGlobal.urlBase + "uploadimg", formData).subscribe(res => {
        this.loading.hafa = false;
      }, err => {
        this.loading.hafa = false;
      }).add(() => {
        this.loadPhotos();
      });

     
    }
    return of({})
  }


  selectArticle(id: string) {
      let dataSElected: articleModel = this.dataArcticles[this.dataArcticles.findIndex(x => x.id.toString() === id.toString())];
      this.imgModalSelected = dataSElected.img;
      this.textModalSelected = dataSElected.descriptionDefault.replaceAll('\r\n', '</br>').replaceAll('é', '\u00E9');
      this.titleModalSelected = dataSElected.title;
    this.dateModalSelected = dataSElected.date.toString();
    $('#myModalArticleAdmin').modal('show');
  }

  clearArticleSelected() {
    this.imgModalSelected = "";
    this.textModalSelected = "";
    this.titleModalSelected = "";
    this.dateModalSelected = "";
    this.isAddArticles = false;

  }
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  exportAsXLSX() {
    this.dataAlls.articles = this.dataArcticles.map(res =>  ({
      'id': res.id,
      'title': res.title,
      'description': res.descriptionDefault.replaceAll('\n', '</br>').replaceAll('é', '\u00E9'),
      'img': "",
      'user': res.user,
      'date': res.date,
      'categorie': res.categorie
    })).sort((a, b) => (a.id > b.id ? 1 : -1))
    this.dataAlls.evenements = this.dataEvents
    this.dataAlls.infos = this.dataInfos.sort((a, b) => (a.id > b.id ? 1 : -1))
    this.dataAlls.photos = this.dataSaryCateg;
    this.dataAlls.profil = this.dataProfils;
    this.serviceDbService.exportAsExcelFile(this.dataAlls).subscribe(res => {
    }) 
    $('#myModalArticleAdmin').modal('hide');
  }

  addArticles() {
    this.isAddArticles = true;
    this.imgModalSelected = "";
    this.textModalSelected = "";
    this.titleModalSelected = "";
    this.dateModalSelected = "";
    $('#myModalArticleAdmin').modal('show');
  }
  SaveArticles() {
    var item: articleModel = new articleModel();
    item.categorie = 'fiangonana';
    item.title = this.titleModalSelected
    item.description = this.textModalSelected.replaceAll('\n', '</br>').replaceAll('é', '\u00E9'),
    item.descriptionDefault = this.textModalSelected.replaceAll('\n', '</br>').replaceAll('é', '\u00E9'),
    item.user = 'user-fpma';
    item.img = '';
    item.date = new Date();
    var idx = 0;
    this.dataArcticles.forEach(res => {
      if (res.id > idx) {
        idx = res.id;
      }
    })
    item.id = idx + 1;
    this.dataArcticles.unshift(item);
    this.exportAsXLSX();
    this.isAddArticles = false;
  }

  photoNameInput: string = "";
  clearPhotoNameSelected() {
    this.photoNameInput = "";
    $('#myModalPhotoAdmin').modal('hide');
  }
  showPhotoNameSelected() {
    $('#myModalPhotoAdmin').modal('show');
  }

  SavePhotoName() {
    var item: saryModel = new saryModel();
    var idx = 0;
    this.dataSaryCateg.forEach(res => {
      if (res.id > idx) {
        idx = res.id;
      }
    })
    item.id = idx + 1;
    item.category = this.photoNameInput;
    item.img = this.selectedType == 'photo' ? '' : this.videoNameInput;
    item.date = new Date();
    item.type = this.selectedType;
    this.dataSaryCateg.push(item);
    this.clearPhotoNameSelected();
    this.exportAsXLSX();
  }
}
