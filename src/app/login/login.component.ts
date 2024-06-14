import { Component, OnDestroy } from '@angular/core';
import { ServiceDbService } from '../service-db.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataGlobal } from '../data-global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  id:string = '';
  pwd:string =  '';
  message:string = '';

  loading: boolean = false;
  urlApiDataLogin: string = DataGlobal.urlBase + "checkPwd";
  constructor(private serviceDbService: ServiceDbService, private route: Router, private cookieService: CookieService) { }

  public ngOnDestroy() {
    //this.cookieService.delete('session-key');
  }

  validation() {
    this.message = "";
    this.loading = true;
    this.serviceDbService.postContentJSON(this.urlApiDataLogin, { id :this.id, pwd: this.pwd }).subscribe(res => {
      this.loading = false;
      if (res && atob(res.res).split('.')[0] == 'OK') {
        this.cookieService.set('session-key', res.res);
        this.route.navigateByUrl('/admin');
      } else {
        this.cookieService.set('session-key', res.res);
        this.message = "Erreur , Vérifier votre accèes"
      }
    }, err => {
      this.loading = false;
      this.message = "";
    })
  }

  value = "";
  clearValue() {
    this.value = "";
  }


}
