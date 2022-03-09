/*
 * @lc app=leetcode id=851 lang=javascript
 *
 * [851] Loud and Rich
 */

// @lc code=start
/**
 * @param {[number, number][]} richer
 * @param {number[]} quiet
 * @return {number[]}
 */
const loudAndRich = function (richer, quiet)
{
    /**
     * answer[x] = y 
     * y 是和 x 一样有钱或比 x 更有钱的人里面最不安静的
     * 
     * 统计 i->[] 对于人 i，比 i 更有钱的人有哪些
     * dp(i) 对于人 i，一样有钱或比 i 更有钱的人里面最不安静的是谁？
     */

    const n = quiet.length;
    const result = new Array(n);
    
    const personToRichers = new Map();
    for (const [a, b] of richer)
    {
        const bRichers = (personToRichers.get(b) ?? []);
        bRichers.push(a);
        personToRichers.set(b, bRichers);
    }

    function dp(i)
    {
        if (result[i] !== undefined)
        {
            return result[i];
        }

        const iRichers = personToRichers.get(i) ?? [];
        if (iRichers.length === 0)
        {
            result[i] = i;
            return i;
        }
        else
        {
            result[i] = i;
            for (const iRicher of iRichers)
            {
                result[i] = quiet[result[i]] > quiet[dp(iRicher)]
                    ? dp(iRicher)
                    : result[i];
            }
            return result[i];
        }
    }

    for (let i = 0; i < n; i++)
    {
        dp(i);
    }

    return result;
};
// @lc code=end