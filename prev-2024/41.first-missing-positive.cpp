/*
 * @lc app=leetcode id=41 lang=cpp
 *
 * [41] First Missing Positive
 */
#include <cmath>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int firstMissingPositive(vector<int>& nums) {
    int nextPositionIndex = 0;

    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] > 0) {
        nums[nextPositionIndex] = nums[i];
        nextPositionIndex++;
      }
    }

    const int validLength = nextPositionIndex;
    for (int i = 0; i < validLength; i++) {
      int index = std::abs(nums[i]) - 1;
      if (index < validLength && nums[index] > 0) {
        nums[index] = -nums[index];
      }
    }

    for (int i = 0; i < validLength; i++) {
      if (nums[i] > 0) {
        return i + 1;
      }
    }

    return validLength + 1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec({7, 8, 9, 11, 12});
  sol.firstMissingPositive(vec);
}