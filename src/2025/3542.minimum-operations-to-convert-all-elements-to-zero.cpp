/*
 * @lc app=leetcode id=3542 lang=cpp
 *
 * [3542] Minimum Operations to Convert All Elements to Zero
 */

#include <stack>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minOperations(std::vector<int>& nums) {
    int operation_count = 0;
    std::stack<int> increasing_stack;
    for (int i = 0; i < nums.size(); i++) {
      while (!increasing_stack.empty() && increasing_stack.top() > nums[i]) {
        increasing_stack.pop();
      }
      if (increasing_stack.empty() || increasing_stack.top() < nums[i]) {
        operation_count += nums[i] > 0;
        increasing_stack.push(nums[i]);
      }
    }

    return operation_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {1, 2, 1, 2, 1, 2};
  sol.minOperations(nums);
}
