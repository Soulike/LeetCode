/*
 * @lc app=leetcode id=3152 lang=cpp
 *
 * [3152] Special Array II
 */

#include <vector>

// @lc code=start
class IndexRange {
 public:
  IndexRange(const int beginIndex, const int endIndex)
      : beginIndex(beginIndex), endIndex(endIndex) {}

  const int beginIndex;
  const int endIndex;
};

class Solution {
 public:
  std::vector<bool> isArraySpecial(std::vector<int>& nums,
                                   std::vector<std::vector<int> >& queries) {
    int currentSpecialSubArrayBeginIndex = 0;
    std::vector<IndexRange> specialSubArrayRanges;
    for (int i = 0; i < nums.size(); i++) {
      if (i == nums.size() - 1 || !hasDifferentParity(nums[i], nums[i + 1])) {
        const IndexRange range(currentSpecialSubArrayBeginIndex, i);
        specialSubArrayRanges.push_back(range);
        currentSpecialSubArrayBeginIndex = i + 1;
      }
    }

    std::vector<bool> queryResults(queries.size(), false);
    for (int i = 0; i < queries.size(); i++) {
      const std::vector<int>& query = queries[i];
      const int beginIndex = query[0];
      const int endIndex = query[1];

      const int beginIndexInRangeIndex =
          getRangeIncludingIndex(beginIndex, specialSubArrayRanges);
      const int endIndexInRangeIndex =
          getRangeIncludingIndex(endIndex, specialSubArrayRanges);
      queryResults[i] = beginIndexInRangeIndex == endIndexInRangeIndex;
    }

    return queryResults;
  }

 private:
  static int getRangeIncludingIndex(const int index,
                                    const std::vector<IndexRange>& ranges) {
    int beginIndex = 0;
    int endIndex = static_cast<int>(ranges.size()) - 1;

    while (beginIndex <= endIndex) {
      const int midIndex = (endIndex - beginIndex) / 2 + beginIndex;
      const IndexRange& midIndexRange = ranges[midIndex];
      if (index < midIndexRange.beginIndex) {
        endIndex = midIndex - 1;
      } else if (index > midIndexRange.endIndex) {
        beginIndex = midIndex + 1;
      } else {
        return midIndex;
      }
    }

    return -1;
  }

  static bool hasDifferentParity(const int num1, const int num2) {
    return (num1 ^ num2) & 0b1;
  }
};

// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {4, 3, 1, 6};
  std::vector<std::vector<int> > queries = {{0, 2}, {2, 3}};
  sol.isArraySpecial(nums, queries);
}
