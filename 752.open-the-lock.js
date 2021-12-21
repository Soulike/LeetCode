/*
 * @lc app=leetcode id=752 lang=javascript
 *
 * [752] Open the Lock
 */

// @lc code=start
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
const openLock = function (deadends, target)
{
    if (target === '0000')
    {
        return 0;
    }

    const deadendSet = new Set(deadends);
    if (deadendSet.has('0000'))
    {
        return -1;
    }
    const visitedWheels = new Set();
    let visitingWheels = new Set(['0000']);
    let nextVisitingWheels = new Set();
    let stepCount = 0;
    while (visitingWheels.size > 0)
    {
        stepCount++;
        for (const visitingWheel of visitingWheels)
        {
            for (let i = 0; i < 8; i++)
            {
                let newWheel;
                if(i < 4)
                {
                    newWheel = forwardWheel(visitingWheel, i);
                }
                else
                {
                    newWheel = backwardWheel(visitingWheel, i-4);
                }

                if (deadendSet.has(newWheel))
                {
                    continue;
                }
                else if (newWheel === target)
                {
                    return stepCount;
                }
                else if (!visitedWheels.has(newWheel) && !visitingWheels.has(newWheel))
                {
                    nextVisitingWheels.add(newWheel);
                } 
            }
        }
        for (const wheel of visitingWheels)
        {
            visitedWheels.add(wheel);
        }
        visitingWheels = nextVisitingWheels;
        nextVisitingWheels = new Set();
    }
    return -1;
};

function forwardWheel(wheels, index)
{
    const wheelVals = wheels.split('');
    const changedWheelVal = Number.parseInt(wheelVals[index]);
    wheelVals[index] = ((changedWheelVal + 10 + 1) % 10).toString(10);
    return wheelVals.join('');
}

function backwardWheel(wheels, index)
{
    const wheelVals = wheels.split('');
    const changedWheelVal = Number.parseInt(wheelVals[index]);
    wheelVals[index] = ((changedWheelVal + 10 - 1) % 10).toString(10);
    return wheelVals.join('');
}
// @lc code=end

console.log(openLock(["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"],'8888'));