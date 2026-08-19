/*
 * @lc app=leetcode id=1386 lang=cpp
 *
 * [1386] Cinema Seat Allocation
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxNumberOfFamilies(const int n,
                          const std::vector<std::vector<int>>& reservedSeats) {
    std::unordered_map<int, std::uint8_t> reserved_seats_in_row;
    for (const auto& reserved_seat : reservedSeats) {
      const int row = reserved_seat[0] - 1;
      const int seat = reserved_seat[1] - 2;

      // Convert to middle 8 bits

      if (seat < 0 || seat >= 8) {
        continue;
      }

      reserved_seats_in_row[row] =
          (reserved_seats_in_row[row] | (1 << (7 - seat)));
    }

    static constexpr std::uint8_t left_mask = 0b11110000;
    static constexpr std::uint8_t right_mask = 0b00001111;
    static constexpr std::uint8_t middle_mask = 0b00111100;

    int assign_count = 2 * (n - reserved_seats_in_row.size());
    for (const auto& [row, reserved_seats] : reserved_seats_in_row) {
      const int current_row_assign_count =
          ((reserved_seats & left_mask) == 0) +
              ((reserved_seats & right_mask) == 0) ||
          (reserved_seats & middle_mask) == 0;
      assign_count += current_row_assign_count;
    }

    return assign_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxNumberOfFamilies(4, {{4, 3}, {1, 4}, {4, 6}, {1, 7}});
}
