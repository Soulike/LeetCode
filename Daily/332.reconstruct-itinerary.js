/*
 * @lc app=leetcode id=332 lang=javascript
 *
 * [332] Reconstruct Itinerary
 */

// @lc code=start
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
    /** @type {Map<string, string[]>} */
    const target = new Map();

    tickets.sort(([, to1], [, to2]) => (to1 < to2 ? -1 : 1));

    for (const [from, to] of tickets) {
        const tos = target.get(from) ?? [];
        tos.push(to);
        target.set(from, tos);
    }

    /** @type {string[]} */
    const route = [];

    visit('JFK');

    return route;

    /**
     * @param {string} from
     * @returns {void}
     */
    function visit(from) {
        const tos = target.get(from) ?? [];

        while (tos.length > 0) {
            const to = tos.shift();
            visit(to);
        }

        route.unshift(from);
    }
};
// @lc code=end

findItinerary([
    ['JFK', 'SFO'],
    ['JFK', 'ATL'],
    ['SFO', 'ATL'],
    ['ATL', 'JFK'],
    ['ATL', 'SFO'],
]);
