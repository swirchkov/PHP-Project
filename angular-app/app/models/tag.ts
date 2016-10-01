export class Tag {
    private id: number;
    private tag : string;

    public constructor(tag = null, id = 0) {
        this.tag = tag;
        this.id = id;
    }

    public get Id() { return this.id; }

    public get Tag() { return this.tag; }
    
}