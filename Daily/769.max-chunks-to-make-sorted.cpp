/*
 * @lc app=leetcode id=769 lang=cpp
 *
 * [769] Max Chunks To Make Sorted
 */

#include <vector>

// @lc code=start

class Solution {
 public:
  int maxChunksToSorted(const std::vector<int>& arr) {
    int currentEnd = -1;
    int chunkNumber = 0;

    for (int i = 0; i < arr.size(); i++) {
      const int expectedIndex = arr[i];
      const int chunkBegin = std::min(i, expectedIndex);
      const int chunkEnd = std::max(i, expectedIndex);

      if (chunkBegin > currentEnd) {
        // Can not merge. New chunk
        chunkNumber++;
        currentEnd = chunkEnd;
      } else {
        // Can merge. Extend current chunk if possible.
        currentEnd = std::max(chunkEnd, currentEnd);
      }
    }

    return chunkNumber;
  }
};

// @lc code=end
