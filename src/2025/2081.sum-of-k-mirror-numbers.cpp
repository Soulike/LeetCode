/*
 * @lc app=leetcode id=2081 lang=cpp
 *
 * [2081] Sum of k-Mirror Numbers
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  long long kMirror(const int base, const int n) {
    long long result = 0;
    int found_number_count = 0;

    int left_half_min = 1;

    while (found_number_count < n) {
      std::vector<long long> even_palindrome_numbers;
      for (int left_half = left_half_min; left_half < left_half_min * 10;
           left_half++) {
        const long long odd_palindrome_number =
            Generate10BasedOddPalindromeNumber(left_half);
        if (IsPalindromeForBase(base, odd_palindrome_number)) {
          found_number_count++;
          result += odd_palindrome_number;
          if (found_number_count == n) {
            break;
          }
        }
      }

      if (found_number_count == n) {
        break;
      }
      for (int left_half = left_half_min; left_half < left_half_min * 10;
           left_half++) {
        const long long even_palindrome_number =
            Generate10BasedEvenPalindromeNumber(left_half);
        if (IsPalindromeForBase(base, even_palindrome_number)) {
          found_number_count++;
          result += even_palindrome_number;
          if (found_number_count == n) {
            break;
          }
        }
      }
      left_half_min *= 10;
    }

    return result;
  }

 private:
  static long long Generate10BasedOddPalindromeNumber(const int left_half) {
    int current_left_half = left_half / 10;
    long long odd_palindrome_number = left_half;
    while (current_left_half > 0) {
      odd_palindrome_number *= 10;
      odd_palindrome_number += current_left_half % 10;
      current_left_half /= 10;
    }
    return odd_palindrome_number;
  }

  static long long Generate10BasedEvenPalindromeNumber(const int left_half) {
    int current_left_half = left_half;
    long long even_palindrome_number = left_half;
    while (current_left_half > 0) {
      even_palindrome_number *= 10;
      even_palindrome_number += current_left_half % 10;
      current_left_half /= 10;
    }
    return even_palindrome_number;
  }

  static bool IsPalindromeForBase(const int base, const long long num) {
    std::vector<int> digits;
    long long current_num = num;
    while (current_num > 0) {
      digits.push_back(current_num % base);
      current_num /= base;
    }

    for (int i = 0; i < digits.size() / 2; i++) {
      if (digits[i] != digits[digits.size() - i - 1]) {
        return false;
      }
    }

    return true;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.kMirror(7, 30);
}
