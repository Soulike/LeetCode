/*
 * @lc app=leetcode id=1104 lang=javascript
 *
 * [1104] Path In Zigzag Labelled Binary Tree
 */

// @lc code=start
/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
    /**
     * the range of row `i`
     * [2^(i-1), 2^i-1]
     *
     * revertLabel(n)
     * get i from n
     * return (2^i-1)-n+(2^(i-1))
     *
     *
     * for a node in row `i` labelled as `n`
     *
     * parent label: Math.floor(revertLabel(n)/2)
     */

    /**
     * @param {number} label
     * @returns {number}
     */
    const getLayer = (label) => {
        let layerEndLabel = 1;
        let layer = 1;
        while (layerEndLabel < label) {
            layerEndLabel = layerEndLabel * 2 + 1;
            layer++;
        }

        return layer;
    };

    /**
     * @param {number} label
     * @param {number} layer
     * @returns {number}
     */
    const revertLabel = (label, layer) => {
        const rowStartLabel = 2 ** (layer - 1);
        const rowEndLabel = 2 * rowStartLabel - 1;

        return rowEndLabel - label + rowStartLabel;
    };

    /**
     * @param {number} label
     * @param {number} layer
     * @returns {number}
     */
    const getParent = (label, layer) => {
        return Math.floor(revertLabel(label, layer) / 2);
    };

    const result = [label];
    let layer = getLayer(label);

    while (result[result.length - 1] !== 1) {
        result.unshift(getParent(result[result.length - 1], layer));
        layer--;
    }

    return result.reverse();
};
// @lc code=end
