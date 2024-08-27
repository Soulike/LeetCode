/*
 * @lc app=leetcode id=1514 lang=cpp
 *
 * [1514] Path with Maximum Probability
 */
#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  double maxProbability(int n,
                        std::vector<std::vector<int>>& edges,
                        std::vector<double>& succProb,
                        int start_node,
                        int end_node) {
    double maxProbabilityFromStart[n];
    std::fill_n(maxProbabilityFromStart, n, 0);
    maxProbabilityFromStart[start_node] = 1;

    bool hasUpdate = true;
    while (hasUpdate) {
      hasUpdate = false;
      for (int i = 0; i < edges.size(); i++) {
        const int node1 = edges[i][0];
        const int node2 = edges[i][1];
        const double probability = succProb[i];

        if (maxProbabilityFromStart[node2] * probability >
            maxProbabilityFromStart[node1]) {
          maxProbabilityFromStart[node1] =
              maxProbabilityFromStart[node2] * probability;
          hasUpdate = true;
        }

        if (maxProbabilityFromStart[node1] * probability >
            maxProbabilityFromStart[node2]) {
          maxProbabilityFromStart[node2] =
              maxProbabilityFromStart[node1] * probability;
          hasUpdate = true;
        }
      }
    }

    return maxProbabilityFromStart[end_node];
  }
};
// @lc code=end
