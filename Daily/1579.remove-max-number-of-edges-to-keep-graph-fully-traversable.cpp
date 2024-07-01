/*
 * @lc app=leetcode id=1579 lang=cpp
 *
 * [1579] Remove Max Number of Edges to Keep Graph Fully Traversable
 */

#include <vector>

// @lc code=start
class union_find_set {
 public:
  using element_type = unsigned long long;
  using size_type = std::vector<element_type>::size_type;

  explicit union_find_set(size_type n);
  union_find_set(const union_find_set& other);
  union_find_set(const union_find_set&& other);
  ~union_find_set() = default;
  size_type size() const noexcept;
  size_type set_count() noexcept;
  void do_union(const element_type& element1, const element_type& element2);
  bool is_in_one_set(const element_type& element1,
                     const element_type& element2);

 private:
  size_type _set_count;
  std::vector<size_type> _parents;

  element_type find(const element_type& element);
};

class Solution {
 public:
  int maxNumEdgesToRemove(int n, std::vector<std::vector<int>>& edges) {
    enum class EDGE_TYPE {
      ALICE_ONLY = 1,
      BOB_ONLY = 2,
      BOTH = 3,
    };
    std::vector<std::vector<int>> aliceOnlyEdges;
    std::vector<std::vector<int>> bobOnlyEdges;
    std::vector<std::vector<int>> bothEdges;

    for (const auto& edge : edges) {
      switch (edge[0]) {
        case static_cast<int>(EDGE_TYPE::ALICE_ONLY): {
          aliceOnlyEdges.push_back({edge[1] - 1, edge[2] - 1});
          break;
        }
        case static_cast<int>(EDGE_TYPE::BOB_ONLY): {
          bobOnlyEdges.push_back({edge[1] - 1, edge[2] - 1});
          break;
        }
        case static_cast<int>(EDGE_TYPE::BOTH): {
          bothEdges.push_back({edge[1] - 1, edge[2] - 1});
          break;
        }
      }
    }

    union_find_set bothUfSet(n);
    int removedEdgeNumber = 0;
    for (const auto& edge : bothEdges) {
      if (bothUfSet.is_in_one_set(edge[0], edge[1])) {
        removedEdgeNumber++;
      } else {
        bothUfSet.do_union(edge[0], edge[1]);
      }
    }

    union_find_set aliceUfSet = bothUfSet;
    for (const auto& edge : aliceOnlyEdges) {
      if (aliceUfSet.is_in_one_set(edge[0], edge[1])) {
        removedEdgeNumber++;
      } else {
        aliceUfSet.do_union(edge[0], edge[1]);
      }
    }

    union_find_set bobUfSet = std::move(bothUfSet);
    for (const auto& edge : bobOnlyEdges) {
      if (bobUfSet.is_in_one_set(edge[0], edge[1])) {
        removedEdgeNumber++;
      } else {
        bobUfSet.do_union(edge[0], edge[1]);
      }
    }

    if (aliceUfSet.set_count() > 1 || bobUfSet.set_count() > 1) {
      return -1;
    }

    return removedEdgeNumber;
  }
};

union_find_set::union_find_set(union_find_set::size_type n) {
  _parents.resize(n);
  for (int i = 0; i < n; i++) {
    _parents[i] = i;
  }
  _set_count = n;
}

union_find_set::union_find_set(const union_find_set& other)
    : _set_count(other._set_count), _parents(other._parents) {}

union_find_set::union_find_set(const union_find_set&& other)
    : _set_count(other._set_count), _parents(std::move(other._parents)) {}

union_find_set::size_type union_find_set::size() const noexcept {
  return _parents.size();
}

union_find_set::size_type union_find_set::set_count() noexcept {
  return _set_count;
}

void union_find_set::do_union(const element_type& element1,
                              const element_type& element2) {
  element_type set_a = find(element1);
  element_type set_b = find(element2);
  if (set_a != set_b) {
    _set_count--;
    _parents[set_b] = set_a;
  }
}

bool union_find_set::is_in_one_set(const element_type& element1,
                                   const element_type& element2) {
  return find(element1) == find(element2);
}

union_find_set::element_type union_find_set::find(const element_type& element) {
  element_type current_element = element;
  while (_parents[current_element] != current_element) {
    current_element = _parents[current_element];
    _parents[current_element] = find(_parents[current_element]);
  }
  return current_element;
}
// @lc code=end
