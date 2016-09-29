import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NoteListComponent } from "./note-list.component";
import { LoginComponent } from "./login.component";
import { RegisterComponent } from "./register.component";
import { routing } from "./app.routing";

@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        AppComponent,
        NoteListComponent,
        LoginComponent,
        RegisterComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}