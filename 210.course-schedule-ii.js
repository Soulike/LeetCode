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
    /** @type {Map<number, number>} */
    const courseToInDegree = new Map();

    /** @type {Map<number, Set<number>>} */
    const courseToDependents = new Map();

    for (const [course, prerequisite] of prerequisites)
    {
        courseToInDegree.set(course,
            (courseToInDegree.get(course) ?? 0) + 1);
        
        const courseDependents = courseToDependents.get(prerequisite);
        if (courseDependents === undefined)
        {
            courseToDependents.set(prerequisite, new Set([course]));
        }
        else
        {
            courseDependents.add(course);
        }
    }

    const result = new Set();
    let found = true;

    while (found)
    {
        found = false;
        for (let i = 0; i < numCourses; i++)
        {
            if (!result.has(i) && (courseToInDegree.get(i) ?? 0) === 0)  // 入度是 0
            {
                found = true;
                const dependents = courseToDependents.get(i) ?? new Set();
                for (const dependent of dependents)
                {
                    courseToInDegree.set(dependent,
                        courseToInDegree.get(dependent) - 1);
                }
                result.add(i);
            }
        }
    }

    if(result.size === numCourses)
    {
        return Array.from(result);
    }
    else
    {
        return [];
    }
};
// @lc code=end