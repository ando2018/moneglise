import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import { BiraoComponent } from './birao/birao.component';
import { SampanaComponent } from './sampana/sampana.component';
import { ContactComponent } from './contact/contact.component';
import { SaryComponent } from './sary/sary.component';
import { FoibeComponent } from './foibe/foibe.component';
import { SafePipe } from './safe.pipe';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilComponent } from './profil/profil.component';
import { DaterowComponent } from './daterow/daterow.component';
import { AppGalleryComponent } from './app-gallery/app-gallery.component';
import { BibleComponent } from './bible/bible.component';
import { SafeImgPipe } from './urlSanitez';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ServiceDbService } from './service-db.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent, 
    AccueilComponent,
    BiraoComponent,
    SampanaComponent,
    ContactComponent,
    SaryComponent,
    FoibeComponent,
    SafePipe,
    SafeImgPipe,
    LoginComponent,
    AdminComponent,
    ProfilComponent,
    DaterowComponent,
    AppGalleryComponent,
    BibleComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, CommonModule, FormsModule 

  ],
  providers: [ServiceDbService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { } 
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
