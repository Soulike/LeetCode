/*
 * @lc app=leetcode id=1334 lang=cpp
 *
 * [1334] Find the City With the Smallest Number of Neighbors at a Threshold
 * Distance
 */
#include <vector>

// @lc code=start
class Floyd {
 public:
  Floyd(int nodeCount, const std::vector<std::vector<int>>& edges)
      : nodeCount(nodeCount) {
    this->buildMatrix(edges);
  }
  ~Floyd() = default;

  std::vector<int> getReachableNodes(int startNode, int maxDistance) const {
    std::vector<int> result;
    for (int to = 0; to < this->nodeCount; to++) {
      if (this->costMatrix[startNode][to] <= maxDistance) {
        result.push_back(to);
      }
    }
    return result;
  }

 private:
  void buildMatrix(const std::vector<std::vector<int>>& edges) {
    for (int from = 0; from < this->nodeCount; from++) {
      std::vector<int> tos(this->nodeCount, this->NOT_REACHABLE);
      this->costMatrix.push_back(std::move(tos));
      this->costMatrix[from][from] = 0;
    }

    for (const auto& edge : edges) {
      const int from = edge[0];
      const int to = edge[1];
      const int cost = edge[2];

      this->costMatrix[from][to] = cost;
      this->costMatrix[to][from] = cost;
    }

    for (int mid = 0; mid < this->nodeCount; mid++) {
      for (int from = 0; from < this->nodeCount; from++) {
        for (int to = 0; to < this->nodeCount; to++) {
          if (this->costMatrix[from][mid] == this->NOT_REACHABLE ||
              this->costMatrix[mid][to] == this->NOT_REACHABLE) {
            continue;
          }

          const auto newCost =
              this->costMatrix[from][mid] + this->costMatrix[mid][to];
          if (this->costMatrix[from][to] == this->NOT_REACHABLE ||
              newCost < this->costMatrix[from][to]) {
            this->costMatrix[from][to] = newCost;
            this->costMatrix[to][from] = newCost;
          }
        }
      }
    }
  }

 private:
  const int nodeCount;
  std::vector<std::vector<int>> costMatrix;
  const int NOT_REACHABLE = INT_MAX;
};

class Solution {
 public:
  int findTheCity(int n,
                  std::vector<std::vector<int>>& edges,
                  int distanceThreshold) {
    const Floyd floyd(n, edges);
    int resultCity = -1;
    std::vector<int>::size_type resultCityReachableCount = n + 1;

    for (int i = 0; i < n; i++) {
      const std::vector<int>& reachableCities =
          floyd.getReachableNodes(i, distanceThreshold);
      if (reachableCities.size() <= resultCityReachableCount) {
        resultCityReachableCount = reachableCities.size();
        resultCity = i;
      }
    }

    return resultCity;
  }
};
// @lc code=end
