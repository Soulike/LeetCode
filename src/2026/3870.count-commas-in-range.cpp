/*
 * @lc app=leetcode id=3870 lang=cpp
 *
 * [3870] Count Commas in Range
 */

// @lc code=start
class Solution {
 public:
  int countCommas(const int n) {
    const int digit_count = GetDigitCount(n);

    int comma_count = 0;
    int current_range_base_num = 1000;
    for (int i = 4; i < digit_count; i++) {
      comma_count += ((i - 1) / 3) *
                     (current_range_base_num * 10 - current_range_base_num);
      current_range_base_num *= 10;
    }

    comma_count += ((digit_count - 1) / 3) * (n - current_range_base_num + 1);

    return comma_count;
  }

 private:
  static int GetDigitCount(int num) {
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
  sol.countCommas(10068);
}
