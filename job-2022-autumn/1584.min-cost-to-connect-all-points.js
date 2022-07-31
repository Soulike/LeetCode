/*
 * @lc app=leetcode id=1584 lang=javascript
 *
 * [1584] Min Cost to Connect All Points
 */

// @lc code=start
// @ts-ignore
class UnionFindSet {
    /** @type {number[]} */
    #parent;
    /** @type {number} */
    #count;

    /**
     * @param {number} size
     */
    constructor(size) {
        this.#parent = new Array(size);
        for (let i = 0; i < size; i++) {
            this.#parent[i] = i;
        }
        this.#count = size;
    }

    getCount() {
        return this.#count;
    }

    /**
     * @param {number} element1
     * @param {number} element2
     * @returns {void}
     */
    union(element1, element2) {
        const root1 = this.#find(element1);
        const root2 = this.#find(element2);
        if (root1 !== root2) {
            this.#count--;
        }
        this.#parent[root2] = root1;
    }

    /**
     * @param {number} element
     * @returns {number}
     */
    #find(element) {
        let currentElement = element;
        while (this.#parent[currentElement] !== currentElement) {
            currentElement = this.#parent[currentElement];
            this.#parent[currentElement] = this.#find(
                this.#parent[currentElement],
            );
        }
        return currentElement;
    }

    /**
     * @param {number} element1
     * @param {number} element2
     * @returns {boolean}
     */
    isConnected(element1, element2) {
        return this.#find(element1) === this.#find(element2);
    }
}

// @ts-ignore
class Edge {
    /** @type {number} */
    from;
    /** @type {number} */
    to;
    /** @type {number} */
    distance;

    /**
     * @param {number} from
     * @param {number} to
     * @param {readonly [number, number][]} points
     */
    constructor(from, to, points) {
        this.from = from;
        this.to = to;
        this.distance =
            Math.abs(points[from][0] - points[to][0]) +
            Math.abs(points[from][1] - points[to][1]);
    }
}

/**
 * @param {[number, number][]} points
 * @return {number}
 */
// @ts-ignore
var minCostConnectPoints = function (points) {
    const n = points.length;

    /** @type {Edge[]} */
    const edges = [];
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            edges.push(new Edge(i, j, points));
        }
    }

    edges.sort((e1, e2) => e1.distance - e2.distance);

    const unionFindSet = new UnionFindSet(n);

    let cost = 0;

    for (const {from, to, distance} of edges) {
        if (!unionFindSet.isConnected(from, to)) {
            unionFindSet.union(from, to);
            cost += distance;
            if (unionFindSet.getCount() === 1) {
                break;
            }
        }
    }

    return cost;
};
// @lc code=end
