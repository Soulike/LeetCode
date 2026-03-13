/*
 * @lc app=leetcode id=3296 lang=cpp
 *
 * [3296] Minimum Number of Seconds to Make Mountain Height Zero
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long minNumberOfSeconds(const int mountain_height,
                               const std::vector<int>& worker_times) {
    long long left = 1;
    long long right = LONG_LONG_MAX;

    while (left < right) {
      const long long mid = (right - left) / 2 + left;
      if (CanRemove(mid, mountain_height, worker_times)) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }

 private:
  static bool CanRemove(const long long seconds,
                        const int mountain_height,
                        const std::vector<int>& worker_times) {
    int removable_height = 0;
    for (const long long time : worker_times) {
      long long worker_seconds = 0;
      for (long long i = 1;; i++) {
        worker_seconds += time * i;
        if (worker_seconds > seconds) {
          // Times out
          break;
        }
        removable_height++;
        if (removable_height >= mountain_height) {
          return true;
        }
      }
    }

    return false;
  }
};
// @lc code=end
