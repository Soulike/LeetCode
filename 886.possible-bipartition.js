/*
 * @lc app=leetcode id=886 lang=javascript
 *
 * [886] Possible Bipartition
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} dislikes
 * @return {boolean}
 */
var possibleBipartition = function (n, dislikes)
{
    const personToDislikes = new Map();
    for (let person = 1; person <= n; person++)
    {
        personToDislikes.set(person, []);
    }

    for (const [person, personDislikes] of dislikes)
    {
        personToDislikes.get(person).push(personDislikes);
    }

    // 当前子图的涂色情况
    const personToColor = new Map();
    const visitedPersons = new Set();

    function traverse(person, expectedColor)
    {
        visitedPersons.add(person);
        const personCurrentColor = personToColor.get(person);
        if (personCurrentColor === undefined)
        {
            personToColor.set(person, expectedColor);

            const dislikePersons = personToDislikes.get(person);
            for (const person of dislikePersons)
            {
                if (!traverse(person, !expectedColor))
                {
                    return false;
                }
            }
            return true;
        }
        else
        {
            return personCurrentColor === expectedColor;
        }
    }

    for (let person = 1; person <= n; person++)
    {
        if (!visitedPersons.has(person))
        {
            // 新子图，重新开始涂色
            personToColor.clear();
            if (!traverse(person, false))
            {
                return false;
            }
        }
    }
    return true;
};
// @lc code=end