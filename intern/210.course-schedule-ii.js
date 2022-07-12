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
const findOrder = function (numCourses, prerequisites) {
    const prerequisitesMap = new Map();
    for (let i = 0; i < numCourses; i++) {
        prerequisitesMap.set(i, new Set());
    }

    for (const [from, to] of prerequisites) {
        prerequisitesMap.get(from).add(to);
    }

    const order = [];

    while (prerequisitesMap.size > 0) {
        const removedCourses = new Set();
        for (const [from, tos] of prerequisitesMap) {
            if (tos.size === 0) {
                removedCourses.add(from);
            }
        }

        if (removedCourses.size === 0) {
            return [];
        } else {
            for (const course of removedCourses) {
                prerequisitesMap.delete(course);
                order.push(course);
            }

            for (const [_, tos] of prerequisitesMap) {
                for (const course of removedCourses) {
                    if (tos.has(course)) {
                        tos.delete(course);
                    }
                }
            }
        }
    }

    return order;
};
// @lc code=end
