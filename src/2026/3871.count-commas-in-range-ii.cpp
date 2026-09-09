/*
 * @lc app=leetcode id=3871 lang=cpp
 *
 * [3871] Count Commas in Range II
 */

// @lc code=start
class Solution {
 public:
  long long countCommas(long long n) {
    const int digit_count = GetDigitCount(n);

    long long comma_count = 0;
    long long current_range_base_num = 1000;
    for (int i = 4; i < digit_count; i++) {
      comma_count += ((i - 1) / 3) *
                     (current_range_base_num * 10 - current_range_base_num);
      current_range_base_num *= 10;
    }

    comma_count += ((digit_count - 1) / 3) * (n - current_range_base_num + 1);

    return comma_count;
  }

 private:
  static int GetDigitCount(long long num) {
    int digit_count = 0;
    while (num > 0) {
      digit_count++;
      num /= 10;
    }
    return digit_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countCommas(2263071997);
}
