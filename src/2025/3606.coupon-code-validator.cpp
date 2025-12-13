/*
 * @lc app=leetcode id=3606 lang=cpp
 *
 * [3606] Coupon Code Validator
 */

#include <algorithm>
#include <string>
#include <string_view>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> validateCoupons(
      const std::vector<std::string>& code,
      const std::vector<std::string>& businessLine,
      const std::vector<bool>& isActive) {
    const int coupon_count = code.size();
    std::vector<int> valid_coupons;
    for (int i = 0; i < coupon_count; i++) {
      if (!isActive[i] || !IsBusinessLineValid(businessLine[i]) ||
          !IsCodeValid(code[i])) {
        continue;
      }
      valid_coupons.push_back(i);
    }

    std::ranges::sort(valid_coupons, [&](const int i, const int j) {
      const std::string& business_line1 = businessLine[i];
      const std::string& business_line2 = businessLine[j];
      if (business_line1 == business_line2) {
        return code[i] < code[j];
      }
      return business_line_to_sequence_number_.at(business_line1) <
             business_line_to_sequence_number_.at(business_line2);
    });

    std::vector<std::string> valid_coupon_codes(valid_coupons.size());
    std::ranges::transform(valid_coupons, valid_coupon_codes.begin(),
                           [&](const int coupon) { return code[coupon]; });
    return valid_coupon_codes;
  }

 private:
  static inline const std::unordered_map<std::string, int>
      business_line_to_sequence_number_ = {
          {"electronics", 0},
          {"grocery", 1},
          {"pharmacy", 2},
          {"restaurant", 3},
  };

  static bool IsCodeValid(const std::string_view code) {
    if (code.empty()) {
      return false;
    }

    static constexpr auto predicate = [](const char character) {
      return 'a' <= character && character <= 'z' ||
             'A' <= character && character <= 'Z' ||
             '0' <= character && character <= '9' || character == '_';
    };

    return std::ranges::all_of(code, predicate);
  }

  static bool IsBusinessLineValid(const std::string& business_line) {
    return business_line_to_sequence_number_.contains(business_line);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.validateCoupons({"SAVE20", "", "PHARMA5", "SAVE@20"},
                      {"restaurant", "grocery", "pharmacy", "restaurant"},
                      {true, true, true, true});
}