/*
 * @lc app=leetcode id=207 lang=javascript
 *
 * [207] Course Schedule
 */

// @lc code=start

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const canFinish = function (numCourses, prerequisites)
{
    const prerequisitesMap = new Map();
    for (let i = 0; i < numCourses;i++)
    {
        prerequisitesMap.set(i, new Set());
    }

    for (const [from, to] of prerequisites)
    {
        prerequisitesMap.get(from).add(to);
    }

    while (prerequisitesMap.size > 0)
    {
        const removedCourses = new Set();
        for (const [from, tos] of prerequisitesMap)
        {
            if (tos.size === 0)
            {
                removedCourses.add(from);
            }
        }

        if (removedCourses.size === 0)
        {
            return false;
        }
        else
        {
            for (const course of removedCourses)
            {
                prerequisitesMap.delete(course);
            }

            for (const [_, tos] of prerequisitesMap)
            {
                for (const course of removedCourses)
                {
                    if (tos.has(course))
                    {
                        tos.delete(course);
                    }
                }
            }
        }
    }

    return true;
};
// @lc code=end