/*
 * @lc app=leetcode id=3394 lang=cpp
 *
 * [3394] Check if Grid can be Cut into Sections
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Range {
 public:
  int begin;
  int end;
};

class Solution {
 public:
  bool checkValidCuts(const int n,
                      const std::vector<std::vector<int>>& rectangles) {
    std::vector<Range> horizontalRanges;
    horizontalRanges.reserve(rectangles.size());
    std::vector<Range> verticalRanges;
    verticalRanges.reserve(rectangles.size());

    for (const auto& rectangle : rectangles) {
      const int startX = rectangle[0];
      const int startY = rectangle[1];
      const int endX = rectangle[2];
      const int endY = rectangle[3];

      horizontalRanges.push_back({startX, endX});
      verticalRanges.push_back({startY, endY});
    }

    const std::vector<Range> horizontalMergedRanges =
        mergeRanges(horizontalRanges);
    const std::vector<Range> verticalMergedRanges = mergeRanges(verticalRanges);
    return horizontalMergedRanges.size() >= 3 ||
           verticalMergedRanges.size() >= 3;
  }

 private:
  static std::vector<Range> mergeRanges(std::vector<Range> ranges) {
    if (ranges.empty()) {
      return {};
    }

    static constexpr auto rangeComp = [](const Range& range1,
                                         const Range& range2) {
      if (range1.begin != range2.begin) {
        return range1.begin < range2.begin;
      }
      return range1.end > range2.end;
    };
    std::sort(ranges.begin(), ranges.end(), rangeComp);

    int currentRangeBegin = ranges[0].begin;
    int currentRangeEnd = ranges[0].end;
    std::vector<Range> mergedRanges;

    for (const Range& range : ranges) {
      if (range.begin >= currentRangeEnd) {
        mergedRanges.push_back({currentRangeBegin, currentRangeEnd});
        currentRangeBegin = range.begin;
        currentRangeEnd = range.end;
      } else {
        currentRangeEnd = std::max(currentRangeEnd, range.end);
      }
    }

    mergedRanges.push_back({currentRangeBegin, currentRangeEnd});

    return mergedRanges;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.checkValidCuts(4,
                     {{0, 0, 1, 1}, {2, 0, 3, 4}, {0, 2, 2, 3}, {3, 0, 4, 3}});
}
