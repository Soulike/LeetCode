/*
 * @lc app=leetcode id=1653 lang=cpp
 *
 * [1653] Minimum Deletions to Make String Balanced
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumDeletions(const std::string& s) {
    // Exclusive
    std::vector<int> b_count_before(s.size(), 0);
    std::vector<int> a_count_after(s.size(), 0);

    for (int i = 1; i < s.size(); i++) {
      b_count_before[i] = b_count_before[i - 1] + (s[i - 1] == 'b');
    }
    for (int i = s.size() - 2; i >= 0; i--) {
      a_count_after[i] = a_count_after[i + 1] + (s[i + 1] == 'a');
    }

    int min_deletion_count = s.size();

    for (int i = 0; i < s.size(); i++) {
      min_deletion_count =
          std::min(min_deletion_count, b_count_before[i] + a_count_after[i]);
    }

    return min_deletion_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumDeletions("aababbab");
}