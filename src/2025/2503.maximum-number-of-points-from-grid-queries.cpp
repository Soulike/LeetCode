/*
 * @lc app=leetcode id=2503 lang=cpp
 *
 * [2503] Maximum Number of Points From Grid Queries
 */

#include <algorithm>
#include <cinttypes>
#include <cstdlib>
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
  std::vector<int> maxPoints(const std::vector<std::vector<int>>& grid,
                             const std::vector<int>& queries) {
    const size_t kGridRows = grid.size();
    const size_t kGridCols = grid[0].size();

    std::vector<Cell> cells(kGridRows * kGridCols);
    for (int i = 0; i < kGridRows; i++) {
      for (int j = 0; j < kGridCols; j++) {
        cells[i * kGridCols + j] = {i, j, grid[i][j]};
      }
    }
    std::sort(cells.begin(), cells.end(),
              [](const Cell& cell1, const Cell& cell2) {
                return cell1.value < cell2.value;
              });

    std::vector<QueryInfo> query_infos(queries.size());
    for (int i = 0; i < queries.size(); i++) {
      query_infos[i] = {i, queries[i]};
    }

    std::sort(query_infos.begin(), query_infos.end(),
              [](const QueryInfo& info1, const QueryInfo& info2) {
                return info1.query < info2.query;
              });

    int cell_index = 0;
    int query_info_index = 0;
    UnionFindSet union_find_set(kGridRows * kGridCols);
    std::vector<int> points(queries.size(), -1);

    while (cell_index < cells.size() && query_info_index < query_infos.size()) {
      const int query = query_infos[query_info_index].query;
      if (cells[cell_index].value >= query) {
        points[query_infos[query_info_index].index] =
            grid[0][0] < query
                ? static_cast<int>(union_find_set.SetSizeOfElement(0))
                : 0;
        query_info_index++;
        continue;
      }

      const auto& [x, y, value] = cells[cell_index];
      if (x - 1 >= 0 && grid[x - 1][y] < query) {
        union_find_set.Union((x - 1) * kGridCols + y, x * kGridCols + y);
      }
      if (x + 1 < kGridRows && grid[x + 1][y] < query) {
        union_find_set.Union((x + 1) * kGridCols + y, x * kGridCols + y);
      }
      if (y - 1 >= 0 && grid[x][y - 1] < query) {
        union_find_set.Union(x * kGridCols + (y - 1), x * kGridCols + y);
      }
      if (y + 1 < kGridCols && grid[x][y + 1] < query) {
        union_find_set.Union(x * kGridCols + (y + 1), x * kGridCols + y);
      }
      cell_index++;
    }

    while (query_info_index < query_infos.size()) {
      points[query_infos[query_info_index].index] =
          grid[0][0] < query_infos[query_info_index].query
              ? static_cast<int>(union_find_set.SetSizeOfElement(0))
              : 0;
      query_info_index++;
    }

    return points;
  }

 private:
  class Cell {
   public:
    int x;
    int y;
    int value;
  };

  class QueryInfo {
   public:
    int index;
    int query;
  };
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
  sol.maxPoints({{5, 2, 1}, {1, 1, 2}}, {3});
}
