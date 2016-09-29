"use strict";
var router_1 = require("@angular/router");
var login_component_1 = require('./login.component');
var register_component_1 = require("./register.component");
var note_list_component_1 = require('./note-list.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/notes',
        pathMatch: 'full'
    },
    {
        path: 'notes',
        component: note_list_component_1.NoteListComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map