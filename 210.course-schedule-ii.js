/*
 * @lc app=leetcode id=210 lang=javascript
 *
 * [210] Course Schedule II
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
const findOrder = function (numCourses, prerequisites) 
{
    /**@type {Map<number, number>} */
    const inCounts = new Map();
    /**@type {Map<number, number[]>} */
    const courseToPrerequisites = new Map();
    for (let i = 0; i < numCourses; i++)
    {
        inCounts.set(i, 0);
        courseToPrerequisites.set(i, []);
    }
    for (const [i, j] of prerequisites)
    {
        inCounts.set(j,
            inCounts.get(j) + 1);
        courseToPrerequisites.get(i).push(j);
    }

    const result = [];
    while (inCounts.size !== 0)
    {
        const inCountsCopy = new Map(inCounts);
        let found = false;
        for (const [course, inCount] of inCountsCopy)
        {
            if (inCount === 0)
            {
                found = true;
                result.push(course);
                inCounts.delete(course);
                const prerequisiteCourses = courseToPrerequisites.get(course);
                for (const prerequisiteCourse of prerequisiteCourses)
                {
                    inCounts.set(prerequisiteCourse,
                        inCounts.get(prerequisiteCourse) - 1);
                }
                break;
            }
        }
        if (!found)
        {
            return [];
        }
    }
    return result.reverse();
};
// @lc code=end

console.log(findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]]));