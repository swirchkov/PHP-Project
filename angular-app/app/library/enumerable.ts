export class Enumerable<T> {
    private arr : T[];
    private elementsPerRequest: number;
    private position : number;

    public constructor(arr : T[], elementsPerRequest : number, startPosition  = -1) {
        this.arr = arr;
        this.elementsPerRequest = elementsPerRequest;
        this.position = startPosition;
    }

    public Next() : T[] {

        if (this.arr.length < this.elementsPerRequest) {
            return this.arr;
        }

        if (!this.canMoveNext()) {
            return [];
        }

        this.position++;
        
        if ((this.position + 1) * this.elementsPerRequest > this.arr.length) {
            return this.arr.slice(this.position * this.elementsPerRequest);
        }

        return this.arr.slice(this.position * this.elementsPerRequest, (this.position + 1) * this.elementsPerRequest);
    }

    public canMoveNext() {
        return this.arr.length >= this.elementsPerRequest && (this.position + 1) * this.elementsPerRequest  < this.arr.length;
    }

    public Previous(): T[] {
        
        if (! this.canMoveBack()) {
            return [];
        }

        this.position--;
        return this.arr.slice(this.position * this.elementsPerRequest , (this.position + 1)* this.elementsPerRequest);
    }

    public Reset() : T[] {
        this.position = -1;
        return this.Next();
    }

    public canMoveBack() {
        return this.position > 0;
    }


    //public MaxRequestNumber() : number {
    //    return this.arr.length / this.elementsPerRequest;
    //}

    //public RequestAtIndex(index: number) : T[] {
    //    return this.arr.slice(index * this.elementsPerRequest, (index + 1) * this.elementsPerRequest);
    //}
    
}