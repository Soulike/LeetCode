/*
 * @lc app=leetcode id=785 lang=javascript
 *
 * [785] Is Graph Bipartite?
 */

// @lc code=start
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
    const NO_COLOR = 0;
    const COLOR1 = 1;
    const COLOR2 = 2;
    /**
     * @type {(0|1|2)[]}
     */
    const nodeColor = new Array(graph.length);
    nodeColor.fill(NO_COLOR);

    /**
     * @param {number} nodeIndex
     * @param {0|1|2} expectedColor
     * @returns {boolean}
     */
    const canPaint = (nodeIndex, expectedColor) => {
        if (nodeColor[nodeIndex] !== NO_COLOR) {
            return nodeColor[nodeIndex] === expectedColor;
        } else {
            nodeColor[nodeIndex] = expectedColor;
            const neighborColor = expectedColor === COLOR1 ? COLOR2 : COLOR1;
            const neighbors = graph[nodeIndex];
            for (const neighbor of neighbors) {
                if (!canPaint(neighbor, neighborColor)) {
                    return false;
                }
            }
            return true;
        }
    };

    for (let i = 0; i < graph.length; i++) {
        const currentColor = nodeColor[i];
        if (currentColor === NO_COLOR) {
            if (!canPaint(i, COLOR1)) {
                return false;
            }
        }
    }
    return true;
};

// @lc code=end
