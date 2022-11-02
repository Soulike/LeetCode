/*
 * @lc app=leetcode id=433 lang=javascript
 *
 * [433] Minimum Genetic Mutation
 */

// @lc code=start
/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (start, end, bank) {
    const choices = ['A', 'C', 'G', 'T'];
    const bankSet = new Set(bank);
    /** @type {[gene: string[], steps: number][]} */
    const queue = [[[...start], 0]];

    const seen = new Set();

    while (queue.length > 0) {
        const [headGene, headSteps] = queue.shift();
        if (headGene.join('') === end) {
            return headSteps;
        }

        for (const choice of choices) {
            for (let i = 0; i < headGene.length; i++) {
                if (headGene[i] !== choice) {
                    const beforeMutation = headGene[i];
                    headGene[i] = choice;
                    const mutatedGeneStr = headGene.join('');
                    if (
                        bankSet.has(mutatedGeneStr) &&
                        !seen.has(mutatedGeneStr)
                    ) {
                        queue.push([[...mutatedGeneStr], headSteps + 1]);
                        seen.add(mutatedGeneStr);
                    }
                    headGene[i] = beforeMutation;
                }
            }
        }
    }

    return -1;
};
// @lc code=end
