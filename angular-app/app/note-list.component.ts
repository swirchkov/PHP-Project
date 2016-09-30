import { Component } from "@angular/core";

// models
import { User } from "./models/user";

// constraints
import { Constraints } from "./constraints";

@Component({
    selector: 'note-list',
    templateUrl: "app/views/note-list.component.html",
    styleUrls: [ 'app/styles/note-list.component.css' ]
})
export class NoteListComponent {
    user : User;

    constructor() {
        this.user = Constraints.AuthenticatedUser;
        console.log(this.user);
    }
}