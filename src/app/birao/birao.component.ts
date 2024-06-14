import { Component, OnInit } from '@angular/core';
import { ServiceDbService } from '../service-db.service';
import { profilModel, profilSampanaModel } from '../model-data';
import { DataGlobal } from '../data-global';

@Component({
  selector: 'app-birao',
  templateUrl: './birao.component.html',
  styleUrl: './birao.component.css'
})

export class BiraoComponent implements OnInit {
  //urlApi: string = "././assets/json/profil.json";
  urlApi: string = DataGlobal.urlBase + "readProfil";
  dataProfilBirao: profilModel = new profilModel; 
  dataProfilVaomiera: profilModel = new profilModel; 
  dataProfilSampana: Array<profilSampanaModel> = new Array<profilSampanaModel>; 
  dataProfilMpitandrina: profilModel = new profilModel;  
  constructor(private serviceDbService: ServiceDbService) { }
  ngOnInit() {
    this.serviceDbService.getContentJSON(this.urlApi).subscribe(res => {
      if (res) {
        //console.log(res);
        let dataMpi = res.filter((t: { categorie: string; }) => t.categorie === "Mpitandrina");
        this.dataProfilMpitandrina.categorie = "Mpitandrina";
        this.dataProfilMpitandrina.coupleNomImg = dataMpi.map((res: profilModel) => res.coupleNomImg)
        this.dataProfilMpitandrina.profil = "Mpitandrina";

        let dataBirao = res.filter((t: { categorie: string; }) => t.categorie === "Birao");
        this.dataProfilBirao.categorie = "Birao";
        this.dataProfilBirao.coupleNomImg = dataBirao.map((res: profilModel) => res.coupleNomImg)


        let dataVaomiera  = res.filter((t: { categorie: string; }) => t.categorie === "Ny vaomiera");
        this.dataProfilVaomiera.categorie = "Ny Vaomiera"
        this.dataProfilVaomiera.coupleNomImg = dataVaomiera.map((res: profilModel) => res.coupleNomImg)

        let dataSampana = res.filter((t: { categorie: string; }) => t.categorie === "Sampana");
        let lstSampana : Array<string> = dataSampana.map((res: any) => res.mpikambanaProfil).filter(this.serviceDbService.onlyUnique);
        lstSampana.forEach(res => {
          this.dataProfilSampana.push({ "categorie": res, "coupleNomImg": dataSampana.filter((t: { mpikambanaProfil: string; }) => t.mpikambanaProfil === res)  });
        })
        console.log(this.dataProfilSampana)
      }
    }, (err) => {
      console.log(err)
    })
   }
}
