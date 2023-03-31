/*
 * @lc app=leetcode id=1444 lang=javascript
 *
 * [1444] Number of Ways of Cutting a Pizza
 */

// @lc code=start
/**
 * @param {string[]} pizza
 * @param {number} pieceNumber
 * @return {number}
 */
var ways = function (pizza, pieceNumber) {
    const M = pizza.length;
    const N = pizza[0].length;
    const APPLE = 'A';
    const MOD = 10 ** 9 + 7;

    /** @type {Map<string, number>} */
    const memo = new Map();

    /**
     * @param {[number, number]} topLeft
     * @param {number} leftPieceNumber
     * @returns {number}
     */
    const waysRecursive = ([x, y], leftPieceNumber) => {
        if (x === M || y === N) return 0;

        const memoKey = `${x}-${y}-${leftPieceNumber}`;
        if (memo.has(memoKey)) return memo.get(memoKey);

        if (leftPieceNumber === 1) {
            for (let i = x; i < M; i++) {
                for (let j = y; j < N; j++) {
                    if (pizza[i][j] === APPLE) {
                        memo.set(memoKey, 1);
                        return 1;
                    }
                }
            }
            memo.set(memoKey, 0);
            return 0;
        }

        let wayNumber = 0;
        let hasApple = false;

        for (let i = x; i < M; i++) {
            for (let j = y; j < N; j++) {
                if (pizza[i][j] === APPLE) {
                    hasApple = true;
                    break;
                }
            }

            if (hasApple) {
                wayNumber += waysRecursive([i + 1, y], leftPieceNumber - 1);
            }
        }

        hasApple = false;
        for (let j = y; j < N; j++) {
            for (let i = x; i < M; i++) {
                if (pizza[i][j] === APPLE) {
                    hasApple = true;
                    break;
                }
            }

            if (hasApple) {
                wayNumber += waysRecursive([x, j + 1], leftPieceNumber - 1);
            }
        }

        wayNumber %= MOD;

        memo.set(memoKey, wayNumber);
        return wayNumber;
    };

    const result = waysRecursive([0, 0], pieceNumber);
    return result;
};
// @lc code=end

ways(['.A..A', 'A.A..', 'A.AA.', 'AAAA.', 'A.AA.'], 5); // 153
