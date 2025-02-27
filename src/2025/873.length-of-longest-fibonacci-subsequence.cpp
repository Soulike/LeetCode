/*
 * @lc app=leetcode id=873 lang=cpp
 *
 * [873] Length of Longest Fibonacci Subsequence
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int lenLongestFibSubseq(const std::vector<int>& arr) {
    std::unordered_map<int, int> numToIndex;
    for (int i = 0; i < arr.size(); i++) {
      numToIndex[arr[i]] = i;
    }

    int maxSequenceLength = 0;
    /**
     * dp[i][j]: the longest Fibonacci-like sequence ends with [arr[i], arr[j]]
     */
    std::vector<std::vector<int>> dp(arr.size(),
                                     std::vector<int>(arr.size(), 0));

    for (int i = 1; i < arr.size(); i++) {
      for (int j = i + 1; j < arr.size(); j++) {
        const int expectedPrevNum = arr[j] - arr[i];
        if (expectedPrevNum >= arr[i]) {
          // Previous num must be smaller than both arr[i] and arr[j]
          continue;
        }

        if (!numToIndex.contains(expectedPrevNum)) {
          continue;
        }
        const int expectedPrevNumIndex = numToIndex[expectedPrevNum];
        if (dp[expectedPrevNumIndex][i] > 0) {
          dp[i][j] = std::max(dp[i][j], dp[expectedPrevNumIndex][i] + 1);
        } else {
          dp[i][j] = std::max(dp[i][j], 3);
        }

        maxSequenceLength = std::max(maxSequenceLength, dp[i][j]);
      }
    }

    return maxSequenceLength;
  }
};
// @lc code=end

int main() {
  std::vector<int> arr = {2, 4, 5, 6, 7, 8, 11, 13, 14, 15, 21, 22, 34};
  Solution sol;
  sol.lenLongestFibSubseq(arr);
}
