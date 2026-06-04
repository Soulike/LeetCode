/*
 * @lc app=leetcode id=3751 lang=cpp
 *
 * [3751] Total Waviness of Numbers in Range I
 */

#include <algorithm>
#include <array>

// @lc code=start
class Solution {
 public:
  int totalWaviness(int num1, int num2) {
    if (num2 < 101) {
      return 0;
    }
    num1 = std::max(101, num1);
    int total_count = 0;
    for (int i = num1; i <= num2; i++) {
      total_count += CountWavinessOfDigits(i);
    }
    return total_count;
  }

 private:
  static int CountWavinessOfDigits(int num) {
    std::array<int, 3> last_digits = {0, 0, 0};
    for (int i = 0; i < 2; i++) {
      const int digit = num % 10;
      last_digits[i] = digit;
      num /= 10;
    }
    int next_digit_real_index = 2;

    int count = 0;
    while (num > 0) {
      const int digit = num % 10;
      last_digits[next_digit_real_index % 3] = digit;
      num /= 10;

      const int mid_digit_index = (next_digit_real_index % 3 - 1 + 3) % 3;
      next_digit_real_index++;

      count += (last_digits[(mid_digit_index - 1 + 3) % 3] <
                    last_digits[mid_digit_index] &&
                last_digits[mid_digit_index] >
                    last_digits[(mid_digit_index + 1) % 3]) ||
               (last_digits[(mid_digit_index - 1 + 3) % 3] >
                    last_digits[mid_digit_index] &&
                last_digits[mid_digit_index] <
                    last_digits[(mid_digit_index + 1) % 3]);
    }
    return count;
  }
};
// @lc code=end
