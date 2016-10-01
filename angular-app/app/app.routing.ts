import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from "./register.component";
import { ArticleListComponent } from './article-list.component';

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
    }
];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);