/*
 * @lc app=leetcode id=542 lang=javascript
 *
 * [542] 01 Matrix
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
    const M = mat.length;
    const N = mat[0].length;

    /** @type {number[][]} */
    const distances = [];
    for (let i = 0; i < M; i++) {
        distances.push(new Array(N).fill(Infinity));
    }

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (mat[i][j] === 0) {
                distances[i][j] = 0;
            }
        }
    }

    let changed = true;

    while (changed) {
        changed = false;
        for (let i = 0; i < M; i++) {
            for (let j = 0; j < N; j++) {
                const originalDistance = distances[i][j];
                if (mat[i][j] !== 0) {
                    if (i - 1 >= 0) {
                        distances[i][j] = Math.min(
                            distances[i][j],
                            distances[i - 1][j] + 1,
                        );
                    }
                    if (i + 1 <= M - 1) {
                        distances[i][j] = Math.min(
                            distances[i][j],
                            distances[i + 1][j] + 1,
                        );
                    }
                    if (j - 1 >= 0) {
                        distances[i][j] = Math.min(
                            distances[i][j],
                            distances[i][j - 1] + 1,
                        );
                    }
                    if (j + 1 <= N - 1) {
                        distances[i][j] = Math.min(
                            distances[i][j],
                            distances[i][j + 1] + 1,
                        );
                    }

                    if (originalDistance !== distances[i][j]) {
                        changed = true;
                    }
                }
            }
        }
    }
    return distances;
};
// @lc code=end
