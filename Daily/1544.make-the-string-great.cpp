/*
 * @lc app=leetcode id=1544 lang=cpp
 *
 * [1544] Make The String Great
 */
#include <cctype>
#include <string>
#include <vector>

using std::string;
using std::vector;

// @lc code=start
class Solution {
 public:
  string makeGood(const string& s) {
    string goodString;
    for (int i = 0; i < s.size(); i++) {
      const char& nextLetter = s[i];

      if (goodString.size() == 0) {
        goodString.push_back(nextLetter);
      } else {
        const char& currentLetter = goodString.back();
        if (currentLetter == nextLetter ||
            (std::toupper(currentLetter) != nextLetter &&
             std::tolower(currentLetter) != nextLetter)) {
          goodString.push_back(nextLetter);
        } else {
          goodString.pop_back();
        }
      }
    }
    return goodString;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.makeGood("abBAcC");
}