/*
 * @lc app=leetcode id=3600 lang=cpp
 *
 * [3600] Maximize Spanning Tree Stability with Upgrades
 */

#include <algorithm>
#include <cinttypes>
#include <vector>

// @lc code=start
class UnionFindSet {
 public:
  using ElementType = std::uintmax_t;
  using SizeType = std::vector<ElementType>::size_type;

  explicit UnionFindSet(SizeType element_number);
  UnionFindSet(const UnionFindSet& other) = default;
  UnionFindSet(UnionFindSet&& other) noexcept = default;
  ~UnionFindSet() = default;
  UnionFindSet& operator=(const UnionFindSet& other) = default;
  UnionFindSet& operator=(UnionFindSet&& other) noexcept;

  void AddSet();
  void Union(const ElementType& element1, const ElementType& element2);
  ElementType Find(const ElementType& element) const;

  [[nodiscard]] SizeType ElementNumber() const noexcept;
  [[nodiscard]] SizeType SetNumber() const noexcept;

  SizeType SetSizeOfElement(const ElementType& element) const noexcept;
  bool IsInOneSet(const ElementType& element1,
                  const ElementType& element2) const;
  bool IsSetRootElement(const ElementType& element) const;

 private:
  void CheckElement(const ElementType& element) const;

  SizeType set_number_;
  mutable std::vector<SizeType> parents_;
  std::vector<SizeType> set_size_;
};

class Solution {
 public:
  int maxStability(const int node_count,
                   const std::vector<std::vector<int>>& edges,
                   const int max_upgrade_count) {
    std::vector<Edge> must_edges_strength_desc;
    std::vector<Edge> optional_edges_strength_desc;
    int max_strength = INT_MIN;
    for (const std::vector<int>& edge : edges) {
      if (edge[3]) {
        // Must
        must_edges_strength_desc.push_back({edge[0], edge[1], edge[2]});
        max_strength = std::max(max_strength, edge[2]);
      } else {
        // Optional
        optional_edges_strength_desc.push_back({edge[0], edge[1], edge[2]});
        max_strength = std::max(max_strength, edge[2] * 2);
      }
    }

    static constexpr auto edge_comp = [](const Edge& edge1, const Edge& edge2) {
      return edge1.strength > edge2.strength;  // desc
    };

    std::ranges::sort(must_edges_strength_desc, edge_comp);
    std::ranges::sort(optional_edges_strength_desc, edge_comp);

    int left = 0;
    int right = max_strength + 1;

    while (left < right) {
      const int mid = (right - left) / 2 + left;
      const bool can_build = CanBuildSpanningTree(
          node_count, must_edges_strength_desc, optional_edges_strength_desc,
          max_upgrade_count, mid);
      if (can_build) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left - 1;
  }

 private:
  struct Edge {
    int node1;
    int node2;
    int strength;
  };

  static bool CanBuildSpanningTree(
      const int node_count,
      const std::vector<Edge>& must_edges_strength_desc,
      const std::vector<Edge>& optional_edges_strength_desc,
      const int max_upgrade_count,
      const int min_target_strength) {
    if (!must_edges_strength_desc.empty() &&
        must_edges_strength_desc.back().strength < min_target_strength) {
      // Must edges are excluded. Impossible.
      return false;
    }

    UnionFindSet uf_set(node_count);
    for (const Edge& must_edge : must_edges_strength_desc) {
      if (uf_set.IsInOneSet(must_edge.node1, must_edge.node2)) {
        // Must edges form a cycle. Impossible.
        return false;
      }
      uf_set.Union(must_edge.node1, must_edge.node2);
    }

    int upgrade_count = 0;

    for (const auto& [node1, node2, strength] : optional_edges_strength_desc) {
      if (strength * 2 < min_target_strength) {
        continue;
      }
      if (uf_set.IsInOneSet(node1, node2)) {
        continue;
      }
      if (strength < min_target_strength &&
          upgrade_count == max_upgrade_count) {
        break;
      }
      uf_set.Union(node1, node2);
      upgrade_count += (strength < min_target_strength);
    }

    return uf_set.SetNumber() == 1;
  }
};

UnionFindSet::UnionFindSet(const SizeType element_number)
    : set_number_(element_number),
      parents_(element_number),
      set_size_(element_number, 1) {
  for (int i = 0; i < element_number; i++) {
    parents_[i] = i;
  }
}

UnionFindSet::SizeType UnionFindSet::ElementNumber() const noexcept {
  return parents_.size();
}

UnionFindSet::SizeType UnionFindSet::SetNumber() const noexcept {
  return set_number_;
}

void UnionFindSet::AddSet() {
  set_number_++;
  const ElementType set_element = parents_.size();
  parents_.push_back(set_element);
  set_size_[set_element] = 1;
}

void UnionFindSet::Union(const ElementType& element1,
                         const ElementType& element2) {
  CheckElement(element1);
  CheckElement(element2);
  if (IsInOneSet(element1, element2)) {
    return;
  }
  const ElementType set_a = Find(element1);
  const ElementType set_b = Find(element2);
  set_number_--;
  parents_[set_b] = set_a;
  set_size_[set_a] += set_size_[set_b];
  set_size_[set_b] = 0;
}

bool UnionFindSet::IsInOneSet(const ElementType& element1,
                              const ElementType& element2) const {
  CheckElement(element1);
  CheckElement(element2);
  return Find(element1) == Find(element2);
}

UnionFindSet::ElementType UnionFindSet::Find(const ElementType& element) const {
  CheckElement(element);
  ElementType current_element = element;
  while (parents_[current_element] != current_element) {
    parents_[current_element] = parents_[parents_[current_element]];
    current_element = parents_[current_element];
  }
  return current_element;
}

UnionFindSet::SizeType UnionFindSet::SetSizeOfElement(
    const ElementType& element) const noexcept {
  CheckElement(element);
  const ElementType root = Find(element);
  return set_size_[root];
}

bool UnionFindSet::IsSetRootElement(const ElementType& element) const {
  CheckElement(element);
  return parents_[element] == element;
}

void UnionFindSet::CheckElement(const ElementType& element) const {
  if (element >= parents_.size()) {
    std::abort();
  }
}
// @lc code=end

int main() {
  Solution sol;
  sol.maxStability(2, {{0, 1, 87487, 0}}, 0);
}
