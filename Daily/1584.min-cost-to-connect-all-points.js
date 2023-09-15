/*
 * @lc app=leetcode id=1584 lang=javascript
 *
 * [1584] Min Cost to Connect All Points
 */

// @lc code=start
class UnionFindSet {
    /** @type {number[]} */
    #parent;
    /** @type {number} */
    #groupCount;

    /**
     * @param {number} size
     */
    constructor(size) {
        this.#parent = new Array(size);
        for (let i = 0; i < size; i++) {
            this.#parent[i] = i;
        }
        this.#groupCount = size;
    }

    getGroupCount() {
        return this.#groupCount;
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
            this.#groupCount--;
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

/**
 * @param {[x: number, y: number][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
    /** @type {[point1: number, point2: number, distance: number][]} */
    const distances = [];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const manhattanDistance = getManhattanDistance(
                points[i],
                points[j],
            );
            distances.push([i, j, manhattanDistance]);
        }
    }

    distances.sort(
        ([, , manhattanDistance1], [, , manhattanDistance2]) =>
            manhattanDistance1 - manhattanDistance2,
    );

    let cost = 0;

    const ufSet = new UnionFindSet(points.length);

    for (let i = 0; i < distances.length; i++) {
        const [x, y, manhattanDistance] = distances[i];
        if (ufSet.isConnected(x, y)) continue;

        cost += manhattanDistance;
        ufSet.union(x, y);

        if (ufSet.getGroupCount() === 1) break;
    }

    return cost;
};

/**
 * @param {[x: number, y: number]} point1
 * @param {[x: number, y: number]} point2
 * @returns {number}
 */
function getManhattanDistance(point1, point2) {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}
// @lc code=end

minCostConnectPoints([
    [2, -3],
    [-17, -8],
    [13, 8],
    [-17, -15],
]);
