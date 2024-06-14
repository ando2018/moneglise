import { Component } from '@angular/core';
import { ServiceDbService } from '../service-db.service';
import { DataGlobal } from '../data-global';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private serviceDbService: ServiceDbService) { }
  urlApi: string = DataGlobal.urlBase + "contact";
  data: any = {
    nom: "",
    phone: "",
    email: "",
    message: ""
  };
  loading = false;
  messageSendTimer = false;

  sendMail(data : any) {
    this.loading = true;
    this.serviceDbService.postContentJSON(this.urlApi, { nom: this.data.nom, message: this.data.message, phone: this.data.phone,email : this.data.email }).subscribe(res => {
      this.loading = false;
      this.data = {
        nom: "",
        phone: "",
        email: "",
        message: ""
      };
      this.messageSendTimer = true;
      setTimeout(() => {
        this.messageSendTimer = false;
      }, 5000);
    }, err => {
      this.loading = false;
    })
  }
}
