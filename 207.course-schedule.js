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
    const graph = new Array(numCourses);
    for (let i = 0; i < numCourses; i++)
    {
        graph[i] = new Array(numCourses);
        graph[i].fill(false);
    }
    const courseToInValue = new Map();
    for (let i = 0; i < numCourses; i++)
    {
        courseToInValue.set(i, 0);
    }
    for (const [i, j] of prerequisites)
    {
        courseToInValue.set(j,
            courseToInValue.get(j) + 1
        );
        graph[i][j] = true;
    }

    while (true)
    {
        if (courseToInValue.size === 0)
        {
            return true;
        }

        const courseToInValueCopy = new Map(courseToInValue);

        let zeroInCourse = -1;
        for (const [i, j] of courseToInValueCopy)
        {
            if (j === 0)
            {
                zeroInCourse = i;
                courseToInValue.delete(i);
                break;
            }
        }
        if (zeroInCourse === -1)
        {
            return false;
        }
        for (let j = 0; j < numCourses; j++)
        {
            if (graph[zeroInCourse][j])
            {
                courseToInValue.set(j, courseToInValue.get(j) - 1);
            }
        }
    }
};
// @lc code=end