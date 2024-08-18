/*
 * @lc app=leetcode id=264 lang=cpp
 *
 * [264] Ugly Number II
 */
#include <cinttypes>
#include <queue>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int nthUglyNumber(int n) {
    std::unordered_set<std::int64_t> uglyNumberSet = {1};
    std::priority_queue<std::int64_t, std::vector<std::int64_t>, std::greater<>>
        uglyNumbersHeap;
    uglyNumbersHeap.push(1);

    for (int i = 2; i <= n; i++) {
      const std::int64_t currentUglyNumber = uglyNumbersHeap.top();
      uglyNumbersHeap.pop();
      std::vector<std::int64_t> newUglyNumbers;
      if (!uglyNumberSet.contains(currentUglyNumber * 2)) {
        newUglyNumbers.push_back(currentUglyNumber * 2);
      }
      if (!uglyNumberSet.contains(currentUglyNumber * 3)) {
        newUglyNumbers.push_back(currentUglyNumber * 3);
      }
      if (!uglyNumberSet.contains(currentUglyNumber * 5)) {
        newUglyNumbers.push_back(currentUglyNumber * 5);
      }

      uglyNumberSet.merge(std::unordered_set<std::int64_t>(
          newUglyNumbers.begin(), newUglyNumbers.end()));
      for (const auto newUglyNumber : newUglyNumbers) {
        uglyNumbersHeap.push(newUglyNumber);
      }
    }

    return static_cast<int>(uglyNumbersHeap.top());
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.nthUglyNumber(10);
}
