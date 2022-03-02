/*
 * @lc app=leetcode id=216 lang=javascript
 *
 * [216] Combination Sum III
 */

// @lc code=start
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function (k, n)
{
    /**
     * results
     * current
     * 
     * func backtrack(startNum, target)
     *      if(current.length === k){
     *          if(target === 0) {
     *              results.push([...current]);
     *          }
     *          else{
     *              return;
     *          }
     *      }
     *      else {
     *          if(target <= 0) return;
     *          else {
     *              for i from startNum to 9 {
     *                 current.push(i)
     *               backtrack(i+1, target-i)
     *                current.pop()
     *              }
     *          }
     */

    if (n > 45)
    {
        return [];
    }

    if (0.5 * (k * (1 + k)) > n)
    {
        return [];
    }

    const results = [];
    const current = [];

    function backtrack(startNum, target)
    {
        if (current.length === k)
        {
            if (target === 0)
            {
                results.push([...current]);
            }
            else
            {
                return;
            }
        }
        else
        {
            if (target <= 0)
            {
                return;
            }
            else
            {
                for (let i = startNum; i <= 9; i++)
                {
                    current.push(i);
                    backtrack(i + 1, target - i);
                    current.pop();
                }
            }
        }
    }

    backtrack(1, n);

    return results;
};
// @lc code=end