/*
 * @lc app=leetcode id=2402 lang=javascript
 *
 * [2402] Meeting Rooms III
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} meetings
 * @return {number}
 */
var mostBooked = function (n, meetings) {
    const roomAvailableTime = new Array(n).fill(0);
    const roomMeetingsCount = new Array(n).fill(0);

    meetings.sort((a, b) => a[0] - b[0]);

    meetings.map((meeting) => {
        const [start, end] = meeting;

        let earliestRoomAvailableTime = Infinity;
        let earliestRoomAvailableIndex = 0;
        let hasRoomAvailable = false;

        for (let i = 0; i < n; i++) {
            if (roomAvailableTime[i] <= start) {
                roomAvailableTime[i] = end;
                roomMeetingsCount[i]++;
                hasRoomAvailable = true;
                break;
            }

            if (roomAvailableTime[i] < earliestRoomAvailableTime) {
                earliestRoomAvailableTime = roomAvailableTime[i];
                earliestRoomAvailableIndex = i;
            }
        }

        if (!hasRoomAvailable) {
            roomMeetingsCount[earliestRoomAvailableIndex]++;
            roomAvailableTime[earliestRoomAvailableIndex] += end - start;
        }
    });

    return roomMeetingsCount.indexOf(Math.max(...roomMeetingsCount));
};
// @lc code=end
