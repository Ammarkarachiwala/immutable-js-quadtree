import { Record, List } from 'immutable';


const n = {
    data: null
}
class Node extends Record(n) {
    constructor(props) {
        super(props)
    }
}

const r = { 
    _x: (o) => o.x,
    _y: (o) => o.y,
    extent: [
        [ Number.MIN_VALUE, Number.MAX_VALUE ],
        [ Number.MIN_VALUE, Number.MAX_VALUE ]
    ],
    root: null,
};

class QuadTree extends Record(r)  {
    constructor({x = 'x', y = 'y', extent}) {
        this._x = typeof x === "function" ? x : (o) => o[x];
        this._y = typeof y === "function" ? y : (o) => o[y];
        this.extent = extent

    }

    addAll(data = new List()) {
        this.extent = data.reduce(([ maxX, minX, maxY, minY ], d) => {
            const x = this._x.call(null, d);
            const y = this._y.call(null, d);
            return [
                [Math.max(x, maxX), Math.min(x, minX)],
                [Math.max(y, maxY), Math.max(y, minY)]
            ]
        }, this.extent)
        return this;
    }
    addPoint (d) {

    }

    addPoint(d) {
        const [
            [minX, minY],
            [maxX, maxY]
        ] = this.extent;
        const x = this._x.call(null, d);
        const y = this._y.call(null, d);
        const node = this.root;
        const leaf = new Node(d); 
        if(!node) {
            return this.update('root', (val) => leaf);
        }
        var x0 = minX, x1 = maxX, y0 = minY, y1 = maxY, xm,  ym;

        while(node.size) {
            if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
            if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
        }

    }
}


export default QuadTree;