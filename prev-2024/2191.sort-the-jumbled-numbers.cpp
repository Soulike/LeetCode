/*
 * @lc app=leetcode id=2191 lang=cpp
 *
 * [2191] Sort the Jumbled Numbers
 */
#include <algorithm>
#include <cmath>
#include <utility>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> sortJumbled(std::vector<int>& mapping,
                               std::vector<int>& nums) {
    std::vector<std::pair<int, int>> mappedNums;

    for (int i = 0; i < nums.size(); i++) {
      mappedNums.emplace_back(i, this->getMappedNum(nums[i], mapping));
    }

    std::sort(mappedNums.begin(), mappedNums.end(),
              [](const auto& pair1, const auto& pair2) {
                if (pair1.second == pair2.second) {
                  return pair1.first < pair2.first;
                }
                return pair1.second < pair2.second;
              });

    std::vector<int> result;
    for (const auto& pair : mappedNums) {
      result.push_back(nums[pair.first]);
    }
    return result;
  }

 private:
  int getMappedNum(int num, const std::vector<int>& mapping) {
    if (num == 0) {
      return mapping[0];
    }
    int currentTenPow = 1;
    int result = 0;
    while (num > 0) {
      int lastNum = num % 10;
      num /= 10;

      int mappedLastNum = mapping[lastNum];
      result += mappedLastNum * currentTenPow;

      currentTenPow *= 10;
    }

    return result;
  }
};
// @lc code=end

int main() {
  std::vector<int> mapping = {9, 8, 7, 6, 5, 4, 3, 2, 1, 0};
  std::vector<int> nums = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

  Solution sol;
  sol.sortJumbled(mapping, nums);
}
