/*
 * @lc app=leetcode id=2492 lang=cpp
 *
 * [2492] Minimum Score of a Path Between Two Cities
 */

#include <vector>

// @lc code=start

class UFSet {
 public:
  explicit UFSet(const int element_count) {
    parents.resize(element_count);
    for (int i = 0; i < parents.size(); i++) {
      parents[i] = i;
    }
  }

  void Union(const int element1, const int element2) {
    parents[Find(element2)] = parents[Find(element1)];
  }

  int Find(int element) {
    while (parents[element] != element) {
      parents[element] = parents[parents[element]];
      element = parents[element];
    }
    return element;
  }

  bool InOneSet(const int element1, const int element2) {
    return Find(element1) == Find(element2);
  }

 private:
  std::vector<int> parents;
};

class Solution {
 public:
  int minScore(const int n, const std::vector<std::vector<int>>& roads) {
    UFSet uf_set(n);

    for (const std::vector<int>& road : roads) {
      const int node1 = road[0] - 1;
      const int node2 = road[1] - 1;
      uf_set.Union(node1, node2);
    }

    int min_distance = INT_MAX;
    for (const std::vector<int>& road : roads) {
      const int node1 = road[0] - 1;
      const int distance = road[2];

      if (!uf_set.InOneSet(node1, 0)) {
        continue;
      }

      min_distance = std::min(min_distance, distance);
    }

    return min_distance;
  }
};
// @lc code=end
