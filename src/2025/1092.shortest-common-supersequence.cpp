/*
 * @lc app=leetcode id=1092 lang=cpp
 *
 * [1092] Shortest Common Supersequence
 */

#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string shortestCommonSupersequence(const std::string& str1,
                                          const std::string& str2) {
    // Find LCS, and then insert the extra letters in order.
    const std::string lcs = getLongestCommonSequence(str1, str2);
    std::string scs;
    size_t str1Index = 0;
    size_t str2Index = 0;
    size_t lcsIndex = 0;

    while (str1Index < str1.size() && str2Index < str2.size() &&
           lcsIndex < lcs.size()) {
      while (str1Index < str1.size() && str1[str1Index] != lcs[lcsIndex]) {
        scs.push_back(str1[str1Index]);
        str1Index++;
      }
      while (str2Index < str2.size() && str2[str2Index] != lcs[lcsIndex]) {
        scs.push_back(str2[str2Index]);
        str2Index++;
      }
      scs.push_back(lcs[lcsIndex]);
      lcsIndex++;
      str1Index++;
      str2Index++;
    }
    scs += str1.substr(str1Index) + str2.substr(str2Index);
    return scs;
  }

 private:
  template <typename T>
  T getLongestCommonSequence(const T& arr1, const T& arr2) {
    const size_t arr1Size = arr1.size();
    const size_t arr2Size = arr2.size();
    std::vector<std::vector<size_t>> dp(arr1Size + 1,
                                        std::vector<size_t>(arr2Size + 1, 0));
    for (size_t i = 1; i <= arr1Size; i++) {
      for (size_t j = 1; j <= arr2Size; j++) {
        if (arr1[i - 1] == arr2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    T lcs;
    lcs.reserve(dp[arr1Size][arr2Size]);
    size_t i = arr1Size;
    size_t j = arr2Size;
    while (i > 0 && j > 0) {
      if (arr1[i - 1] == arr2[j - 1]) {
        // Push back and reverse lcs later
        lcs.push_back(arr1[i - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    std::reverse(lcs.begin(), lcs.end());
    return lcs;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.shortestCommonSupersequence("abac", "cab");
}
