/*
 * @lc app=leetcode id=947 lang=cpp
 *
 * [947] Most Stones Removed with Same Row or Column
 */
#include <algorithm>
#include <unordered_map>
#include <vector>

// @lc code=start
class union_find_set {
 public:
  using element_type = unsigned long long;
  using size_type = std::vector<element_type>::size_type;

  explicit union_find_set(size_type n);
  union_find_set(const union_find_set& other);
  union_find_set(union_find_set&& other) noexcept;
  ~union_find_set() = default;

  union_find_set& operator=(const union_find_set& other);
  union_find_set& operator=(union_find_set&& other) noexcept;

  size_type size() const noexcept;
  size_type set_count() const noexcept;
  size_type set_size(const element_type& element);
  void do_union(const element_type& element1, const element_type& element2);
  bool is_in_one_set(const element_type& element1,
                     const element_type& element2);
  bool is_root_element(const element_type& element);

 private:
  size_type _set_count;
  std::vector<size_type> _parents;
  std::vector<size_type> _set_size;

  element_type find(const element_type& element);
};

class Solution {
 public:
  int removeStones(std::vector<std::vector<int>>& stones) {
    union_find_set ufSet(stones.size());
    std::unordered_map<int, int> rowToRootElement;
    std::unordered_map<int, int> colToRootElement;
    for (int i = 0; i < stones.size(); i++) {
      rowToRootElement[stones[i][0]] = i;
      colToRootElement[stones[i][1]] = i;
    }

    for (int i = 0; i < stones.size(); i++) {
      ufSet.do_union(i, rowToRootElement[stones[i][0]]);
      ufSet.do_union(i, colToRootElement[stones[i][1]]);
    }

    return stones.size() - ufSet.set_count();
  }
};

union_find_set::union_find_set(union_find_set::size_type n) {
  _parents.resize(n);
  _set_size.resize(n);
  for (int i = 0; i < n; i++) {
    _parents[i] = i;
    _set_size[i] = 1;
  }
  _set_count = n;
}

union_find_set::union_find_set(const union_find_set& other) = default;

union_find_set::union_find_set(union_find_set&& other) noexcept = default;

union_find_set& union_find_set::operator=(const union_find_set& other) =
    default;

union_find_set& union_find_set::operator=(union_find_set&& other) noexcept =
    default;

union_find_set::size_type union_find_set::size() const noexcept {
  return _parents.size();
}

union_find_set::size_type union_find_set::set_count() const noexcept {
  return _set_count;
}

union_find_set::size_type union_find_set::set_size(
    const union_find_set::element_type& element) {
  const element_type root = find(element);
  return _set_size[root];
}

void union_find_set::do_union(const element_type& element1,
                              const element_type& element2) {
  element_type set_a = find(element1);
  element_type set_b = find(element2);
  if (set_a != set_b) {
    _set_count--;
    _parents[set_b] = set_a;
    _set_size[set_a] += _set_size[set_b];
    _set_size[set_b] = 0;
  }
}

bool union_find_set::is_in_one_set(const element_type& element1,
                                   const element_type& element2) {
  return find(element1) == find(element2);
}

bool union_find_set::is_root_element(const element_type& element) {
  return find(element) == element;
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

int main() {
  std::vector<std::vector<int>> stones = {{0, 0}, {0, 1}, {1, 0},
                                          {1, 2}, {2, 1}, {2, 2}};
  Solution sol;
  sol.removeStones(stones);
}
