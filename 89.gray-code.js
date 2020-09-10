/*
 * @lc app=leetcode id=89 lang=javascript
 *
 * [89] Gray Code
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */
const grayCode = function (n)
{
    if (n === 0)
    {
        return [0];
    }
    const SIZE = 2 ** n;

    /**@type Set<number> */
    const result = new Set();
    /**@type number[] */
    let lastSeq = new Array(n);
    for (let i = 0; i < n; i++)
    {
        lastSeq[i] = 0;
    }
    result.add(seqToNum(lastSeq));
    let lastChangeIndex = -1;
    let currentNum = 0;
    while (result.size !== SIZE)
    {
        for (let i = 0; i < n; i++)
        {
            if (i !== lastChangeIndex)
            {
                lastSeq[i] = (lastSeq[i] + 1) % 2;
                currentNum = seqToNum(lastSeq);
                if (!result.has(currentNum))
                {
                    result.add(currentNum);
                    lastChangeIndex = i;
                    break;
                }
                else
                {
                    lastSeq[i] = (lastSeq[i] + 1) % 2;
                }
            }
        }    
    }
    return Array.from(result);
};

/**
 * @param {number[]} seq
 * @return {number}
 */
function seqToNum(seq)
{
    let sum = 0;
    const LEN = seq.length;
    for (let i = 0; i < LEN; i++)
    {
        if(seq[i] === 1)
        {
            sum += 2 ** i;
        }
    }
    return sum;
}
// @lc code=end

