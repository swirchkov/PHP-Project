// models
import { User } from "./models/user";

export class Session {
    private static authenticatedUser : User = null;

    public static get AuthenticatedUser() { 
        var user = this.authenticatedUser;
        if (user == null) {
            var store = localStorage.getItem('User');
            var parseUser = JSON.parse(store);

            if (parseUser == null) {
                return null;
            }
            else {
                return new User(parseUser.login, parseUser.email, parseUser.password, parseUser.imageSrc, parseUser.imageId, 
                            parseUser.id);
            }
        }
        return this.authenticatedUser; 
    }
    public static set AuthenticatedUser(value: User) { 
        this.authenticatedUser = value; 

        if (value == null) {
            localStorage.removeItem('User');
        }

        localStorage.setItem('User', JSON.stringify(value));
    }; 
    
}