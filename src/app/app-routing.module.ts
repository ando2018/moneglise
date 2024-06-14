import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BiraoComponent } from './birao/birao.component';
import { SampanaComponent } from './sampana/sampana.component';
import { SaryComponent } from './sary/sary.component';
import { ContactComponent } from './contact/contact.component';
import { FoibeComponent } from './foibe/foibe.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { BibleComponent } from './bible/bible.component';
import { AuthGuardService } from './auth.guard.ts';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'accueil'
  },
  { path: 'accueil', component: AccueilComponent },
  { path: 'birao', component: BiraoComponent },
  { path: 'vaovao', component: SampanaComponent },
  { path: 'sary', component: SaryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'foibe', component: FoibeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
  { path: 'bible', component: BibleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
