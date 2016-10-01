export class Article {
    private id: number;
    private title: string;
    private authorName: string;
    private authorId : number;
    private text: string;
    private tags : string[];
    private imageUrl : string;

    public constructor( title = null, authorName = null, authorId = 0, text = null, tags = null, imageUrl = null, id = 0 ) {
        this.title = title;
        this.authorName = authorName;
        this.authorId = authorId;
        this.id = id;
        this.text = text;
        this.tags = tags;
        this.imageUrl = imageUrl;
    }

    public get Id() { return this.id; }

    public get Title() { return this.title; }
    public set Title(value: string) { this.title = value; }

    public get AuthorName() { return this.authorName; }
    public set AuthorName(value: string) { this.authorName = value; }

    public get AuthorId() { return this.authorId; }
    public set AuthorId(value: number) { this.authorId = value; }

    public get Text() { return this.text; }
    public set Text(value: string) { this.text = value }

    public get Tags() { return this.tags; }
    public set Tags(value : string[]) { this.tags = value }

    public get ImageUrl() { return this.imageUrl; }
    public set ImageUrl(value: string) { this.imageUrl = value; }

}