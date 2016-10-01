// angular
import { Injectable } from "@angular/core";

// models
import { Tag } from "./../models/tag";

//mock
import { TAGS } from "./mock.tags";
@Injectable()
export class TagService {
    tags = TAGS;

    public getMostRelavantTags(count: number) {
        
        if (this.tags.length > count) {
            return Promise.resolve(this.tags.slice(0, count));
        }

        return Promise.resolve(this.tags);

    }
}