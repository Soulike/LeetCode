/*
 * @lc app=leetcode id=2226 lang=cpp
 *
 * [2226] Maximum Candies Allocated to K Children
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximumCandies(std::vector<int>& candies, const long long k) {
    int left = 0;
    int right = *std::max_element(candies.cbegin(), candies.cend()) + 1;

    // upper_bound implementation
    while (left < right) {
      const int mid = (right - left) / 2 + left;
      if (canDivideCandies(candies, k, mid)) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // left is the first mid > target. Use left - 1.
    return left - 1;
  }

 private:
  static bool canDivideCandies(const std::vector<int>& candies,
                               const long long childrenNumber,
                               const int targetCandyNumberPerChild) {
    if (targetCandyNumberPerChild == 0) {
      return true;
    }
    long long gotCandiesChildrenNumber = 0;

    for (const int candie : candies) {
      gotCandiesChildrenNumber += candie / targetCandyNumberPerChild;
    }

    return gotCandiesChildrenNumber >= childrenNumber;
  }
};
// @lc code=end
