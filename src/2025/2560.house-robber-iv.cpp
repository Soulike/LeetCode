/*
 * @lc app=leetcode id=2560 lang=cpp
 *
 * [2560] House Robber IV
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int minCapability(const std::vector<int>& nums, const int k) {
    int leftDollars = *std::min_element(nums.cbegin(), nums.cend());
    int rightDollars = *std::max_element(nums.cbegin(), nums.cend()) + 1;

    while (leftDollars < rightDollars) {
      const int midDollars = (rightDollars - leftDollars) / 2 + leftDollars;
      if (canRobMoreThanKHouses(nums, k, midDollars)) {
        rightDollars = midDollars;

      } else {
        leftDollars = midDollars + 1;
      }
    }

    return leftDollars;
  }

 private:
  static bool canRobMoreThanKHouses(const std::vector<int>& nums,
                                    const int k,
                                    const int robbedDollarsPerHouse) {
    int robbedHouses = 0;
    for (int i = 0; i < nums.size(); i++) {
      if (nums[i] <= robbedDollarsPerHouse) {
        robbedHouses++;
        i++;
      }
    }

    return robbedHouses >= k;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minCapability({2, 3, 5, 9}, 2);
}
