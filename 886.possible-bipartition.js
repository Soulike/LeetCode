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
    const peopleSet1 = new Set();
    const peopleSet2 = new Set();
    // 进行过 BFS 的人
    const visitedPeopleSet = new Set();

    // 偶数加入 1，奇数加入 2
    let setTurn = 1;

    // current 和 last 中的人必须在不同集合中
    let lastPeople = new Set();
    let currentPeople = new Set();

    for (let i = 1; i <= n; i++)
    {
        if (visitedPeopleSet.has(i))
        {
            continue;
        }

        peopleSet1.clear();
        peopleSet2.clear();
        lastPeople.clear();
        currentPeople.clear();

        lastPeople.add(i);

        peopleSet1.add(i);
        visitedPeopleSet.add(i);

        while (lastPeople.size > 0)
        {
            // BFS
            for (const person of lastPeople)
            {
                visitedPeopleSet.add(person);

                const personDislikes = personToDislikes.get(person);
                
                for (const dislike of personDislikes)
                {
                    currentPeople.add(dislike);
                }
            }

            const [currentPeopleSet, addedPeopleSet] =
                setTurn % 2
                    ? [peopleSet1, peopleSet2]
                    : [peopleSet2, peopleSet1];

            for (const person of currentPeople)
            {
                // 出现在同一个集合中
                if (currentPeopleSet.has(person))
                {
                    return false;
                }
                addedPeopleSet.add(person);
            }

            lastPeople = currentPeople;
            currentPeople = new Set();
            setTurn++;
        }
    }

    return true;
};
// @lc code=end