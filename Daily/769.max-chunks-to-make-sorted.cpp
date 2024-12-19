/*
 * @lc app=leetcode id=769 lang=cpp
 *
 * [769] Max Chunks To Make Sorted
 */

#include <algorithm>
#include <vector>

// @lc code=start

class Solution {
 public:
  int maxChunksToSorted(const std::vector<int>& arr) {
    std::vector<Range> ranges;
    for (int i = 0; i < arr.size(); i++) {
      const int expectedIndex = arr[i];
      const int rangeBegin = std::min(i, expectedIndex);
      const int rangeEnd = std::max(i, expectedIndex);
      ranges.emplace_back(rangeBegin, rangeEnd);
    }

    return rangeNumberAfterMerge(ranges);
  }

 private:
  class Range {
   public:
    int begin;
    int end;
  };

  static int rangeNumberAfterMerge(std::vector<Range> ranges) {
    if (ranges.empty()) {
      return 0;
    }

    std::sort(ranges.begin(), ranges.end(),
              [](const Range& range1, const Range& range2) {
                if (range1.begin != range2.begin) {
                  return range1.begin < range2.begin;
                }
                return range1.end < range2.end;
              });

    int currentEnd = ranges[0].end;
    int rangeNumber = 1;

    for (int i = 1; i < ranges.size(); i++) {
      const Range& currentRange = ranges[i];
      if (currentRange.begin > currentEnd) {
        // new range
        rangeNumber++;
        currentEnd = currentRange.end;
      } else {
        // Can merge. Extend current range if possible.
        currentEnd = std::max(currentRange.end, currentEnd);
      }
    }

    return rangeNumber;
  }
};

// @lc code=end
