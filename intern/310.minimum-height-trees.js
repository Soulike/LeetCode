/*
 * @lc app=leetcode id=310 lang=javascript
 *
 * [310] Minimum Height Trees
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
const findMinHeightTrees = function (n, edges) {
    if (n === 1) {
        return [0];
    }
    /**
     * @type {Map<number, Set<number>>}
     */
    const connects = new Map();
    for (const [node1, node2] of edges) {
        const node1Edges = connects.get(node1) ?? new Set();
        node1Edges.add(node2);
        connects.set(node1, node1Edges);

        const node2Edges = connects.get(node2) ?? new Set();
        node2Edges.add(node1);
        connects.set(node2, node2Edges);
    }

    let eraseQueue = [];
    for (const [node1, node1Connects] of connects) {
        if (node1Connects.size === 1) {
            eraseQueue.push(node1);
        }
    }
    while (n > 2) {
        n -= eraseQueue.length;
        const eraseQueueCopy = [...eraseQueue];
        eraseQueue = [];
        for (const node of eraseQueueCopy) {
            const nodeConnects = connects.get(node);
            for (const nodeConnect of nodeConnects) {
                connects.get(nodeConnect).delete(node);
                if (connects.get(nodeConnect).size === 1) {
                    eraseQueue.push(nodeConnect);
                }
            }
            connects.delete(node);
        }
    }
    return eraseQueue;
};
// @lc code=end
