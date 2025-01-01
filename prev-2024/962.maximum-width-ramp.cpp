/*
 * @lc app=leetcode id=962 lang=cpp
 *
 * [962] Maximum Width Ramp
 */
#include <stack>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxWidthRamp(std::vector<int>& nums) {
    std::stack<int> decreasingIndexStack;
    int maxWidth = 0;

    for (int i = 0; i < nums.size(); i++) {
      if (decreasingIndexStack.empty() ||
          nums[decreasingIndexStack.top()] > nums[i]) {
        decreasingIndexStack.push(i);
      }
    }

    for (int j = nums.size() - 1; j >= 0; j--) {
      while (!decreasingIndexStack.empty() &&
             nums[decreasingIndexStack.top()] <= nums[j]) {
        maxWidth = std::max(maxWidth, j - decreasingIndexStack.top());
        decreasingIndexStack.pop();
      }
    }

    return maxWidth;
  }
};
// @lc code=end
