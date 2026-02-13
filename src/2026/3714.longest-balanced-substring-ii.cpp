/*
 * @lc app=leetcode id=3714 lang=cpp
 *
 * [3714] Longest Balanced Substring II
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int longestBalanced(const std::string& s) {
    std::vector<int> a_prefix_count(s.size() + 1);
    std::vector<int> b_prefix_count(s.size() + 1);
    std::vector<int> c_prefix_count(s.size() + 1);

    for (int i = 0; i < s.size(); i++) {
      a_prefix_count[i + 1] = a_prefix_count[i] + (s[i] == 'a');
      b_prefix_count[i + 1] = b_prefix_count[i] + (s[i] == 'b');
      c_prefix_count[i + 1] = c_prefix_count[i] + (s[i] == 'c');
    }

    // For s[i] ~ s[j] to be balanced,
    //    a[j+1] - a[i]
    // == b[j+1] - b[i]
    // == c[j+1] - c[i].
    // =>
    // a[j+1] - b[j+1] == a[i] - b[i]
    // and
    // a[j+1] - c[j+1] == a[i] - c[i]
    // So we count a - b and a - c for each index. If we got the same pair, we
    // have a balanced string.

    int longest_size = 1;
    std::unordered_map<std::string, int> prefix_diff_to_index;
    prefix_diff_to_index.insert({"0,0", -1});
    for (int i = 0; i < s.size(); i++) {
      const std::string prefix_diff =
          std::to_string(a_prefix_count[i + 1] - b_prefix_count[i + 1]) + "," +
          std::to_string(a_prefix_count[i + 1] - c_prefix_count[i + 1]);
      if (prefix_diff_to_index.contains(prefix_diff)) {
        longest_size =
            std::max(longest_size, i - prefix_diff_to_index.at(prefix_diff));
      } else {
        prefix_diff_to_index[prefix_diff] = i;
      }
    }

    return std::max({LongestOneLetter(s), LongestTwoLetters(s), longest_size});
  }

 private:
  static int LongestOneLetter(const std::string& s) {
    char current_letter = s[0];
    int current_size = 0;
    int longest_size = 0;
    for (int i = 0; i < s.size(); i++) {
      if (s[i] == current_letter) {
        current_size++;
      } else {
        longest_size = std::max(current_size, longest_size);
        current_size = 1;
        current_letter = s[i];
      }
    }

    longest_size = std::max(current_size, longest_size);
    return longest_size;
  }

  static int LongestTwoLetters(const std::string& s) {
    int longest_size = 0;
    const char pairs[3][2] = {{'a', 'b'}, {'b', 'c'}, {'a', 'c'}};

    for (const auto& [c1, c2] : pairs) {
      std::unordered_map<int, int> balance_to_index;
      balance_to_index[0] = -1;
      int balance = 0;
      for (int i = 0; i < s.size(); i++) {
        if (s[i] == c1) {
          balance++;
        } else if (s[i] == c2) {
          balance--;
        } else {
          balance = 0;
          balance_to_index.clear();
          balance_to_index[0] = i;
          continue;
        }
        if (balance_to_index.contains(balance)) {
          longest_size = std::max(longest_size, i - balance_to_index[balance]);
        } else {
          balance_to_index[balance] = i;
        }
      }
    }

    return longest_size;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.longestBalanced("cabbacbc");
}