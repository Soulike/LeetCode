/*
 * @lc app=leetcode id=1208 lang=cpp
 *
 * [1208] Get Equal Substrings Within Budget
 */

#include <cmath>
#include <string>

using std::string;

// @lc code=start
class Solution {
 public:
  int equalSubstring(const string& s, const string& t, int maxCost) {
    const int N = s.size();
    int left = 0;
    int right = left;
    int maxLength = 0;
    int availableCost = maxCost;

    while (right < N) {
      int newCost = getCost(s[right], t[right]);
      if (newCost <= availableCost) {
        maxLength = std::max(maxLength, right - left + 1);
        right++;
        availableCost -= newCost;
      } else {
        int returnCost = getCost(s[left], t[left]);
        availableCost += returnCost;
        left++;
      }
    }

    return maxLength;
  }

 private:
  int getCost(char a, char b) { return std::abs(a - b); }
};
// @lc code=end