import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { saryModel } from '../model-data';
import { DomSanitizer } from '@angular/platform-browser';
import { DataGlobal } from '../data-global';
declare var $: any;
@Component({
  selector: 'app-app-gallery',
  templateUrl: './app-gallery.component.html',
  styleUrl: './app-gallery.component.css'
})
export class AppGalleryComponent implements OnInit {

  @Input() dataSary: saryModel = new saryModel ;
  @Input() type: string = "";
  @Input() categSary: string = "";
  @Output() onSelected = new EventEmitter<any>();

  isProd: boolean = DataGlobal.isProd;
  constructor( private sanitizer: DomSanitizer) { }
  nbCol: number = 0;

  nbColArray: any = [];
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    this.nbCol = (this.dataSary.img.length % 3 == 0) ? (this.dataSary.img.length / 3) : Math.floor((this.dataSary.img.length / 3) + 1);
    this.nbColArray = Array.from({ length: this.nbCol }, (v, k) => k + 1);
  }

  imgSelected(url: string, idx: number) { 
    this.onSelected.next({ url: url, id: idx, dataSary: this.dataSary, categ: this.categSary });
  }
}
