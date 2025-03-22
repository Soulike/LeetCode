/*
 * @lc app=leetcode id=2685 lang=cpp
 *
 * [2685] Count the Number of Complete Components
 */

#include <vector>

// @lc code=start
class UnionFindSet {
 public:
  using ElementType = size_t;
  using SizeType = size_t;

  explicit UnionFindSet(const SizeType n) : parents_(n), set_size_(n, 1) {
    for (SizeType i = 0; i < n; i++) {
      parents_[i] = i;
    }
  }

  void Union(const ElementType element1, const ElementType element2) {
    if (IsInOneSet(element1, element2)) {
      return;
    }

    const ElementType element1_root = Find(element1);
    const ElementType element2_root = Find(element2);

    parents_[element2_root] = parents_[element1_root];

    set_size_[element1_root] += set_size_[element2_root];
    set_size_[element2_root] = 0;
  }

  ElementType Find(const ElementType element) const {
    ElementType current_element = element;
    while (parents_[current_element] != current_element) {
      parents_[current_element] = parents_[parents_[current_element]];
      current_element = parents_[current_element];
    }

    return current_element;
  }

  SizeType GetElementSetSize(const ElementType element) const {
    const ElementType element_root = Find(element);
    return set_size_[element_root];
  }

  bool IsInOneSet(const ElementType element1,
                  const ElementType element2) const {
    const ElementType element1_root = Find(element1);
    const ElementType element2_root = Find(element2);
    return element1_root == element2_root;
  }

  [[nodiscard]] std::vector<ElementType> GetRootElements() const {
    std::vector<ElementType> root_elements;
    for (int i = 0; i < parents_.size(); i++) {
      if (parents_[i] == i) {
        root_elements.push_back(i);
      }
    }

    return root_elements;
  }

 private:
  mutable std::vector<ElementType> parents_;
  std::vector<SizeType> set_size_;
};

class GraphComponents : private UnionFindSet {
 public:
  using NodeType = ElementType;

  explicit GraphComponents(const SizeType n)
      : UnionFindSet(n), component_edge_number_(n, 0) {}

  void Connect(const NodeType node1, const NodeType node2) {
    const NodeType node1_root_node = Find(node1);
    const NodeType node2_root_node = Find(node2);

    if (IsInOneComponent(node1, node2)) {
      component_edge_number_[node1_root_node]++;
      return;
    }

    component_edge_number_[node1_root_node] +=
        component_edge_number_[node2_root_node];
    component_edge_number_[node1_root_node]++;
    component_edge_number_[node2_root_node] = 0;

    Union(node1, node2);
  }

  SizeType GetNodeComponentNodeNumber(const NodeType node) const {
    return GetElementSetSize(node);
  }

  SizeType GetNodeComponentEdgeNumber(const NodeType node) const {
    const NodeType root_node = Find(node);
    return component_edge_number_[root_node];
  }

  SizeType GetCompleteComponentNumber() const {
    const std::vector<ElementType> component_root_nodes = GetRootElements();
    SizeType complete_component_number = 0;
    for (const auto root_node : component_root_nodes) {
      complete_component_number += IsInCompleteComponent(root_node);
    }

    return complete_component_number;
  }

  bool IsInOneComponent(const NodeType node1, const NodeType node2) const {
    return IsInOneSet(node1, node2);
  }

 private:
  bool IsInCompleteComponent(const NodeType node) const {
    const SizeType node_component_node_number =
        GetNodeComponentNodeNumber(node);
    const SizeType node_component_edge_number =
        GetNodeComponentEdgeNumber(node);

    return node_component_edge_number ==
           GetEdgeNumberIfIsCompleteComponent(node_component_node_number);
  }

  static SizeType GetEdgeNumberIfIsCompleteComponent(
      const SizeType component_node_number) {
    if (component_node_number % 2) {
      return (component_node_number - 1) / 2 * component_node_number;
    }
    return component_node_number / 2 * (component_node_number - 1);
  }

  std::vector<SizeType> component_edge_number_;
};

class Solution {
 public:
  int countCompleteComponents(const int n,
                              const std::vector<std::vector<int>>& edges) {
    GraphComponents graph_components(n);
    for (const auto& edge : edges) {
      const int node1 = edge[0];
      const int node2 = edge[1];
      graph_components.Connect(node1, node2);
    }

    return static_cast<int>(graph_components.GetCompleteComponentNumber());
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countCompleteComponents(6, {{0, 1}, {0, 2}, {1, 2}, {3, 4}});
}
