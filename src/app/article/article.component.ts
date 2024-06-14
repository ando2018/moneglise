import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataGlobal } from '../data-global';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
 
  @Input() imgSrc: string = '';
  @Input() date: string = '';
  @Input() user: string = '';
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() id: string = '';
  @Input() typePage: string = '';
  
  @Output() onSelected = new EventEmitter<string>();
  isProd: boolean = DataGlobal.isProd;
  textShow: string = '';
  textDefault: string = '';
  textBadge1: string =
    DataGlobal.textBadge1;
  textBadge2: string = DataGlobal.textBadge2;
  ngOnInit(): void {
    this.textDefault = this.text;
    this.textShow = this.text.length > 250 ? this.text.substring(0, 250) + ' ...' : this.text;
  }
  articleSelected() {
    this.onSelected.next(this.id);
  }

}
