/*
 * @lc app=leetcode id=1460 lang=cpp
 *
 * [1460] Make Two Arrays Equal by Reversing Subarrays
 */
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool canBeEqual(const std::vector<int>& target, const std::vector<int>& arr) {
    std::unordered_map<int, int> numToCounts;

    for (const auto num : arr) {
      numToCounts[num]++;
    }

    for (const auto num : target) {
      if (!numToCounts.contains(num)) {
        return false;
      }
      numToCounts[num]--;
      if (numToCounts[num] == 0) {
        numToCounts.erase(num);
      }
    }

    return numToCounts.size() == 0;
  }
};
// @lc code=end
