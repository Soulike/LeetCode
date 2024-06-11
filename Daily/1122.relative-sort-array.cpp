/*
 * @lc app=leetcode id=1122 lang=cpp
 *
 * [1122] Relative Sort Array
 */

#include <map>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> relativeSortArray(std::vector<int>& arr1,
                                     std::vector<int>& arr2) {
    std::map<int, int> arr1NumToFreqs;
    for (const auto num : arr1) {
      arr1NumToFreqs[num]++;
    }

    int arr1Index = 0;
    for (const auto num : arr2) {
      const int numFreq = arr1NumToFreqs[num];
      std::fill_n(arr1.begin() + arr1Index, numFreq, num);
      arr1Index += numFreq;
      arr1NumToFreqs.erase(num);
    }

    for (const auto& numToFreq : arr1NumToFreqs) {
      const int num = numToFreq.first;
      const int numFreq = numToFreq.second;
      std::fill_n(arr1.begin() + arr1Index, numFreq, num);
      arr1Index += numFreq;
    }

    return arr1;
  }
};
// @lc code=end
