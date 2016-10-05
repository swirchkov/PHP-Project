// models
import { User } from "./models/user";

export class Session {
    private static authenticatedUser : User = null;

    public static get AuthenticatedUser() { return this.authenticatedUser; }
    public static set AuthenticatedUser(value: User) { this.authenticatedUser = value; }; 
    
}