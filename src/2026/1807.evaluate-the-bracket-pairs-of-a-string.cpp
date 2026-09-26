/*
 * @lc app=leetcode id=1807 lang=cpp
 *
 * [1807] Evaluate the Bracket Pairs of a String
 */

#include <optional>
#include <string>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string evaluate(std::string s,
                       const std::vector<std::vector<std::string>>& knowledge) {
    std::unordered_map<std::string, std::string> key_to_knowledge;
    for (const std::vector<std::string>& key_knowledge : knowledge) {
      const std::string key = key_knowledge[0];
      const std::string value = key_knowledge[1];
      key_to_knowledge[key] = value;
    }

    std::string result;
    result.reserve(s.size());

    int last_end = -1;
    std::optional<Range> current_range;

    for (int i = 0; i < s.size(); i++) {
      const char c = s[i];
      if (c == '(') {
        current_range = {i, -1};
      } else if (c == ')') {
        result += Slice(s, last_end + 1, current_range->begin - 1);
        current_range->end = i;

        const std::string key =
            Slice(s, current_range->begin + 1, current_range->end - 1);
        const std::string value =
            key_to_knowledge.contains(key) ? key_to_knowledge.at(key) : "?";
        result += value;

        last_end = current_range->end;
        current_range = std::nullopt;
      }
    }

    result += Slice(s, last_end + 1, s.size() - 1);

    return result;
  }

 private:
  struct Range {
    int begin;
    int end;
  };

  // `end` included
  std::string Slice(const std::string& s, const int begin, const int end) {
    return s.substr(begin, end - begin + 1);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.evaluate("(name)is(age)yearsold", {{"name", "bob"}, {"age", "two"}});
}
