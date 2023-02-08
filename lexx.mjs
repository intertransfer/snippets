export class Lexx {
    #rulemap;

    constructor(rules) {
        var i = -1;
        this.#rulemap = Object.entries(rules).map(x => { i++; return {
            id       : i,
            regex    : new RegExp(x[0], 'g'),
            func     : x[1]
        } });
    }

    exec(text) {
        var matches = [];
        for (var x of this.#rulemap) {
            var match;
            while ((match = x.regex.exec(text)) != null) {
                matches.push([x, match]);
            }
        }
        return matches.sort((a, b) => a[1].index - b[1].index).map(x => x[0].func(x[1])).join('');
    }
}
