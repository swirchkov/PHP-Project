export class User {
    private id: number;
    private login : string;
    private email: string;
    private password : string;
    private imageSrc : string; // image src after user is registered and used for src argument
    private imageId : string;  // id used when user is registrating

    public constructor(login : string = null, email: string = null, password : string = null, imageSrc: string = null, 
                        imageId : string = null ) {
        this.email = email;
        this.login = login;
        this.password = password;
        this.imageId = imageId;
        this.imageSrc = imageSrc;
    }

    public get Id() : number { return this.id; }
    public set Id(value: number) { this.id = value; } 

    public get Login(): string { return this.login; }
    public set Login(value: string) { this.login = value; }

    public get Email() : string { return this.email; }
    public set Email(value: string) { this.email = value; }

    public get Password() : string { return this.password; }
    public set Password(value: string) { this.password = value; }

    public get ImageSrc() : string { return this.imageSrc; }
    public set ImageSrc(value : string) { this.imageSrc = value; }

    public get ImageId() : string { return this.imageId; }
    public set ImageId(value : string) { this.imageId = value; }
    
}