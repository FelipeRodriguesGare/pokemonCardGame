import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LibaryComponent } from './libary/libary.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "game", component: ContentComponent, canActivate: [AuthGuard]},
  {path: "home", component: HomePageComponent},
  {path: "libary", component: LibaryComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
