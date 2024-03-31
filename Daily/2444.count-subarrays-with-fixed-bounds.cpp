/*
 * @lc app=leetcode id=2444 lang=cpp
 *
 * [2444] Count Subarrays With Fixed Bounds
 */
#include <cmath>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  long long countSubarrays(vector<int>& nums, int minK, int maxK) {
    long long result = 0;
    int currentStart = 0;
    int currentMinIndex = -1;
    int currentMaxIndex = -1;

    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] < minK || nums[i] > maxK) {
        // Gap. Start over.
        currentStart = i + 1;
        currentMinIndex = -1;
        currentMaxIndex = -1;
      } else {
        if (nums[i] == minK) {
          currentMinIndex = i;
        }
        if (nums[i] == maxK) {
          currentMaxIndex = i;
        }
      }

      if (currentMinIndex != -1 && currentMaxIndex != -1) {
        result += std::min(currentMinIndex, currentMaxIndex) - currentStart + 1;
      }
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {1, 1, 1, 1};
  sol.countSubarrays(vec, 1, 1);
}