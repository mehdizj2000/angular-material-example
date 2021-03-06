import { AuthGuardService } from './root-guard/auth-guard.service';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: OktaCallbackComponent },
  { path: 'owner', loadChildren: () => import('./owner/owner.module').then(m => m.OwnerModule), canActivate: [OktaAuthGuard] },
  { path: '404', component: NotFoundComponent},
  { path: '500', component: ServerErrorComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo:'/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
