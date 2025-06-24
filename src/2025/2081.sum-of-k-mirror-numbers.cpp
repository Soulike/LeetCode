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
  static long long Generate10BasedOddPalindromeNumber(
      const long long left_half) {
    long long result = left_half;
    long long temp = left_half / 10;

    while (temp > 0) {
      result = result * 10 + (temp % 10);
      temp /= 10;
    }
    return result;
  }

  static long long Generate10BasedEvenPalindromeNumber(
      const long long left_half) {
    long long result = left_half;
    long long temp = left_half;

    while (temp > 0) {
      result = result * 10 + (temp % 10);
      temp /= 10;
    }
    return result;
  }

  static bool IsPalindromeForBase(const int base, const long long num) {
    long long current_num = num;
    long long reversed = 0;

    while (current_num > 0) {
      reversed = reversed * base + (current_num % base);
      current_num /= base;
    }

    return num == reversed;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.kMirror(7, 30);
}
