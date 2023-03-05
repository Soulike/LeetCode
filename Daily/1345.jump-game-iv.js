/*
 * @lc app=leetcode id=1345 lang=javascript
 *
 * [1345] Jump Game IV
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var minJumps = function (arr) {
    const n = arr.length;
    if (n === 1) {
        return 0;
    }

    /** @type {Map<number, Set<number>>} */
    const valueToIndexes = new Map();

    for (let i = 0; i < n; i++) {
        const indexes = valueToIndexes.get(arr[i]) ?? new Set();
        indexes.add(i);
        valueToIndexes.set(arr[i], indexes);
    }

    /** @type {[index: number, steps: number][]} */
    const queue = [];
    queue.push([0, 0]);

    /** @type {Set<number>} */
    const visited = new Set();

    while (queue.length > 0) {
        const queueHead = queue.shift();
        if (queueHead === undefined) {
            throw new Error('queueHead is undefined');
        }
        const [index, step] = queueHead;

        if (index + 1 === n - 1) {
            return step + 1;
        }

        if (arr[index + 1] !== arr[index] && !visited.has(index + 1)) {
            visited.add(index + 1);
            queue.push([index + 1, step + 1]);
        }

        if (
            index - 1 >= 0 &&
            arr[index - 1] !== arr[index] &&
            !visited.has(index - 1)
        ) {
            visited.add(index - 1);
            queue.push([index - 1, step + 1]);
        }

        const connectedIndexes = valueToIndexes.get(arr[index]);
        if (connectedIndexes === undefined) {
            throw new Error('connectedIndexes is undefined');
        }

        for (const connectedIndex of connectedIndexes) {
            if (connectedIndex === n - 1) {
                return step + 1;
            }

            if (connectedIndex !== index && !visited.has(connectedIndex)) {
                visited.add(connectedIndex);
                queue.push([connectedIndex, step + 1]);
            }
        }
        // 已经到达过了，没必要从别的地方再来一次了，因为不会更近
        connectedIndexes.clear();
    }
};
// @lc code=end

minJumps([7]);
