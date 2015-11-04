import {DoneStore, Item} from './done-store'


function suggestions(filter:string, items:Item[], limit:number) {
    console.log(items)
    var reg = '(^|\\s)' + filter.split(/\s+/).join('.*\\s');
    var regex = new RegExp(reg)
    return (filter.length > 0 ? [filter] : []).concat(items
            .filter(item => regex.test(item.text))
            .sort((a, b) => b.used - a.used)
            .map(i => i.text)
            .slice(0, limit - 1))

}

export class SuggestionService {
    constructor(public store:DoneStore) {}
    public suggest(filter:string, limit:number = 9) {
        return this.store.list()
            .then(items => suggestions(filter, items, limit))
    }
}