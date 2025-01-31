/*
 * @lc app=leetcode id=827 lang=cpp
 *
 * [827] Making A Large Island
 */

#include <memory>
#include <unordered_set>
#include <vector>

// @lc code=start
class UnionFindSet {
 public:
  using ElementType = size_t;
  using SizeType = size_t;

  explicit UnionFindSet(const SizeType size)
      : parents_(std::make_unique<ElementType[]>(size)),
        set_size_(std::make_unique<SizeType[]>(size)),
        size_(size) {
    for (int i = 0; i < size; i++) {
      parents_[i] = i;
      set_size_[i] = 1;
    }
  }

  void doUnion(const ElementType element1, const ElementType element2) {
    const ElementType element1RootElement = doFind(element1);
    const ElementType element2RootElement = doFind(element2);
    if (element1RootElement == element2RootElement) {
      return;
    }
    parents_[element2RootElement] = element1RootElement;
    set_size_[element1RootElement] += set_size_[element2RootElement];
    set_size_[element2RootElement] = 0;
  }

  ElementType doFind(const ElementType element) {
    if (parents_[element] == element) {
      return element;
    }

    const ElementType rootElement = doFind(parents_[element]);
    parents_[element] = rootElement;
    return rootElement;
  }

  [[nodiscard]] SizeType sizeOfSet(const ElementType rootElement) const {
    return set_size_[rootElement];
  }

  [[nodiscard]] SizeType maxSizeOfSets() const {
    return *std::max_element(set_size_.get(), set_size_.get() + size_);
  }

 private:
  std::unique_ptr<ElementType[]> parents_;
  std::unique_ptr<SizeType[]> set_size_;
  SizeType size_;
};

class Solution {
 public:
  int largestIsland(const std::vector<std::vector<int>>& grid) {
    constexpr int kLand = 1;
    constexpr int kWater = 0;

    const MatrixSize kMatrixSize = {grid.size(), grid[0].size()};
    UnionFindSet ufSet(kMatrixSize.rowNumber * kMatrixSize.colNumber);

    for (int i = 0; i < kMatrixSize.rowNumber; i++) {
      for (int j = 0; j < kMatrixSize.colNumber; j++) {
        if (grid[i][j] == kWater) {
          continue;
        }

        const UnionFindSet::ElementType currentCoordinateElementType =
            coordinateToUnionFindSetElementType({i, j}, kMatrixSize);
        if (i - 1 >= 0 && grid[i - 1][j] == kLand) {
          ufSet.doUnion(
              currentCoordinateElementType,
              coordinateToUnionFindSetElementType({i - 1, j}, kMatrixSize));
        }
        if (i + 1 <= kMatrixSize.rowNumber - 1 && grid[i + 1][j] == kLand) {
          ufSet.doUnion(
              currentCoordinateElementType,
              coordinateToUnionFindSetElementType({i + 1, j}, kMatrixSize));
        }

        if (j - 1 >= 0 && grid[i][j - 1] == kLand) {
          ufSet.doUnion(
              currentCoordinateElementType,
              coordinateToUnionFindSetElementType({i, j - 1}, kMatrixSize));
        }
        if (j + 1 <= kMatrixSize.colNumber - 1 && grid[i][j + 1] == kLand) {
          ufSet.doUnion(
              currentCoordinateElementType,
              coordinateToUnionFindSetElementType({i, j + 1}, kMatrixSize));
        }
      }
    }

    size_t maxLandSizeAfterFlip = 0;

    for (int i = 0; i < kMatrixSize.rowNumber; i++) {
      for (int j = 0; j < kMatrixSize.colNumber; j++) {
        if (grid[i][j] == kLand) {
          continue;
        }

        std::unordered_set<UnionFindSet::ElementType> landRootElements;
        size_t landSizeAfterFlip = 1;

        if (i - 1 >= 0 && grid[i - 1][j] == kLand) {
          const auto landRootElement = ufSet.doFind(
              coordinateToUnionFindSetElementType({i - 1, j}, kMatrixSize));
          landRootElements.insert(landRootElement);
        }
        if (i + 1 <= kMatrixSize.rowNumber - 1 && grid[i + 1][j] == kLand) {
          const auto landRootElement = ufSet.doFind(
              coordinateToUnionFindSetElementType({i + 1, j}, kMatrixSize));
          landRootElements.insert(landRootElement);
        }

        if (j - 1 >= 0 && grid[i][j - 1] == kLand) {
          const auto landRootElement = ufSet.doFind(
              coordinateToUnionFindSetElementType({i, j - 1}, kMatrixSize));
          landRootElements.insert(landRootElement);
        }
        if (j + 1 <= kMatrixSize.colNumber - 1 && grid[i][j + 1] == kLand) {
          const auto landRootElement = ufSet.doFind(
              coordinateToUnionFindSetElementType({i, j + 1}, kMatrixSize));
          landRootElements.insert(landRootElement);
        }

        for (const auto landRootElement : landRootElements) {
          landSizeAfterFlip += ufSet.sizeOfSet(landRootElement);
        }

        maxLandSizeAfterFlip =
            std::max(maxLandSizeAfterFlip, landSizeAfterFlip);
      }
    }

    return static_cast<int>(
        std::max(maxLandSizeAfterFlip, ufSet.maxSizeOfSets()));
  }

 private:
  class Coordinate {
   public:
    int x;
    int y;
  };

  class MatrixSize {
   public:
    size_t rowNumber;
    size_t colNumber;
  };

  static UnionFindSet::ElementType coordinateToUnionFindSetElementType(
      const Coordinate& coordinate,
      const MatrixSize& matrixSize) {
    return coordinate.x * matrixSize.colNumber + coordinate.y;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.largestIsland({{1, 0, 1}, {0, 0, 0}, {0, 1, 1}});
}
