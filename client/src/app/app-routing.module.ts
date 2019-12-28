import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomComponent } from './components/room/room.component';
import { AuthGuard } from './services/guard.service';

const routes: Routes = [
  {
    component: HomeComponent, 
    path: 'home',
    canActivate: [AuthGuard],
  },
  {
    component: AuthComponent, path: 'user/auth' 
  },
  {
    component: RegisterComponent, path: 'user/register'
  },
  {
    component: RoomComponent, path: 'user/classroom/:id', canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
