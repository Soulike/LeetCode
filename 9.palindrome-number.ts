/*
 * @lc app=leetcode id=9 lang=typescript
 *
 * [9] Palindrome Number
 */

// @lc code=start
function isPalindrome(x: number): boolean 
{
    if (x < 0)
    {
        return false;
    }
    else if (x < 10)    // x >= 0
    {
        return true;
    }
    // x >= 10
    const array = numberToArray(x);
    const len = array.length;
    for (let i = 0; i < len / 2; i++)
    {
        if (array[i] !== array[len - i - 1])
        {
            return false;
        }
    }
    return true;
};

function numberToArray(x: number): number[]
{
    const queue: number[] = [];
    let xCopy = x;
    let lastNumber = 0;
    while (xCopy !== 0)
    {
        lastNumber = xCopy % 10;
        xCopy = (xCopy - lastNumber) / 10;
        queue.push(lastNumber);
    }
    return queue;
}
// @lc code=end

