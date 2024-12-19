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
    std::vector<Chunk> chunks;
    for (int i = 0; i < arr.size(); i++) {
      const int expectedIndex = arr[i];
      const int chunkBegin = std::min(i, expectedIndex);
      const int chunkEnd = std::max(i, expectedIndex);
      chunks.emplace_back(chunkBegin, chunkEnd);
    }

    // Here, chunks are already sorted by `begin`.
    return chunkNumberAfterMerge(chunks);
  }

 private:
  class Chunk {
   public:
    int begin;
    int end;
  };

  static int chunkNumberAfterMerge(
      const std::vector<Chunk>& chunksSortedByBegin) {
    if (chunksSortedByBegin.empty()) {
      return 0;
    }

    int currentEnd = chunksSortedByBegin[0].end;
    int chunkNumber = 1;

    for (int i = 1; i < chunksSortedByBegin.size(); i++) {
      const Chunk& currentChunk = chunksSortedByBegin[i];
      if (currentChunk.begin > currentEnd) {
        // Can not merge. New chunk
        chunkNumber++;
        currentEnd = currentChunk.end;
      } else {
        // Can merge. Extend current chunk if possible.
        currentEnd = std::max(currentChunk.end, currentEnd);
      }
    }

    return chunkNumber;
  }
};

// @lc code=end
