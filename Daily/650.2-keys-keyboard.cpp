/*
 * @lc app=leetcode id=650 lang=cpp
 *
 * [650] 2 Keys Keyboard
 */

#include <algorithm>
#include <array>

// @lc code=start
class Solution {
 public:
  int minSteps(int n) {
    if (n == 1) {
      return 0;
    }
    int result = minStepsHelper(1, 0, n);
    return result;
  }

 private:
  int minStepsHelper(int currentLength, int pasteLength, int target) {
    if (currentLength == target) {
      return 0;
    }
    if (currentLength + pasteLength > target) {
      return MAX;
    }

    if (memo[currentLength][pasteLength] != 0) {
      return memo[currentLength][pasteLength];
    }

    // Option 1: Copy all and paste
    int stepsOfCopyAllAndPaste =
        2 + minStepsHelper(currentLength * 2, currentLength, target);
    // Option 2: Only paste
    int stepsOfOnlyPaste = pasteLength > 0
                               ? 1 + minStepsHelper(currentLength + pasteLength,
                                                    pasteLength, target)
                               : MAX;

    const int result = std::min(stepsOfCopyAllAndPaste, stepsOfOnlyPaste);
    memo[currentLength][pasteLength] = result;
    return result;
  }

 private:
  inline static int MAX = 1000;
  std::array<std::array<int, 1000>, 1000> memo{0};
};
// @lc code=end
