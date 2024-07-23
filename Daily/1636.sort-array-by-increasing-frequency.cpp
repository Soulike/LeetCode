/*
 * @lc app=leetcode id=1636 lang=cpp
 *
 * [1636] Sort Array by Increasing Frequency
 */
#include <algorithm>
#include <unordered_map>
#include <utility>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> frequencySort(std::vector<int>& nums) {
    std::unordered_map<int, int> numToFreqs;
    for (const auto num : nums) {
      numToFreqs[num]++;
    }

    std::vector<std::pair<int, int>> numToFreqPairs(numToFreqs.size());
    for (auto& numToFreq : numToFreqs) {
      numToFreqPairs.emplace_back(numToFreq);
    }
    numToFreqs.clear();

    std::sort(numToFreqPairs.begin(), numToFreqPairs.end(),
              [](const auto& pair1, const auto& pair2) {
                if (pair1.second != pair2.second) {
                  return pair1.second < pair2.second;
                }
                return pair1.first > pair2.first;
              });

    int numsIndex = 0;

    for (const auto& numToFreq : numToFreqPairs) {
      const int num = numToFreq.first;
      const int freq = numToFreq.second;
      std::fill_n(nums.begin() + numsIndex, freq, num);
      numsIndex += freq;
    }

    return nums;
  }
};
// @lc code=end
