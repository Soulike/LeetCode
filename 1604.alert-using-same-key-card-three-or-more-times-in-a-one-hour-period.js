/*
 * @lc app=leetcode id=1604 lang=javascript
 *
 * [1604] Alert Using Same Key-Card Three or More Times in a One Hour Period
 */

// @lc code=start
/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
const alertNames = function (keyName, keyTime)
{
    const LENGTH = keyName.length;
    const ONE_HOUR = 60;

    if (LENGTH < 3)
    {
        return [];
    }

    /**
     * @type {Map<string, number[]>}
     */
    const nameToTimes = new Map();
    /**
     * @type {Set<string>}
     */
    const result = new Set();
    for (let i = 0; i < LENGTH; i++)
    {
        const name = keyName[i];
        const times = nameToTimes.get(name) ?? [];
        let lastTime = processKeyTime(keyTime[i]);
        times.push(lastTime);
        nameToTimes.set(name, times);
    }

    for (const [name, times] of nameToTimes)
    {
        if (times.length >= 3)
        {
            times.sort((a, b) => a - b);
            for (let i = 2; i < times.length; i++)
            {
                if (times[i] - times[i - 2] <= ONE_HOUR)
                {
                    result.add(name);
                }
            }
        }
    }

    return Array.from(result.values()).sort();
};

/**
 * 
 * @param {string} keyTime 
 * @returns {number}
 */
function processKeyTime(keyTime)
{
    const [hour, minute] = keyTime.split(':');
    const hourNumber = Number.parseInt(hour);
    const minuteNumber = Number.parseInt(minute);
    return hourNumber * 60 + minuteNumber;
}

// @lc code=end