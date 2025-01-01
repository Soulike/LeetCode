/*
 * @lc app=leetcode id=3011 lang=cpp
 *
 * [3011] Find if Array Can Be Sorted
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  bool canSortArray(std::vector<int>& nums) {
    // Split `nums` into segments.
    // In a segment, all numbers have the same bit set number.
    // Within a segment, all numbers can move freely.

    // To sort the array, from left to right,
    // the maximum number in previous segment
    // must smaller than the minimum number in latter segment.

    int currentSegmentBitSetNumber = -1;
    int currentSegmentMaxNumber = -1;
    int prevSegmentMaxNumber = -1;

    for (const int num : nums) {
      const int setBitNumber = getSetBitCountOfNumber(num);
      if (setBitNumber != currentSegmentBitSetNumber) {
        // new segment
        prevSegmentMaxNumber = currentSegmentMaxNumber;
        currentSegmentMaxNumber = num;
        currentSegmentBitSetNumber = setBitNumber;
      } else {
        currentSegmentMaxNumber = std::max(currentSegmentMaxNumber, num);
      }

      if (prevSegmentMaxNumber > num) {
        return false;
      }
    }

    return true;
  }

 private:
  static int getSetBitCountOfNumber(int num) {
    int setBitNumber = 0;
    while (num > 0) {
      setBitNumber += (num & 0b1);
      num >>= 1;
    }
    return setBitNumber;
  }
};
// @lc code=end
