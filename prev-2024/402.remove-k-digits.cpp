/*
 * @lc app=leetcode id=402 lang=cpp
 *
 * [402] Remove K Digits
 */
#include <algorithm>
#include <stack>
#include <string>

using std::stack;
using std::string;

// @lc code=start
class Solution {
 public:
  string removeKdigits(const string& num, int k) {
    if (k >= num.size()) {
      return "0";
    }
    if (k == 0) {
      return num;
    }

    string nonDecreasingStack;

    for (const char& digit : num) {
      if (nonDecreasingStack.empty()) {
        if (digit != '0' || nonDecreasingStack.size()) {
          nonDecreasingStack.push_back(digit);
        }
      } else {
        while (k > 0 && !nonDecreasingStack.empty() &&
               nonDecreasingStack.back() > digit) {
          nonDecreasingStack.pop_back();
          k--;
        }
        if (digit != '0' || nonDecreasingStack.size()) {
          nonDecreasingStack.push_back(digit);
        }
      }
    }

    while (!nonDecreasingStack.empty() && k > 0) {
      nonDecreasingStack.pop_back();
      k--;
    }

    string& result = nonDecreasingStack;
    if (result.empty()) {
      return "0";
    }
    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.removeKdigits("1432219", 3);
}