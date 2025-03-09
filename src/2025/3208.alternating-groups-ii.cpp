/*
 * @lc app=leetcode id=3208 lang=cpp
 *
 * [3208] Alternating Groups II
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  int numberOfAlternatingGroups(const std::vector<int>& colors, const int k) {
    const int kColorSize = static_cast<int>(colors.size());
    int currentAlternatingGroupSize = 1;
    int groupNumber = 0;

    /**
     * The group ends at `i`.
     * The last group should start at `kColorSize - 1`.
     * To achive this, the size of array for search is `kColorSize + k - 1`.
     */
    for (int i = 1; i < kColorSize + k - 1; i++) {
      if (colors[(i - 1) % kColorSize] == colors[i % kColorSize]) {
        if (currentAlternatingGroupSize >= k) {
          groupNumber += currentAlternatingGroupSize - k + 1;
        }
        currentAlternatingGroupSize = 1;
        continue;
      }

      currentAlternatingGroupSize++;
    }

    if (currentAlternatingGroupSize >= k) {
      groupNumber += currentAlternatingGroupSize - k + 1;
    }

    return groupNumber;
  }
};
// @lc code=end

int main() {
  std::vector<int> colors = {0, 1, 0, 0, 1};
  Solution sol;
  sol.numberOfAlternatingGroups(colors, 3);
}
