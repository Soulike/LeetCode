/*
 * @lc app=leetcode id=3650 lang=cpp
 *
 * [3650] Minimum Cost Path with Edge Reversals
 */

#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minCost(const int n, const std::vector<std::vector<int>>& edges) {
    static constexpr int kFrom = 0;
    static constexpr int kTo = 1;
    static constexpr int kWeight = 2;

    std::vector<std::vector<EdgeInfo>> adjacent_table(n);
    for (const auto& edge : edges) {
      const int from = edge[kFrom];
      const int to = edge[kTo];
      const int weight = edge[kWeight];
      const int backward_weight = 2 * weight;
      adjacent_table[from].emplace_back(to, weight);
      adjacent_table[to].emplace_back(from, backward_weight);
    }

    return Dijkstra(n, adjacent_table, 0, n - 1);
  }

 private:
  struct EdgeInfo {
    int to;
    int weight;
  };

  struct DijkstraNodeInfo {
    int node;
    int known_min_distance_from_source;
  };

  static int Dijkstra(const int n,
                      const std::vector<std::vector<EdgeInfo>>& adjacent_table,
                      const int source,
                      const int target) {
    std::vector<int> known_min_distance_from_source(n, INT_MAX);
    known_min_distance_from_source[source] = 0;

    static constexpr auto dijkstra_pq_comp = [](const DijkstraNodeInfo info1,
                                                const DijkstraNodeInfo info2) {
      return info1.known_min_distance_from_source >
             info2.known_min_distance_from_source;  // Min heap
    };
    std::priority_queue<DijkstraNodeInfo, std::vector<DijkstraNodeInfo>,
                        decltype(dijkstra_pq_comp)>
        pq(dijkstra_pq_comp);
    pq.push({source, 0});

    while (!pq.empty()) {
      const DijkstraNodeInfo from_node_info = pq.top();
      pq.pop();

      if (known_min_distance_from_source[from_node_info.node] <
          from_node_info.known_min_distance_from_source) {
        continue;
      }

      if (from_node_info.node == target) {
        return from_node_info.known_min_distance_from_source;
      }

      const std::vector<EdgeInfo>& edge_infos =
          adjacent_table[from_node_info.node];
      for (const auto& [to, weight] : edge_infos) {
        if (from_node_info.known_min_distance_from_source + weight <
            known_min_distance_from_source[to]) {
          known_min_distance_from_source[to] =
              from_node_info.known_min_distance_from_source + weight;
          pq.push({to, known_min_distance_from_source[to]});
        }
      }
    }

    return -1;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minCost(4, {{0, 1, 3}, {3, 1, 1}, {2, 3, 4}, {0, 2, 2}});
}