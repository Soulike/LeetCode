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
    const graph = new Array(PERSON_AMOUNT);
    for (let i = 0; i < PERSON_AMOUNT; i++)
    {
        graph[i] = new Array(PERSON_AMOUNT);
        graph[i].fill(false);
        graph[i][i] = true;
    }

    for (const [a, b] of richer)
    {
        graph[b][a] = true;
    }

    let hasNewEdge = true;
    while (hasNewEdge)
    {
        hasNewEdge = false;
        for (let i = 0; i < PERSON_AMOUNT; i++)
        {
            for (let j = 0; j < PERSON_AMOUNT; j++)
            {
                if (graph[i][j])
                {
                    for (let k = 0; k < PERSON_AMOUNT; k++)
                    {
                        if (graph[j][k] && !graph[i][k])
                        {
                            hasNewEdge = true;
                            graph[i][k] = true;
                        }
                    }
                }
            }
        }
    }

    const personSortedByQuiet = quiet
        .map((quietValue, person) => [person, quietValue])
        .sort(([, quietValue1], [, quietValue2]) => quietValue1 - quietValue2)
        .map(([person,]) => person);

    const result = new Array(PERSON_AMOUNT);
    for (let i = 0; i < PERSON_AMOUNT; i++)
    {
        for (let j = 0; j < PERSON_AMOUNT; j++)
        {
            let quietPerson = personSortedByQuiet[j];
            if (graph[i][quietPerson])
            {
                result[i] = quietPerson;
                break;
            }
        }
    }
    return result;
};
// @lc code=end