/*
 * @lc app=leetcode id=2342 lang=cpp
 *
 * [2342] Max Sum of a Pair With Equal Sum of Digits
 */

#include <queue>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumSum(const std::vector<int>& nums) {
    std::unordered_map<int, std::priority_queue<int>> digitSumToNumsPqs;

    for (const int num : nums) {
      const int numDigitSum = getDigitSum(num);
      digitSumToNumsPqs[numDigitSum].push(num);
    }

    int maximum2NumDigitSum = -1;
    for (const auto& digitSumToNumPq : digitSumToNumsPqs) {
      const int digitSum = digitSumToNumPq.first;
      std::priority_queue<int> numPq = digitSumToNumPq.second;
      if (numPq.size() < 2) {
        continue;
      }
      const int firstLargestNum = numPq.top();
      numPq.pop();
      const int secondLargestNum = numPq.top();
      maximum2NumDigitSum =
          std::max(maximum2NumDigitSum, firstLargestNum + secondLargestNum);
    }

    return maximum2NumDigitSum;
  }

 private:
  static int getDigitSum(int num) {
    int digitSum = 0;
    while (num > 0) {
      digitSum += num % 10;
      num /= 10;
    }

    return digitSum;
  }
};
// @lc code=end
