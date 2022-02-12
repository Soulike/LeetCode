/*
 * @lc app=leetcode id=875 lang=javascript
 *
 * [875] Koko Eating Bananas
 */

// @lc code=start
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h)
{
    const eatTimeCache = new Map();
    /**
     * 以 speed 的速度吃，最快需要多少时间吃完
     */
    function getEatTime(speed)
    {
        if (eatTimeCache.has(speed))
        {
            return eatTimeCache.get(speed);
        }
        let hour = 0;
        for (const pile of piles)
        {
            hour += Math.ceil(pile / speed);
        }
        eatTimeCache.set(speed, hour);
        return hour;
    }

    let minSpeed = 1;
    let maxSpeed = Math.max(...piles);

    while (true)
    {
        const midSpeed = Math.floor((minSpeed + maxSpeed) / 2);
        const midEatTime = getEatTime(midSpeed);
        if (midEatTime <= h)
        {
            if (getEatTime(midSpeed - 1) > h)
            {
                return midSpeed;
            }
            else
            {
                maxSpeed = midSpeed - 1;
            }
        }
        else
        {
            minSpeed = midSpeed + 1;
        }
    }
};
// @lc code=end

console.log(minEatingSpeed([30, 11, 23, 4, 20], 6))