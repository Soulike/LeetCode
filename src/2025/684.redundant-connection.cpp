/*
 * @lc app=leetcode id=684 lang=cpp
 *
 * [684] Redundant Connection
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class UnionFindSet {
 public:
  UnionFindSet(const size_t size) {
    parents_.resize(size);
    for (int i = 0; i < parents_.size(); i++) {
      parents_[i] = i;
    }
  }

  void doUnion(const size_t element1, const size_t element2) {
    const size_t element1Set = doFind(element1);
    const size_t element2Set = doFind(element2);
    parents_[element2Set] = element1Set;
  }

  bool isInSameSet(const size_t element1, const size_t element2) {
    return doFind(element1) == doFind(element2);
  }

 private:
  std::vector<std::uint32_t> parents_;

  size_t doFind(const size_t element) {
    if (parents_[element] == element) {
      return element;
    }

    const size_t rootElement = doFind(parents_[element]);
    parents_[element] = rootElement;
    return rootElement;
  }
};

class Solution {
 public:
  std::vector<int> findRedundantConnection(
      const std::vector<std::vector<int>>& edges) {
    const size_t N = edges.size();

    UnionFindSet ufSet(N);
    std::vector<int> result;

    for (const auto& edge : edges) {
      const int a = edge[0] - 1;
      const int b = edge[1] - 1;

      if (ufSet.isInSameSet(a, b)) {
        result = {a + 1, b + 1};
      } else {
        ufSet.doUnion(a, b);
      }
    }

    return result;
  }
};
// @lc code=end
