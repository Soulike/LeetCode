/*
 * @lc app=leetcode id=624 lang=cpp
 *
 * [624] Maximum Distance in Arrays
 */
#include <algorithm>
#include <climits>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxDistance(std::vector<std::vector<int>>& arrays) {
    // Minimum number seen before
    int minNumber = arrays.front().front();
    // Maximum number seen before
    int maxNumber = arrays.front().back();
    int currentMaxDistance = INT_MIN;

    for (int i = 1; i < arrays.size(); i++) {
      const auto& arr = arrays[i];
      const int minNumberInArr = arr.front();
      const int maxNumberInArr = arr.back();

      // Ensure the distance is calculated on values from
      // different arrays
      currentMaxDistance = std::max({
          std::abs(maxNumber - minNumberInArr),
          std::abs(maxNumberInArr - minNumber),
          currentMaxDistance,
      });

      minNumber = std::min(minNumber, minNumberInArr);
      maxNumber = std::max(maxNumber, maxNumberInArr);
    }

    return currentMaxDistance;
  }
};
// @lc code=end
