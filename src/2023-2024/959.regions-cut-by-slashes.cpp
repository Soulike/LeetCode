/*
 * @lc app=leetcode id=959 lang=cpp
 *
 * [959] Regions Cut By Slashes
 */
#include <string>
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
  int regionsBySlashes(std::vector<std::string>& grid) {
    const int M = grid.size();
    const int N = grid[0].size();

    union_find_set ufSet((M + 1) * (N + 1));

    // Connect the points surrounding the grid
    for (int j = 0; j < N; j++) {
      ufSet.do_union(getTopLeftPointIndex(M, N, 0, j),
                     getTopRightPointIndex(M, N, 0, j));
      ufSet.do_union(getBottomLeftPointIndex(M, N, M - 1, j),
                     getBottomRightPointIndex(M, N, M - 1, j));
    }

    for (int i = 0; i < M; i++) {
      ufSet.do_union(getTopLeftPointIndex(M, N, i, 0),
                     getBottomLeftPointIndex(M, N, i, 0));
      ufSet.do_union(getTopRightPointIndex(M, N, i, N - 1),
                     getBottomRightPointIndex(M, N, i, N - 1));
    }

    // Every new cycle indicates a new region
    // The points surrounding the grid already forms a cycle
    int regionsCount = 1;

    for (int i = 0; i < M; i++) {
      for (int j = 0; j < N; j++) {
        if (grid[i][j] == '/') {
          const int topRightIndex = getTopRightPointIndex(M, N, i, j);
          const int bottomLeftIndex = getBottomLeftPointIndex(M, N, i, j);
          if (ufSet.is_in_one_set(topRightIndex, bottomLeftIndex)) {
            regionsCount++;
          } else {
            ufSet.do_union(topRightIndex, bottomLeftIndex);
          }
        } else if (grid[i][j] == '\\') {
          const int bottomRightIndex = getBottomRightPointIndex(M, N, i, j);
          const int topLeftIndex = getTopLeftPointIndex(M, N, i, j);
          if (ufSet.is_in_one_set(bottomRightIndex, topLeftIndex)) {
            regionsCount++;
          } else {
            ufSet.do_union(bottomRightIndex, topLeftIndex);
          }
        }
      }
    }

    return regionsCount;
  }

 private:
  int getTopLeftPointIndex(int rowCount, int colCount, int x, int y) {
    return x * (colCount + 1) + y;
  }

  int getTopRightPointIndex(int rowCount, int colCount, int x, int y) {
    return getTopLeftPointIndex(rowCount, colCount, x, y) + 1;
  }

  int getBottomLeftPointIndex(int rowCount, int colCount, int x, int y) {
    return getTopLeftPointIndex(rowCount, colCount, x + 1, y);
  }

  int getBottomRightPointIndex(int rowCount, int colCount, int x, int y) {
    return getTopRightPointIndex(rowCount, colCount, x + 1, y);
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

union_find_set::union_find_set(union_find_set&& other) noexcept
    : _set_count(other._set_count), _parents(std::move(other._parents)) {}

union_find_set& union_find_set::operator=(const union_find_set& other) =
    default;

union_find_set& union_find_set::operator=(union_find_set&& other) noexcept =
    default;

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

int main() {
  std::vector<std::string> grid = {" /", "/ "};
  Solution sol;
  sol.regionsBySlashes(grid);
}
