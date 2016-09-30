export class User {
    private id: number;
    private login : string;
    private email: string;
    private password : string;

    public constructor(login : string = null, email: string = null, password : string = null ) {
        this.email = email;
        this.login = login;
        this.password = password;
    }

    public get Id() : number { return this.id; }
    public set Id(value: number) { this.id = value; } 

    public get Login(): string { return this.login; }
    public set Login(value: string) { this.login = value; }

    public get Email() : string { return this.email; }
    public set Email(value: string) { this.email = value; }

    public get Password() : string { return this.password; }
    public set Password(value: string) { this.password = value; }
    
}