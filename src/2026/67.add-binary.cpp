/*
 * @lc app=leetcode id=67 lang=cpp
 *
 * [67] Add Binary
 */

#include <string>

// @lc code=start
class Solution {
 public:
  std::string addBinary(std::string a, std::string b) {
    const std::string& shorter = a.size() < b.size() ? a : b;
    std::string& longer = a.size() < b.size() ? b : a;

    auto shorter_reverse_it = shorter.crbegin();
    auto longer_reverse_it = longer.rbegin();

    int carry = 0;
    while (shorter_reverse_it != shorter.rend()) {
      const int sum =
          (*shorter_reverse_it - '0') + (*longer_reverse_it - '0') + carry;
      *longer_reverse_it = sum % 2 + '0';
      carry = (sum - sum % 2) / 2;
      ++shorter_reverse_it;
      ++longer_reverse_it;
    }

    while (carry > 0 && longer_reverse_it != longer.rend()) {
      const int sum = (*longer_reverse_it - '0') + carry;
      *longer_reverse_it = sum % 2 + '0';
      carry = (sum - sum % 2) / 2;
      ++longer_reverse_it;
    }

    while (carry > 0) {
      longer.insert(0, "1");
      carry--;
      carry /= 2;
    }

    return longer;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.addBinary("1010", "1011");
}