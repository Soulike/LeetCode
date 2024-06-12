/*
 * @lc app=leetcode id=75 lang=cpp
 *
 * [75] Sort Colors
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  void sortColors(std::vector<int>& nums) {
    const int N = nums.size();
    int redZoneIndex = 0;
    int blueZoneIndex = N - 1;

    for (int i = 0; i < N; i++) {
      const COLOR color = static_cast<COLOR>(nums[i]);
      if (color == COLOR::RED && i >= redZoneIndex) {
        std::swap(nums[i], nums[redZoneIndex]);
        redZoneIndex++;
        i--;
      } else if (color == COLOR::BLUE && i <= blueZoneIndex) {
        std::swap(nums[i], nums[blueZoneIndex]);
        blueZoneIndex--;
        i--;
      }
    }
  }

 private:
  enum class COLOR : int {
    RED = 0,
    WHITE = 1,
    BLUE = 2,
  };
};
// @lc code=end

int main() {
  std::vector<int> nums = {2, 0, 2, 1, 1, 0};
  Solution sol;
  sol.sortColors(nums);
  nums;
}