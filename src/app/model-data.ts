export class ModelData {

}
export class profilModel {
  "profil": string;
  "nom": string;
  "coupleNomImg": Array<nomImgModel>;
  "description": string;
  "categorie": string;
  "img": string;
  "mpikambana": Array<mpikambanaModel>
}
export class mpikambanaModel {
  "profil": string;
  "nom": Array<nomImgModel>
}
export class nomImgModel {
  "nom": string;
  "img": string;
  "profil": string;
}


export class profilSampanaModel {
  "categorie": string;
  "coupleNomImg": Array<nomImgModel>;
}

export class eventModel {

  "title": string;
  "heure": string;
  "lieu": string;
  "description": string;
  "jour": string;
  "le": string;
  "mois": string;
  "date": Date;
  "type": string;
  "isOK": boolean;
}


export class articleModel {
  "id": number;
  "title": string;
  "description": string;
  "descriptionDefault": string;
  "user": string;
  "img": string;
  "date": Date;
  "categorie": string;
}

export class infoModel {
  "id": number;
  "title": string;
  "description": string;
  "date": Date;
}

export class saryModel {
  "category": string;
  "title": string;
  "description": string;
  "img": any;
  "date": Date;
  "id": number;
  "type": string;
}


export class categSaryModel {
  "categ": string;
  "data": Array<saryModel>;
}
