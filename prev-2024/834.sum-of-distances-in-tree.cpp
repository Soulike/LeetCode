/*
 * @lc app=leetcode id=834 lang=cpp
 *
 * [834] Sum of Distances in Tree
 */
#include <unordered_map>
#include <vector>

using std::unordered_map;
using std::vector;

// @lc code=start

class Solution {
 public:
  vector<int> sumOfDistancesInTree(int n, vector<vector<int>>& edges) {
    init(n, edges);
    calculateNodeNumberWithZeroAsRoot(0, -1);
    calculateSumOfDistanceForRoot(0, -1);
    return sumOfDistanceForRoot;
  }

 private:
  unordered_map<int, vector<int>> neighbors;
  vector<int> sumOfDistanceForRoot;
  // The number of subtree nodes when 0 is the tree root
  vector<int> nodeNumberWithZeroAsRoot;
  int n;

  void init(int n, const vector<vector<int>>& edges) {
    sumOfDistanceForRoot.resize(n);
    nodeNumberWithZeroAsRoot.resize(n);
    for (const auto& edge : edges) {
      neighbors[edge[0]].push_back(edge[1]);
      neighbors[edge[1]].push_back(edge[0]);
    }
    this->n = n;
  }

  void calculateNodeNumberWithZeroAsRoot(int root,
                                         int parent  // prevent revisiting
  ) {
    for (const auto& neighbor : neighbors[root]) {
      if (neighbor == parent) {
        continue;
      }
      const int child = neighbor;
      calculateNodeNumberWithZeroAsRoot(child, root);
      nodeNumberWithZeroAsRoot[root] += nodeNumberWithZeroAsRoot[child];
      // We first calculate sum of distances with 0 as root
      sumOfDistanceForRoot[root] +=
          sumOfDistanceForRoot[child] + nodeNumberWithZeroAsRoot[child];
    }
    nodeNumberWithZeroAsRoot[root]++;
  }

  void calculateSumOfDistanceForRoot(int root, int parent) {
    for (const auto& neighbor : neighbors[root]) {
      if (neighbor == parent) {
        continue;
      }
      const int child = neighbor;
      sumOfDistanceForRoot[child] = sumOfDistanceForRoot[root] -
                                    nodeNumberWithZeroAsRoot[child] +
                                    (n - nodeNumberWithZeroAsRoot[child]);
      calculateSumOfDistanceForRoot(child, root);
    }
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<vector<int>> edges = {{0, 1}, {0, 2}, {2, 3}, {2, 4}, {2, 5}};
  sol.sumOfDistancesInTree(6, edges);
}