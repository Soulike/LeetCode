/*
 * @lc app=leetcode id=1291 lang=cpp
 *
 * [1291] Sequential Digits
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> sequentialDigits(const int low, const int high) {
    const std::vector<int>& sequential_digits = GetSequentialDigits();

    if (high < sequential_digits.front() || low > sequential_digits.back()) {
      return {};
    }

    int low_index = -1;
    int high_index = sequential_digits.size();

    for (int i = 0; i < sequential_digits.size(); i++) {
      if (sequential_digits[i] >= low) {
        low_index = i;
        break;
      }
    }

    for (int i = sequential_digits.size() - 1; i >= 0; i--) {
      if (sequential_digits[i] <= high) {
        high_index = i;
        break;
      }
    }

    low_index = std::max(low_index, 0);
    high_index =
        std::min(high_index, static_cast<int>(sequential_digits.size()) - 1);

    std::vector<int> result;
    result.reserve(high_index - low_index + 1);

    for (int i = low_index; i <= high_index; i++) {
      result.push_back(sequential_digits[i]);
    }
    return result;
  }

 private:
  static const std::vector<int>& GetSequentialDigits() {
    static std::vector<int> sequential_digits;
    if (!sequential_digits.empty()) {
      return sequential_digits;
    }

    for (int i = 1; i <= 8; i++) {
      int current_number = i;
      for (int j = i + 1; j <= 9; j++) {
        current_number = current_number * 10 + j;
        sequential_digits.push_back(current_number);
      }
    }

    std::ranges::sort(sequential_digits);

    return sequential_digits;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.sequentialDigits(100, 300);
}
