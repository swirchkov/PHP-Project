// angular
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

// components
import { AppComponent } from "./app.component";
import { NoteListComponent } from "./note-list.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";

// routing
import { routing } from "./app.routing";

// services
import { UserService } from "./services/user.service";
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        NoteListComponent,
        LoginComponent,
        RegisterComponent
    ],
    providers : [
        UserService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}