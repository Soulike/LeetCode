/*
 * @lc app=leetcode id=1061 lang=cpp
 *
 * [1061] Lexicographically Smallest Equivalent String
 */

#include <string>
#include <vector>

// @lc code=start
class UnionFindSet {
 public:
  explicit UnionFindSet(const size_t element_count)
      : parents_(element_count), min_elements_(element_count) {
    for (int i = 0; i < element_count; i++) {
      parents_[i] = i;
      min_elements_[i] = i;
    }
  }

  void Union(const size_t element1, const size_t element2) {
    const size_t root1 = Find(element1);
    const size_t root2 = Find(element2);
    parents_[root2] = root1;
    min_elements_[root1] = std::min(min_elements_[root1], min_elements_[root2]);
  }

  size_t GetMinElementInSet(const size_t element) const {
    const size_t root = Find(element);
    return min_elements_[root];
  }

 private:
  size_t Find(const size_t element) const {
    size_t current_element = element;
    while (parents_[current_element] != current_element) {
      parents_[current_element] = parents_[parents_[current_element]];
      current_element = parents_[current_element];
    }
    return current_element;
  }

 private:
  mutable std::vector<size_t> parents_;
  std::vector<size_t> min_elements_;
};

class Solution {
 public:
  std::string smallestEquivalentString(const std::string& s1,
                                       const std::string& s2,
                                       const std::string& baseStr) {
    UnionFindSet ufSet(26);
    for (int i = 0; i < s1.size(); i++) {
      ufSet.Union(s1[i] - 'a', s2[i] - 'a');
    }

    std::string result_str = baseStr;
    for (int i = 0; i < result_str.size(); i++) {
      result_str[i] = ufSet.GetMinElementInSet(result_str[i] - 'a') + 'a';
    }
    return result_str;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.smallestEquivalentString("parker", "morris", "parser");
}
