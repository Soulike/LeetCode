/*
 * @lc app=leetcode id=1894 lang=cpp
 *
 * [1894] Find the Student that Will Replace the Chalk
 */
#include <numeric>
#include <vector>

// @lc code=start
class Solution {
 public:
  int chalkReplacer(std::vector<int>& chalk, int k) {
    const int kStudentNumber = chalk.size();

    int chalkSum = 0;
    for (int i = 0; i < kStudentNumber; i++) {
      chalkSum += chalk[i];
      if (chalkSum > k) {
        return i;
      }
    }

    k %= chalkSum;

    for (int i = 0; i < kStudentNumber; i++) {
      const int neededChalk = chalk[i];
      if (neededChalk > k) {
        return i;
      }
      k -= neededChalk;
    }

    return -1;
  }
};
// @lc code=end
