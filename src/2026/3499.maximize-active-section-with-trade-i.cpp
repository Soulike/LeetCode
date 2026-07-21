/*
 * @lc app=leetcode id=3499 lang=cpp
 *
 * [3499] Maximize Active Section with Trade I
 */

#include <optional>
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

    std::optional<Segment> prev_segment;
    std::optional<Segment> current_segment;

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

    std::size_t max_one_count = one_count;

    for (std::size_t i = first_zero_segment_begin_index;
         i <= last_zero_segment_end_index; i++) {
      if (s[i] != current_content) {
        if (current_content == '0') {
          prev_segment = current_segment;
          current_segment = {.begin_index = current_segment_begin_index,
                             .end_index = i - 1};
          if (prev_segment) {
            const std::size_t additional_one_count =
                (prev_segment.value().end_index -
                 prev_segment.value().begin_index + 1) +
                (current_segment.value().end_index -
                 current_segment.value().begin_index + 1);
            max_one_count =
                std::max(max_one_count, one_count + additional_one_count);
          }
        }
        current_segment_begin_index = i;
        current_content = s[i];
      }
    }

    // Last 0 segment
    prev_segment = current_segment;
    current_segment = {.begin_index = current_segment_begin_index,
                       .end_index = last_zero_segment_end_index};
    if (prev_segment) {
      const std::size_t additional_one_count =
          (prev_segment.value().end_index - prev_segment.value().begin_index +
           1) +
          (current_segment.value().end_index -
           current_segment.value().begin_index + 1);
      max_one_count = std::max(max_one_count, one_count + additional_one_count);
    }

    return static_cast<int>(max_one_count);
  }

 private:
  struct Segment {
    std::size_t begin_index;
    std::size_t end_index;
  };
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxActiveSectionsAfterTrade("0100");
}
