/*
 * @lc app=leetcode id=2975 lang=cpp
 *
 * [2975] Maximum Square Area by Removing Fences From a Field
 */

#include <algorithm>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maximizeSquareArea(const int m,
                         const int n,
                         std::vector<int>& h_fences,
                         std::vector<int>& v_fences) {
    static constexpr int kMod = 1e9 + 7;

    h_fences.push_back(1);
    h_fences.push_back(m);
    v_fences.push_back(1);
    v_fences.push_back(n);

    std::unordered_set<int> h_gaps;
    for (int i = 0; i < h_fences.size(); i++) {
      for (int j = i + 1; j < h_fences.size(); j++) {
        h_gaps.insert(std::abs(h_fences[j] - h_fences[i]));
      }
    }

    std::unordered_set<int> v_gaps;
    for (int i = 0; i < v_fences.size(); i++) {
      for (int j = i + 1; j < v_fences.size(); j++) {
        v_gaps.insert(std::abs(v_fences[j] - v_fences[i]));
      }
    }

    int max_side_length = 0;

    const std::unordered_set<int>& smaller_gaps =
        h_gaps.size() <= v_gaps.size() ? h_gaps : v_gaps;
    const std::unordered_set<int>& larger_gaps =
        h_gaps.size() > v_gaps.size() ? h_gaps : v_gaps;

    for (const int gap : smaller_gaps) {
      if (!larger_gaps.contains(gap)) {
        continue;
      }
      max_side_length = std::max(max_side_length, gap);
    }

    return max_side_length > 0 ? static_cast<int>(1ll * max_side_length *
                                                  max_side_length % kMod)
                               : -1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> h_fences = {2};
  std::vector<int> v_fences = {4};
  sol.maximizeSquareArea(6, 7, h_fences, v_fences);
}