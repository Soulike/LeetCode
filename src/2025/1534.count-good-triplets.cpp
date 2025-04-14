/*
 * @lc app=leetcode id=1534 lang=cpp
 *
 * [1534] Count Good Triplets
 */

#include <cmath>
#include <vector>

// @lc code=start
class Solution {
 public:
  int countGoodTriplets(const std::vector<int>& arr,
                        const int a,
                        const int b,
                        const int c) {
    int count = 0;
    for (int i = 0; i < arr.size(); i++) {
      for (int j = i + 1; j < arr.size(); j++) {
        for (int k = j + 1; k < arr.size(); k++) {
          if (std::abs(arr[i] - arr[j]) <= a &&
              std::abs(arr[j] - arr[k]) <= b &&
              std::abs(arr[i] - arr[k]) <= c) {
            count++;
          }
        }
      }
    }

    return count;
  }
};
// @lc code=end
