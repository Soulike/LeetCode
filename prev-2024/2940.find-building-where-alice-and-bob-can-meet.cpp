/*
 * @lc app=leetcode id=2940 lang=cpp
 *
 * [2940] Find Building Where Alice and Bob Can Meet
 */
#include <algorithm>
#include <utility>
#include <vector>

// @lc code=start
class Solution {
 private:
  class TransformedQuery {
   public:
    int originalQueryIndex;
    int greaterThanIndex;
    int greaterThanHeight;
  };

 public:
  std::vector<int> leftmostBuildingQueries(
      const std::vector<int>& heights,
      std::vector<std::vector<int>>& queries) {
    std::vector<int> leftMostBuildings(queries.size(), -1);
    std::vector<TransformedQuery> transformedQueries;
    for (int i = 0; i < queries.size(); i++) {
      std::vector<int> query = queries[i];
      if (query[0] > query[1]) {
        std::swap(query[0], query[1]);
      }
      const int aliceBuilding = query[0];
      const int bobBuilding = query[1];

      if (aliceBuilding == bobBuilding ||
          heights[aliceBuilding] < heights[bobBuilding]) {
        leftMostBuildings[i] = bobBuilding;
        continue;
      }

      // Now `heights[aliceBuilding] >= heights[bobBuilding]`.
      // As `aliceBuilding < bobBuilding`, we need to find the first `building >
      // bobBuilding` and `heights[building] > heights[aliceBuilding]`
      transformedQueries.emplace_back(i, bobBuilding, heights[aliceBuilding]);
    }

    std::ranges::sort(transformedQueries, [](const TransformedQuery& query1,
                                             const TransformedQuery& query2) {
      return query1.greaterThanIndex > query2.greaterThanIndex;
    });

    std::vector<int> nonIncreasingHeightsIndexStack;
    int currentTransformedQueryIndex = 0;
    for (int i = static_cast<int>(heights.size()) - 1; i >= 0; i--) {
      if (currentTransformedQueryIndex == transformedQueries.size()) {
        break;
      }
      while (!nonIncreasingHeightsIndexStack.empty() &&
             heights[nonIncreasingHeightsIndexStack.back()] < heights[i]) {
        nonIncreasingHeightsIndexStack.pop_back();
      }
      nonIncreasingHeightsIndexStack.push_back(i);

      TransformedQuery& currentTransformedQuery =
          transformedQueries[currentTransformedQueryIndex];
      while (i == currentTransformedQuery.greaterThanIndex) {
        const int nonIncreasingHeightsIndexStackIndex =
            boundaryBinarySearch(nonIncreasingHeightsIndexStack, heights,
                                 currentTransformedQuery.greaterThanHeight);
        if (nonIncreasingHeightsIndexStackIndex != -1) {
          const int buildingIndex = nonIncreasingHeightsIndexStack
              [nonIncreasingHeightsIndexStackIndex];
          leftMostBuildings[currentTransformedQuery.originalQueryIndex] =
              buildingIndex;
        }
        currentTransformedQueryIndex++;
        if (currentTransformedQueryIndex == transformedQueries.size()) {
          break;
        }
        currentTransformedQuery =
            transformedQueries[currentTransformedQueryIndex];
      }
    }

    return leftMostBuildings;
  }

 private:
  static int boundaryBinarySearch(
      const std::vector<int>& nonIncreasingHeightsIndexStack,
      const std::vector<int>& heights,
      const int greaterThanHeight) {
    int leftIndex = 0;
    int rightIndex =
        static_cast<int>(nonIncreasingHeightsIndexStack.size()) - 1;

    while (leftIndex <= rightIndex) {
      const int midIndex = (rightIndex - leftIndex) / 2 + leftIndex;
      const int midIndexHeightIndex = nonIncreasingHeightsIndexStack[midIndex];
      if (heights[midIndexHeightIndex] <= greaterThanHeight) {
        rightIndex = midIndex - 1;
      } else {
        if (midIndex == nonIncreasingHeightsIndexStack.size() - 1 ||
            heights[nonIncreasingHeightsIndexStack[midIndex + 1]] <=
                greaterThanHeight) {
          return midIndex;
        }
        leftIndex = midIndex + 1;
      }
    }

    return -1;
  }
};
// @lc code=end

int main() {
  std::vector<int> heights = {3, 1, 2, 4};
  std::vector<std::vector<int>> queries = {{0, 1}};
  Solution sol;
  sol.leftmostBuildingQueries(heights, queries);
}
