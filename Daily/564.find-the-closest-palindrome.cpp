/*
 * @lc app=leetcode id=564 lang=cpp
 *
 * [564] Find the Closest Palindrome
 */
#include <algorithm>
#include <cmath>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string nearestPalindromic(std::string n) {
    const std::int64_t nNumber = std::stoll(n);
    const int digitNumber = n.size();

    // Corner case: only one digit
    if (digitNumber == 1) {
      return std::to_string(nNumber == 0 ? 1 : nNumber - 1);
    }

    std::vector<std::int64_t> candidates;

    // Case 1: one more digit
    std::string moreDigitResultStr(digitNumber + 1, '0');
    moreDigitResultStr.front() = '1';
    moreDigitResultStr.back() = '1';
    const std::int64_t moreDigitResult = std::stoll(moreDigitResultStr);
    candidates.push_back(moreDigitResult);

    // Case 2: one less digit
    const std::int64_t lessDigitResult =
        std::stoll(std::string(digitNumber - 1, '9'));
    candidates.push_back(lessDigitResult);

    const std::int64_t prefix = std::stoll(n.substr(0, digitNumber / 2));

    std::string midDigit;
    if (digitNumber % 2) {
      midDigit += n[digitNumber / 2];
    }

    const std::string prefixString = std::to_string(prefix);
    const std::string reversedPrefixString = getReversedString(prefixString);

    // Case 3: Mirror prefix.
    // Ensure it is unequal to original `n`
    if (!isPalindromic(n)) {
      std::string equalPrefixCandidate =
          prefixString + midDigit + reversedPrefixString;
      candidates.push_back(std::stoll(equalPrefixCandidate));
    }

    // It is an odd-digit number. We modify the mid-digit.
    if (!midDigit.empty()) {
      const int midDigitNumber = std::stoi(midDigit);
      // Case 3: smaller prefix
      if (midDigitNumber - 1 >= 0) {
        std::string lessMidCandidate = prefixString +
                                       std::to_string(midDigitNumber - 1) +
                                       reversedPrefixString;
        candidates.push_back(std::stoll(lessMidCandidate));
      }
      // Case 4: larger prefix
      if (midDigitNumber + 1 < 10) {
        std::string moreMidCandidate = prefixString +
                                       std::to_string(midDigitNumber + 1) +
                                       reversedPrefixString;
        candidates.push_back(std::stoll(moreMidCandidate));
      }
    } else {
      // Case 3
      // Ensure no digit number change. Only xxxx9 + 1 cause the change.
      if (prefix % 10 != 9) {
        const std::int64_t morePrefix = prefix + 1;
        const std::string morePrefixString = std::to_string(morePrefix);
        std::string morePrefixCandidate =
            morePrefixString + midDigit + getReversedString(morePrefixString);
        candidates.push_back(std::stoll(morePrefixCandidate));
      }

      // Case 4
      // Ensure no digit number change. Only 100...00 - 1 cause the change
      if (!(isPowerOfTen(prefix))) {
        const std::int64_t lessPrefix = prefix - 1;
        const std::string lessPrefixString = std::to_string(lessPrefix);
        std::string lessPrefixCandidate =
            lessPrefixString + midDigit + getReversedString(lessPrefixString);
        candidates.push_back(std::stoll(lessPrefixCandidate));
      }
    }

    std::sort(candidates.begin(), candidates.end());

    std::int64_t result = candidates[0];
    for (int i = 1; i < candidates.size(); i++) {
      if (std::abs(candidates[i] - nNumber) < std::abs(result - nNumber)) {
        result = candidates[i];
      }
    }

    return std::to_string(result);
  }

 private:
  bool isPalindromic(std::string& str) {
    int left = 0;
    int right = str.size() - 1;

    while (left < right) {
      if (str[left] != str[right]) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }

  bool isPowerOfTen(std::int64_t n) {
    if (n <= 0) {
      return false;
    }
    while (n % 10 == 0) {
      n /= 10;
    }
    return n == 1;
  }

  std::string getReversedString(const std::string& str) {
    return {str.rbegin(), str.rend()};
  }
};
// @lc code=end
