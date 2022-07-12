/*
 * @lc app=leetcode id=1220 lang=javascript
 *
 * [1220] Count Vowels Permutation
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countVowelPermutation = function (n) {
    /**
     * dp[letter][i] 当字符串长度为 i 且当前结尾字母是 letter，有多少种字符串
     *
     * base case
     * dp[letter][1] = 1
     *
     * dp[letter][i] =
     * if(letter === 'null')
     *      sum(dp[a.e.i.o.u][i-1])
     * else if(letter === 'a')
     *      sum(dp[e,i,u][i-1])
     * else if(letter === 'e')
     *      sum(dp[a,i][i-1])
     * else if(letter === 'i')
     *      sum(dp[e,o][i-1])
     * else if(letter === 'o')
     *      sum(dp[i][i-1])
     * else if(letter === 'u')
     *      sum(dp[o,i][i-1])
     *
     * 内存优化
     */
    let dp = {
        a: 0,
        e: 0,
        i: 0,
        o: 0,
        u: 0,
    };
    let prevDp = {
        a: 1,
        e: 1,
        i: 1,
        o: 1,
        u: 1,
    };

    const MOD = 10 ** 9 + 7;

    for (let i = 2; i <= n; i++) {
        for (const letter of Object.keys(dp)) {
            switch (letter) {
                case 'a': {
                    dp[letter] =
                        (prevDp['e'] + prevDp['i'] + prevDp['u']) % MOD;
                    break;
                }
                case 'e': {
                    dp[letter] = (prevDp['a'] + prevDp['i']) % MOD;
                    break;
                }
                case 'i': {
                    dp[letter] = (prevDp['e'] + prevDp['o']) % MOD;
                    break;
                }
                case 'o': {
                    dp[letter] = prevDp['i'];
                    break;
                }
                case 'u': {
                    dp[letter] = (prevDp['i'] + prevDp['o']) % MOD;
                    break;
                }
            }
        }

        prevDp = dp;
        dp = {
            a: 0,
            e: 0,
            i: 0,
            o: 0,
            u: 0,
        };
    }

    const sum = Object.values(prevDp).reduce(
        (prev, curr) => (prev + curr) % MOD,
    );

    return sum;
};
// @lc code=end
