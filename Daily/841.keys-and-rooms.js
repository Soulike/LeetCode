/*
 * @lc app=leetcode id=841 lang=javascript
 *
 * [841] Keys and Rooms
 */

// @lc code=start
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
    /** @type {Set<number>} */
    const visited = new Set();

    /**
     * @param {number} room
     * @returns {void}
     */
    const visit = (room) => {
        const roomKeys = rooms[room];
        for (const roomKey of roomKeys) {
            if (!visited.has(roomKey)) {
                visited.add(roomKey);
                visit(roomKey);
            }
        }
    };

    visited.add(0);
    visit(0);

    return visited.size === rooms.length;
};
// @lc code=end
