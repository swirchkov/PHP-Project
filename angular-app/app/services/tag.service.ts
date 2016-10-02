// angular
import { Injectable } from "@angular/core";

// models
import { Tag } from "./../models/tag";

//mock
import { TAGS } from "./mock.tags";

// library classes
import { Enumerable } from './../library/enumerable';
@Injectable()
export class TagService {
    tags = TAGS;

    public getMostRelavantTags(count: number) {
        return Promise.resolve(new Enumerable(this.tags, count));
    }
}