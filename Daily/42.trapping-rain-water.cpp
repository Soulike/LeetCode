/*
 * @lc app=leetcode id=42 lang=cpp
 *
 * [42] Trapping Rain Water
 */
#include <cmath>
#include <iostream>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  int trap(const vector<int>& heights) {
    const int N = heights.size();
    vector<int> maxLeftHeight(N);
    vector<int> maxRightHeight(N);

    maxLeftHeight[0] = heights[0];
    maxRightHeight[N - 1] = heights[N - 1];

    for (int i = 1; i < N; i++) {
      maxLeftHeight[i] = std::max(maxLeftHeight[i - 1], heights[i]);
      maxRightHeight[N - i - 1] =
          std::max(maxRightHeight[N - i], heights[N - i - 1]);
    }

    int water = 0;
    for (int i = 0; i < N; i++) {
      water += std::min(maxLeftHeight[i], maxRightHeight[i]) - heights[i];
    }

    return water;
  }
};
// @lc code=end