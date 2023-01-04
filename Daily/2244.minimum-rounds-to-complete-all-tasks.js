/*
 * @lc app=leetcode id=2244 lang=javascript
 *
 * [2244] Minimum Rounds to Complete All Tasks
 */

// @lc code=start
/**
 * @param {number[]} tasks
 * @return {number}
 */
var minimumRounds = function (tasks) {
    /**
     * @param {number} taskCount
     * @returns {number} - -1 if impossible
     */
    const getMinRoundCount = (taskCount) => {
        if (taskCount === 1) return -1;
        return Math.floor((taskCount + 2) / 3);
    };

    /** @type {{[key:number]: number}} */
    const taskDifficultyToCounts = {};
    for (const taskDifficulty of tasks) {
        taskDifficultyToCounts[taskDifficulty] =
            (taskDifficultyToCounts[taskDifficulty] ?? 0) + 1;
    }

    /** @type {number[]} */
    const taskCounts = Array.from(Object.values(taskDifficultyToCounts));
    taskCounts.sort((a, b) => a - b);

    let minTotalRoundCount = 0;
    for (const taskCount of taskCounts) {
        const minRoundCount = getMinRoundCount(taskCount);
        if (minRoundCount === -1) return -1;
        minTotalRoundCount += minRoundCount;
    }

    return minTotalRoundCount;
};
// @lc code=end
