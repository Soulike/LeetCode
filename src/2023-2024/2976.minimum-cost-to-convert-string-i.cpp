/*
 * @lc app=leetcode id=2976 lang=cpp
 *
 * [2976] Minimum Cost to Convert String I
 */
#include <algorithm>
#include <string>
#include <vector>

// @lc code=start

class Solution {
 public:
  long long minimumCost(std::string source,
                        std::string target,
                        std::vector<char>& original,
                        std::vector<char>& changed,
                        std::vector<int>& cost) {
    std::vector<Floyd::Edge> edges;
    const int EDGE_NUMBER = original.size();
    for (int i = 0; i < EDGE_NUMBER; i++) {
      edges.emplace_back(this->getNodeIndexFromChar(original[i]),
                         this->getNodeIndexFromChar(changed[i]), cost[i]);
    }

    Floyd floyd(26, edges);
    const int N = source.size();
    long long minCost = 0;
    for (int i = 0; i < N; i++) {
      const int cost =
          floyd.getMinCostBetweenNodes(this->getNodeIndexFromChar(source[i]),
                                       this->getNodeIndexFromChar(target[i]));
      if (cost == floyd.NOT_REACHABLE) {
        return -1;
      }
      minCost += cost;
    }

    return minCost;
  }

 private:
  int getNodeIndexFromChar(char c) { return c - 'a'; }

 private:
  class Floyd {
   public:
    struct Edge {
      int from;
      int to;
      int cost;
    };
    const int NOT_REACHABLE = INT_MAX;

   public:
    Floyd(int nodeCount, const std::vector<Edge>& edges)
        : nodeCount(nodeCount) {
      this->buildMatrix(edges);
    }
    ~Floyd() = default;

    std::vector<int> getReachableNodes(int startNode, int maxCost) const {
      std::vector<int> result;
      for (int to = 0; to < this->nodeCount; to++) {
        if (this->costMatrix[startNode][to] <= maxCost) {
          result.push_back(to);
        }
      }
      return result;
    }

    int getMinCostBetweenNodes(int from, int to) {
      return this->costMatrix[from][to];
    }

   private:
    void buildMatrix(const std::vector<Edge>& edges) {
      for (int from = 0; from < this->nodeCount; from++) {
        std::vector<int> tos(this->nodeCount, this->NOT_REACHABLE);
        this->costMatrix.push_back(std::move(tos));
        this->costMatrix[from][from] = 0;
      }

      for (const auto& edge : edges) {
        const int from = edge.from;
        const int to = edge.to;
        const int cost = edge.cost;

        if (this->costMatrix[from][to] == this->NOT_REACHABLE) {
          this->costMatrix[from][to] = cost;
        } else {
          this->costMatrix[from][to] =
              std::min(this->costMatrix[from][to], cost);
        }
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
            }
          }
        }
      }
    }

   private:
    const int nodeCount;
    std::vector<std::vector<int>> costMatrix;
  };
};
// @lc code=end
