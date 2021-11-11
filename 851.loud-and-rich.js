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
    const PERSON_AMOUNT = quiet.length;
    /** @type {boolean[][]} */
    const reachableGraph = new Array(PERSON_AMOUNT);
    for (let i = 0; i < PERSON_AMOUNT; i++)
    {
        reachableGraph[i] = new Array(PERSON_AMOUNT);
        reachableGraph[i].fill(false);
        reachableGraph[i][i] = true;
    }

    for (const [a, b] of richer)
    {
        reachableGraph[b][a] = true;
    }

    let hasNewEdge = true;
    while (hasNewEdge)
    {
        hasNewEdge = false;
        for (let i = 0; i < PERSON_AMOUNT; i++)
        {
            for (let j = 0; j < PERSON_AMOUNT; j++)
            {
                if (reachableGraph[i][j])
                {
                    for (let k = 0; k < PERSON_AMOUNT; k++)
                    {
                        if (reachableGraph[j][k] && !reachableGraph[i][k])
                        {
                            hasNewEdge = true;
                            reachableGraph[i][k] = true;
                        }
                    }
                }
            }
        }
    }

    const result = new Array(PERSON_AMOUNT);
    for (let i = 0; i < PERSON_AMOUNT; i++)
    {
        let minQuiet = Number.POSITIVE_INFINITY;
        for (let j = 0; j < PERSON_AMOUNT; j++)
        {
            if (reachableGraph[i][j] && quiet[j] < minQuiet)
            {
                result[i] = j;
                minQuiet = quiet[j];
            }
        }
    }
    return result;
};
// @lc code=end