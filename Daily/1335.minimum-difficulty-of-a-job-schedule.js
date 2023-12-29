/*
 * @lc app=leetcode id=1335 lang=javascript
 *
 * [1335] Minimum Difficulty of a Job Schedule
 */

// @lc code=start
/**
 * @param {number[]} jobDifficulty
 * @param {number} d
 * @return {number}
 */
var minDifficulty = function (jobDifficulty, d) {
    const JOB_COUNT = jobDifficulty.length;
    /** @type {Map<string, number>} */
    const memo = new Map();
    /**
     * @param {number} startJob
     * @param {number} days
     * @returns {number}
     */
    const dp = (startJob, days) => {
        if (days < 0 || JOB_COUNT - startJob < days) {
            return -1;
        }

        const memoKey = `${startJob}-${days}`;
        if (memo.has(memoKey)) return memo.get(memoKey);

        if (days === 1) {
            let max = 0;
            for (let i = startJob; i < JOB_COUNT; i++) {
                max = Math.max(jobDifficulty[i], max);
            }
            return max;
        }

        if (JOB_COUNT - startJob === days) {
            let sum = 0;
            for (let i = startJob; i < JOB_COUNT; i++) {
                sum += jobDifficulty[i];
            }
            memo.set(memoKey, sum);
            return sum;
        }

        let maxDifficultyToday = -Infinity;
        let minDifficulty = Infinity;
        for (let i = startJob; i < JOB_COUNT; i++) {
            const restDaysMinDifficulty = dp(i + 1, days - 1);
            if (restDaysMinDifficulty === -1) continue;
            maxDifficultyToday = Math.max(maxDifficultyToday, jobDifficulty[i]);
            minDifficulty = Math.min(
                minDifficulty,
                maxDifficultyToday + restDaysMinDifficulty,
            );
        }
        const result = minDifficulty === Infinity ? -1 : minDifficulty;
        memo.set(memoKey, result);
        return result;
    };

    const result = dp(0, d);
    return result;
};
// @lc code=end

minDifficulty([7, 1, 7, 1, 7, 1], 3); // 15
