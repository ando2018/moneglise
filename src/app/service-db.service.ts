import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
//import { saveAs } from '@types/file-saver';
import * as XLSX from 'xlsx';
import { DataGlobal } from './data-global';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ServiceDbService {

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };

  // HttpClient API get() method => Fetch employee
  getContentJSON(urlApi:string): Observable<any> {
    return this.http
      .get<any>(urlApi, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Fetch employee
  postContentJSON(urlApi: string,data : any): Observable<any> {
    return this.http
      .post<any>(urlApi,data, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }


  onlyUnique(value: number, index: number, array: any) {
    return array.indexOf(value) === index;
  }


  public exportAsExcelFile(
    json: any): Observable<any>  {
    const worksheetArticles: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.articles);
    const worksheetEvenements: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.evenements);
    const worksheetInfos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.infos);
    const worksheetPhotos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.photos);
    const worksheetProfil: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json.profil);


    // id	name	username	email
    const workbook: XLSX.WorkBook = {
      Sheets: { articles: worksheetArticles, evenements: worksheetEvenements, infos: worksheetInfos, photos: worksheetPhotos, profil: worksheetProfil },
      SheetNames: ['articles', 'evenements', 'infos', 'photos', 'profil'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    return this.saveAsExcelFile(excelBuffer);
  }

  private saveAsExcelFile(buffer: any): Observable<any>  {
    const file: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
      
    });
    const formData: FormData = new FormData();
    formData.append('file', file);

     return this.http
       .post<any>( DataGlobal.urlBase + "uploadxlsx", formData, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
