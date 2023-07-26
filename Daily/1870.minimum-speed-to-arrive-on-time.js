/*
 * @lc app=leetcode id=1870 lang=javascript
 *
 * [1870] Minimum Speed to Arrive on Time
 */

// @lc code=start
/**
 * @param {number[]} distances
 * @param {number} hour
 * @return {number}
 */
var minSpeedOnTime = function (distances, hour) {
    /** @type {number[]} */
    const timeOnSpeedMemo = [];
    /**
     * @param {number} speed
     * @returns {number}
     */
    const timeOnSpeed = (speed) => {
        let time = 0;
        if (timeOnSpeedMemo[speed] !== undefined) {
            return timeOnSpeedMemo[speed];
        }
        for (let i = 0; i < distances.length - 1; i++) {
            const distance = distances[i];
            time += Math.ceil(distance / speed);
        }

        time += distances[distances.length - 1] / speed;

        timeOnSpeedMemo[speed] = time;
        return time;
    };

    let leftSpeed = 1;
    let rightSpeed = 10 ** 7;

    while (leftSpeed <= rightSpeed) {
        let midSpeed = Math.floor((rightSpeed - leftSpeed) / 2) + leftSpeed;

        const time = timeOnSpeed(midSpeed);

        if (time > hour) {
            leftSpeed = midSpeed + 1;
        } else {
            if (timeOnSpeed(midSpeed - 1) > hour) {
                return midSpeed;
            } else {
                rightSpeed = midSpeed - 1;
            }
        }
    }

    return -1;
};

// @lc code=end
