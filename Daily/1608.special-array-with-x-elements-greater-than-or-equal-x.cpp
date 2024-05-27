/*
 * @lc app=leetcode id=1608 lang=cpp
 *
 * [1608] Special Array With X Elements Greater Than or Equal X
 */

#include <algorithm>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int specialArray(vector<int>& nums) {
    std::sort(nums.begin(), nums.end(), [](int a, int b) { return a > b; });

    if (nums.back() >= nums.size()) {
      return nums.size();
    }

    for (int x = 0; x <= nums.size(); x++) {
      int count = nums.size();
      for (int i = 0; i < nums.size(); i++) {
        if (nums[i] < x) {
          count = i;
          break;
        }
      }

      if (count == x) {
        return x;
      }
    }

    return -1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {1, 0, 0, 6, 4, 9};
  sol.specialArray(vec);
}