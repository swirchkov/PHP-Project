"use strict";
var router_1 = require("@angular/router");
var login_component_1 = require('./login.component');
var register_component_1 = require("./register.component");
var article_list_component_1 = require('./article-list.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/articles',
        pathMatch: 'full'
    },
    {
        path: 'articles',
        component: article_list_component_1.ArticleListComponent
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