/*
 * @lc app=leetcode id=2094 lang=cpp
 *
 * [2094] Finding 3-Digit Even Numbers
 */

#include <algorithm>
#include <deque>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> findEvenNumbers(std::vector<int>& digits) {
    std::ranges::sort(digits);

    std::vector<int> even_numbers;
    std::deque<int> current_number_digits;
    std::vector<bool> usedIndexes(digits.size(), false);
    Backtrack(current_number_digits, even_numbers, digits, usedIndexes);
    std::ranges::sort(even_numbers);
    return even_numbers;
  }

 private:
  static void Backtrack(std::deque<int>& current_number_digits,
                        std::vector<int>& even_numbers,
                        const std::vector<int>& digits,
                        std::vector<bool>& usedIndexes) {
    if (current_number_digits.size() == 3) {
      even_numbers.push_back(
          ToInt(current_number_digits.cbegin(), current_number_digits.cend()));
      return;
    }
    int last_used_digit = -1;
    if (current_number_digits.size() == 2) {
      for (int i = 0; i < digits.size(); i++) {
        if (usedIndexes[i]) {
          continue;
        }
        if (digits[i] == 0) {
          continue;
        }
        if (digits[i] == last_used_digit) {
          continue;
        }
        last_used_digit = digits[i];
        usedIndexes[i] = true;
        current_number_digits.push_front(digits[i]);
        Backtrack(current_number_digits, even_numbers, digits, usedIndexes);
        current_number_digits.pop_front();
        usedIndexes[i] = false;
      }
    } else if (current_number_digits.size() == 1) {
      for (int i = 0; i < digits.size(); i++) {
        if (usedIndexes[i]) {
          continue;
        }
        if (digits[i] == last_used_digit) {
          continue;
        }
        last_used_digit = digits[i];
        usedIndexes[i] = true;
        current_number_digits.push_front(digits[i]);
        Backtrack(current_number_digits, even_numbers, digits, usedIndexes);
        current_number_digits.pop_front();
        usedIndexes[i] = false;
      }
    } else if (current_number_digits.empty()) {
      for (int i = 0; i < digits.size(); i++) {
        if (usedIndexes[i]) {
          continue;
        }
        if (digits[i] % 2 == 1) {
          continue;
        }
        if (digits[i] == last_used_digit) {
          continue;
        }
        last_used_digit = digits[i];
        usedIndexes[i] = true;
        current_number_digits.push_front(digits[i]);
        Backtrack(current_number_digits, even_numbers, digits, usedIndexes);
        current_number_digits.pop_front();
        usedIndexes[i] = false;
      }
    }
  }

  template <class Iterator>
  static int ToInt(Iterator begin, Iterator end) {
    int result = 0;
    for (Iterator i = begin; i < end; i++) {
      result *= 10;
      result += *i;
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> digits = {2, 2, 8, 8, 2};
  sol.findEvenNumbers(digits);
}
