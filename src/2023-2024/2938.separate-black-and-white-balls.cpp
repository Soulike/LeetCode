/*
 * @lc app=leetcode id=2938 lang=cpp
 *
 * [2938] Separate Black and White Balls
 */
#include <algorithm>
#include <string>

// @lc code=start
class Solution {
 public:
  long long minimumSteps(std::string s) {
    long long steps = 0;
    long long oneCount = 0;

    // Here, we iterate over `s` and create a range begin with index 0.
    // Inside the range, '0's are grouped at left,
    // so are '1's, which are at right.
    //
    // When we iterate from left to right,
    // every time we see an '1', it is already grouped at right.
    // If we see a '0', we need to move it across
    // all '1's grouped so far,
    // so we need to know how many '1's we have encountered,
    // and add it to `steps`.
    for (const auto& c : s) {
      if (c == '1') {
        oneCount++;
      } else {
        steps += oneCount;
      }
    }

    return steps;
  }
};
// @lc code=end
