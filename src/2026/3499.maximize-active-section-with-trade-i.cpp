/*
 * @lc app=leetcode id=3499 lang=cpp
 *
 * [3499] Maximize Active Section with Trade I
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxActiveSectionsAfterTrade(std::string s) {
    std::size_t one_count = 0;
    for (const char c : s) {
      one_count += c == '1';
    }

    std::vector<Segment> segments;

    // Here we ensure the segments will be arranged as
    // 0 segment, 1 segment, 0 segment, ..., 0 segment, 1 segment, 0 segment.
    std::size_t first_zero_segment_begin_index = -1;
    for (int i = 0; i < s.size(); i++) {
      if (s[i] == '0') {
        first_zero_segment_begin_index = i;
        break;
      }
    }

    if (first_zero_segment_begin_index == -1) {
      // Having no 0 segment. Impossible to trade.
      return static_cast<int>(one_count);
    }

    std::size_t last_zero_segment_end_index = -1;
    for (int i = s.size() - 1; i >= 0; i--) {
      if (s[i] == '0') {
        last_zero_segment_end_index = i;
        break;
      }
    }

    std::size_t current_segment_begin_index = first_zero_segment_begin_index;
    char current_content = '0';

    for (std::size_t i = first_zero_segment_begin_index;
         i <= last_zero_segment_end_index; i++) {
      if (s[i] != current_content) {
        segments.push_back({.begin_index = current_segment_begin_index,
                            .end_index = i - 1,
                            .content = current_content});
        current_segment_begin_index = i;
        current_content = s[i];
      }
    }

    // Last 0 segment
    segments.push_back({.begin_index = current_segment_begin_index,
                        .end_index = last_zero_segment_end_index,
                        .content = '0'});

    std::size_t max_one_count = one_count;
    for (int i = 0; i < segments.size(); i++) {
      const Segment& segment = segments[i];
      if (segment.content == '0') {
        continue;
      }

      // For 1 segment, segments[i + 1] and segments[i - 1] always present as 0
      // segments.
      const std::size_t additional_one_count =
          (segments[i - 1].end_index - segments[i - 1].begin_index + 1) +
          (segments[i + 1].end_index - segments[i + 1].begin_index + 1);

      max_one_count = std::max(max_one_count, one_count + additional_one_count);
    }

    return static_cast<int>(max_one_count);
  }

 private:
  struct Segment {
    std::size_t begin_index;
    std::size_t end_index;
    char content;  // '0' or '1'
  };
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxActiveSectionsAfterTrade("0100");
}
