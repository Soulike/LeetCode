/*
 * @lc app=leetcode id=264 lang=cpp
 *
 * [264] Ugly Number II
 */
#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int nthUglyNumber(int n) {
    std::vector<int> uglyNumbers(n);
    uglyNumbers[0] = 1;
    int next2MultipleIndex = 0;
    int next2MultipleNumber = 2;
    int next3MultipleIndex = 0;
    int next3MultipleNumber = 3;
    int next5MultipleIndex = 0;
    int next5MultipleNumber = 5;

    for (int i = 2; i <= n; i++) {
      const int nextUglyNumber = std::min(
          {next2MultipleNumber, next3MultipleNumber, next5MultipleNumber});
      uglyNumbers[i - 1] = nextUglyNumber;
      if (nextUglyNumber == next2MultipleNumber) {
        next2MultipleIndex++;
        next2MultipleNumber = uglyNumbers[next2MultipleIndex] * 2;
      }
      if (nextUglyNumber == next3MultipleNumber) {
        next3MultipleIndex++;
        next3MultipleNumber = uglyNumbers[next3MultipleIndex] * 3;
      }
      if (nextUglyNumber == next5MultipleNumber) {
        next5MultipleIndex++;
        next5MultipleNumber = uglyNumbers[next5MultipleIndex] * 5;
      }
    }

    return uglyNumbers.back();
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.nthUglyNumber(10);
  sol.nthUglyNumber(11);
}
