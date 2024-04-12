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
    int left = 0;
    int right = N - 1;
    int leftMaxHeight = 0;
    int rightMaxHeight = 0;
    int water = 0;

    while (left <= right) {
      if (heights[left] < heights[right]) {
        if (leftMaxHeight < heights[left]) {
          leftMaxHeight = heights[left];
        } else {
          water += leftMaxHeight - heights[left];
        }
        left++;
      } else {
        if (rightMaxHeight < heights[right]) {
          rightMaxHeight = heights[right];
        } else {
          water += rightMaxHeight - heights[right];
        }
        right--;
      }
    }

    return water;
  }
};
// @lc code=end