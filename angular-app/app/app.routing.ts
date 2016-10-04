import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from "./register.component";
import { ArticleListComponent } from './article-list.component';
import { ProfileComponent } from './profile.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo : '/articles',
        pathMatch: 'full'
    },
    {
        path: 'articles',
        component: ArticleListComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);