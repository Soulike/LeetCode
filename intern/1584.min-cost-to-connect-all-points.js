/*
 * @lc app=leetcode id=1584 lang=javascript
 *
 * [1584] Min Cost to Connect All Points
 */

// @lc code=start
class UFNode {
    /** @type {number} */
    point;
    /** @type {UFNode} */
    parent;
    /** @type {number} */
    size;

    /** @param {string} point*/
    constructor(point) {
        this.point = point;
        this.parent = this;
        this.size = 1;
    }
}

class UF {
    /** @type {Map<number, UFNode>} */
    pointToNode;

    /** @type {number} */
    independentGraphCount;

    constructor() {
        this.pointToNode = new Map();
        this.independentGraphCount = 0;
    }

    addPoint(point) {
        if (this.getPointNode(point) === undefined) {
            this.pointToNode.set(point, new UFNode(point));
            this.independentGraphCount++;
        }
    }

    getPointNode(point) {
        return this.pointToNode.get(point);
    }

    /**
     * @param {UFNode} node1
     * @param {UFNode} node2
     * @returns {void}
     */
    union(node1, node2) {
        const root1 = this.find(node1);
        const root2 = this.find(node2);

        if (root1 === root2) {
            return;
        }

        if (root1.size > root2.size) {
            root2.parent = root1;
            root1.size += root2.size;
        } else {
            root1.parent = root2;
            root2.size += root1.size;
        }
        this.independentGraphCount--;
    }

    /**
     * 查看 node 所在集合
     * @param {UFNode} node
     * @returns {UFNode}
     */
    find(node) {
        while (node.parent !== node) {
            node.parent = node.parent.parent;
            node = node.parent;
        }
        return node;
    }
}

class Edge {
    xId;
    yId;
    distance;

    constructor(xId, yId, distance) {
        this.xId = xId;
        this.yId = yId;
        this.distance = distance;
    }
}

/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
    const edges = [];

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[j];
            const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);
            edges.push(new Edge(i, j, distance));
        }
    }

    edges.sort((e1, e2) => e1.distance - e2.distance);

    const uf = new UF();
    for (let i = 0; i < points.length; i++) {
        uf.addPoint(i);
    }

    let minCost = 0;
    if (uf.independentGraphCount === 1) {
        return minCost;
    }

    for (const {xId, yId, distance} of edges) {
        const node1 = uf.getPointNode(xId);
        const node2 = uf.getPointNode(yId);
        const root1 = uf.find(node1);
        const root2 = uf.find(node2);
        if (root1 !== root2) {
            uf.union(root1, root2);
            minCost += distance;
        }

        if (uf.independentGraphCount === 1) {
            return minCost;
        }
    }
};
// @lc code=end
