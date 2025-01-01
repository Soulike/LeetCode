/*
 * @lc app=leetcode id=3016 lang=cpp
 *
 * [3016] Minimum Number of Pushes to Type Word II
 */
#include <algorithm>
#include <array>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumPushes(const std::string& word) {
    std::array<int, 26> freqs = {0};
    for (const char c : word) {
      freqs[c - 'a']++;
    }

    std::sort(freqs.rbegin(), freqs.rend());

    int pushCount = 0;
    for (int i = 0; i < freqs.size(); i++) {
      pushCount += freqs[i] * ((i / 8) + 1);
    }
    return pushCount;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumPushes("mlvczxmtbztemlrbqiwlizqws");
}
