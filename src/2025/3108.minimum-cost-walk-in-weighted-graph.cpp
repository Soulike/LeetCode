/*
 * @lc app=leetcode id=3108 lang=cpp
 *
 * [3108] Minimum Cost Walk in Weighted Graph
 */

#include <vector>

// @lc code=start

class UnionFindSet {
 public:
  explicit UnionFindSet(const size_t n) : parents_(n) {
    for (int i = 0; i < n; i++) {
      parents_[i] = i;
    }
  }

  virtual ~UnionFindSet() = default;

  virtual void Union(const size_t element1, const size_t element2) {
    parents_[Find(element2)] = Find(element1);
  }

  virtual size_t Find(const size_t element) {
    size_t current_element = element;
    while (parents_[current_element] != current_element) {
      parents_[current_element] = parents_[parents_[current_element]];
      current_element = parents_[current_element];
    }
    return current_element;
  }

  virtual bool IsInOneSet(const size_t element1, const size_t element2) {
    return Find(element1) == Find(element2);
  }

 private:
  std::vector<size_t> parents_;
};

class BitwiseAndGraphUnionFindSet : private UnionFindSet {
 public:
  explicit BitwiseAndGraphUnionFindSet(const size_t n)
      : UnionFindSet(n), graph_component_walk_costs_(n) {
    for (int i = 0; i < n; i++) {
      graph_component_walk_costs_[i] = ~0;
    }
  }

  void MergeGraphComponents(const size_t component1_node,
                            const size_t component2_node,
                            const int cost) {
    const size_t set1_root_element = Find(component1_node);
    const size_t set2_root_element = Find(component2_node);
    if (!isInOneGraphComponent(component1_node, component2_node)) {
      graph_component_walk_costs_[set1_root_element] &=
          graph_component_walk_costs_[set2_root_element];
      graph_component_walk_costs_[set2_root_element] = 0;
    }
    UnionFindSet::Union(component1_node, component2_node);
    graph_component_walk_costs_[set1_root_element] &= cost;
  }

  size_t GetGraphComponentWalkCost(const size_t node) {
    const size_t root_element = Find(node);
    return graph_component_walk_costs_[root_element];
  }

  bool isInOneGraphComponent(const size_t node1, const size_t node2) {
    return UnionFindSet::IsInOneSet(node1, node2);
  }

 private:
  std::vector<size_t> graph_component_walk_costs_;
};

class Solution {
 public:
  std::vector<int> minimumCost(const int n,
                               const std::vector<std::vector<int>>& edges,
                               const std::vector<std::vector<int>>& queries) {
    BitwiseAndGraphUnionFindSet ufSet(n);

    for (const auto& edge : edges) {
      const auto node1 = edge[0];
      const auto node2 = edge[1];
      const auto cost = edge[2];
      ufSet.MergeGraphComponents(node1, node2, cost);
    }

    std::vector<int> queryResults(queries.size());

    for (int i = 0; i < queries.size(); i++) {
      const auto& query = queries[i];
      const auto node1 = query[0];
      const auto node2 = query[1];
      queryResults[i] =
          ufSet.isInOneGraphComponent(node1, node2)
              ? static_cast<int>(ufSet.GetGraphComponentWalkCost(node1))
              : -1;
    }

    return queryResults;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumCost(
      3, {{1, 0, 8}, {0, 2, 12}, {1, 0, 9}, {2, 0, 14}},
      {{1, 0}, {2, 0}, {1, 2}, {1, 2}, {2, 0}, {1, 2}, {2, 0}, {2, 1}});
}
