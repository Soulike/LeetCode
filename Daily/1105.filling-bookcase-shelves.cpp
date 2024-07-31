/*
 * @lc app=leetcode id=1105 lang=cpp
 *
 * [1105] Filling Bookcase Shelves
 */

#include <algorithm>
#include <array>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minHeightShelves(std::vector<std::vector<int>>& books, int shelfWidth) {
    const int BOOK_NUMBER = books.size();

    const int BOOK_WIDTH = 0;
    const int BOOK_HEIGHT = 1;

    // dp[i] - The min shelves' height if put books in [0,i).
    std::vector<int> dp(BOOK_NUMBER + 1, INT_MAX);
    // base cases
    dp[0] = 0;  // no book

    for (int i = 0; i < BOOK_NUMBER; i++) {
      // Put new book i
      int currentShelfWidth = books[i][BOOK_WIDTH];
      int currentShelfHeight = books[i][BOOK_HEIGHT];

      // Initially, put the book on a new shelf
      dp[i + 1] = currentShelfHeight + dp[i];

      // Try to put previous books on the new shelf
      // and find if there is smaller total height
      for (int j = i - 1; j >= 0; j--) {
        if (currentShelfWidth + books[j][BOOK_WIDTH] <= shelfWidth) {
          currentShelfWidth += books[j][BOOK_WIDTH];
          currentShelfHeight =
              std::max(currentShelfHeight, books[j][BOOK_HEIGHT]);
          dp[i + 1] = std::min(dp[j] + currentShelfHeight, dp[i + 1]);
        } else {
          break;
        }
      }
    }

    return dp[BOOK_NUMBER];
  }
};
// @lc code=end
