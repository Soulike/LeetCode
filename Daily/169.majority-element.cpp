/*
 * @lc app=leetcode id=169 lang=cpp
 *
 * [169] Majority Element
 */

#include <vector>
using std::vector;
// @lc code=start
class Solution
{
public:
    int majorityElement(vector<int> &nums)
    {
        int majorNum = nums[0];
        int majorCount = 1;
        for (int i = 1; i < nums.size(); i++)
        {
            if (majorCount == 0)
            {
                majorCount++;
                majorNum = nums[i];
            }
            else if (nums[i] == majorNum)
            {
                majorCount++;
            }
            else
            {
                majorCount--;
            }
        }

        return majorNum;
    }
};
// @lc code=end
