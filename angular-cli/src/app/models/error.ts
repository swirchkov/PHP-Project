export class Error {
    
    private type : string;
    private message : string;

    public constructor(type = '', message = '') {
        this.type = type;
        this.message = message;
    } 

    public get Type() { return this.type; }
    public set Type(value: string) { this.type = value; }

    public get Message() { return this.message; }
    public set Message(value : string) { this.message = value; }
}