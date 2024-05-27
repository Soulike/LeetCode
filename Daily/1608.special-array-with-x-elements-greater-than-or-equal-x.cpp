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
    std::sort(nums.begin(), nums.end(), std::greater<int>());
    int x = 0;  // how many nums are >= x
    while (x < nums.size() && nums[x] > x) {
      x++;
    }
    // x == nums[x] : we got x + 1 nums >= x
    return (x < nums.size() && x == nums[x]) ? -1 : x;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {0, 0};
  sol.specialArray(vec);
}