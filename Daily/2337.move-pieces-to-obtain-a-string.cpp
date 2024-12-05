/*
 * @lc app=leetcode id=2337 lang=cpp
 *
 * [2337] Move Pieces to Obtain a String
 */
#include <string>

// @lc code=start
class Solution {
 public:
  bool canChange(const std::string& start, const std::string& target) {
    constexpr char kBlank = '_';
    constexpr char kLeft = 'L';
    constexpr char kRight = 'R';

    int startIndex = 0;

    for (int i = 0; i < target.size(); i++) {
      if (target[i] == kBlank) {
        continue;
      }

      if (target[i] == kLeft) {
        // Find if `start` has `___...___L`, and the `L' can be moved left to
        // position `i`
        while (start[startIndex] == kBlank) {
          startIndex++;
          if (startIndex == start.size()) {
            return false;
          }
        }

        if (start[startIndex] != kLeft ||
            // The `L` is at the left of `i`. Impossible to move it to `i`.
            startIndex < i) {
          return false;
        }
        startIndex++;
      } else if (target[i] == kRight) {
        // Find if `start` has `___...___r___...___`,  and the `R' can be moved
        // right to position `i`
        while (start[startIndex] == kBlank) {
          startIndex++;
          if (startIndex == start.size()) {
            return false;
          }
        }
        if (start[startIndex] != kRight ||
            // The `R` is at the right of `i`. Impossible to move it to `i`.
            startIndex > i) {
          return false;
        }
        startIndex++;
      }
    }

    // We should have used all `L`s and `R`s.
    while (startIndex < start.size() && start[startIndex] == kBlank) {
      startIndex++;
    }
    return startIndex == start.size();
  }
};

// @lc code=end

int main() {
  Solution sol;
  sol.canChange("_L__R__R_", "L______RR");
}
