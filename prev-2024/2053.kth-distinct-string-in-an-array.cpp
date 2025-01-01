/*
 * @lc app=leetcode id=2053 lang=cpp
 *
 * [2053] Kth Distinct String in an Array
 */
#include <string>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string kthDistinct(std::vector<std::string>& arr, int k) {
    std::unordered_map<std::string, int> strToFreqs;
    for (const auto& s : arr) {
      strToFreqs[s]++;
    }

    int distinctNo = 0;

    for (const auto& s : arr) {
      if (strToFreqs[s] == 1) {
        distinctNo++;
        if (distinctNo == k) {
          return s;
        }
      }
    }

    return "";
  }
};
// @lc code=end
