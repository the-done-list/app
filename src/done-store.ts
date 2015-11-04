import {AsyncStorage} from 'react-native'
import * as Promise from 'bluebird'

const KEY = 'tdl.items'

export class Item {
    text: string;
    used: number;
}
export class DoneStore {
    private items:Promise<Item[]> = Promise.resolve(AsyncStorage.getItem(KEY))
        .then(result => result != null ? JSON.parse(result) : [])

    public list():Promise<Item[]> {
        return this.items;
    }

    public add(text:string) {
        if (!text || text.length < 1)
            throw new Error("Invalid entry!")

        console.log("Adding", text)
        this.items = this.items.then(items => {
            var item = items.filter(item => item.text == text)[0]
            if (!item) {
                items.push({text, used: 1})
            } else {
                item.used += 1
            }
            return items
        })
        this.items.then(_ => this.save())
        return this.items.thenReturn()
    }

    public save():Promise<void> {
        return this.items
            .then(items => AsyncStorage.setItem(KEY, JSON.stringify(items)))
            .thenReturn()
    }
}