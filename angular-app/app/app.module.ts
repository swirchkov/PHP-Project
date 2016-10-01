// angular
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// components
import { AppComponent } from "./app.component";
import { ArticleListComponent } from "./article-list.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";

// routing
import { routing } from "./app.routing";

// services
import { UserService } from "./services/user.service";
import { ArticleService } from "./services/article.service";
import { TagService } from "./services/tag.service";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        ArticleListComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers : [
        UserService,
        ArticleService,
        TagService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}