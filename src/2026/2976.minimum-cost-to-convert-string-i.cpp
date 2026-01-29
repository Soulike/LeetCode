/*
 * @lc app=leetcode id=2976 lang=cpp
 *
 * [2976] Minimum Cost to Convert String I
 */

#include <optional>
#include <queue>
#include <string>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long minimumCost(const std::string& source,
                        const std::string& target,
                        const std::vector<char>& original,
                        const std::vector<char>& changed,
                        const std::vector<int>& costs) {
    std::vector<std::vector<Edge>> adjacent_table(26);
    for (int i = 0; i < original.size(); i++) {
      const int from = original[i] - 'a';
      const int to = changed[i] - 'a';
      const int cost = costs[i];
      adjacent_table[from].emplace_back(to, cost);
    }

    std::vector<std::optional<std::vector<std::int64_t>>> cache(26);

    std::int64_t min_cost = 0;

    for (int i = 0; i < source.size(); i++) {
      if (source[i] == target[i]) {
        continue;
      }
      const int from = source[i] - 'a';
      const int to = target[i] - 'a';
      if (!cache[from].has_value()) {
        std::vector<std::int64_t> distances =
            Dijkstra(26, from, adjacent_table);
        cache[from] = std::move(distances);
      }
      const std::int64_t cost = (*cache[from])[to];
      if (cost == INT64_MAX) {
        return -1;
      }
      min_cost += cost;
    }

    return min_cost;
  }

 private:
  struct Edge {
    int to;
    std::int64_t cost;
  };

  struct DijkstraNodeInfo {
    int node;
    std::int64_t min_dist_from_source;
  };

  static std::vector<std::int64_t> Dijkstra(
      const int node_count,
      const int source,
      const std::vector<std::vector<Edge>>& adjacent_table) {
    std::vector<std::int64_t> min_dist_from_source(node_count, INT64_MAX);
    min_dist_from_source[source] = 0;

    static constexpr auto pq_comp = [](const DijkstraNodeInfo& info1,
                                       const DijkstraNodeInfo& info2) {
      return info1.min_dist_from_source >
             info2.min_dist_from_source;  // Min heap;
    };
    std::priority_queue<DijkstraNodeInfo, std::vector<DijkstraNodeInfo>,
                        decltype(pq_comp)>
        pq(pq_comp);
    pq.push({source, 0});

    std::vector<bool> visited(node_count, false);

    while (!pq.empty()) {
      const DijkstraNodeInfo pq_top = pq.top();
      pq.pop();

      if (pq_top.min_dist_from_source > min_dist_from_source[pq_top.node]) {
        continue;
      }

      if (visited[pq_top.node]) {
        continue;
      }
      visited[pq_top.node] = true;

      const std::vector<Edge>& edges = adjacent_table[pq_top.node];
      for (const auto& [to, cost] : edges) {
        if (pq_top.min_dist_from_source + cost < min_dist_from_source[to]) {
          min_dist_from_source[to] = pq_top.min_dist_from_source + cost;
          pq.push({to, min_dist_from_source[to]});
        }
      }
    }

    return min_dist_from_source;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumCost("aaaabadaaa", "dbdadddbad",
                  {'c', 'a', 'c', 'a', 'a', 'b', 'b', 'b', 'd', 'd', 'c'},
                  {'a', 'c', 'b', 'd', 'b', 'c', 'a', 'd', 'c', 'b', 'd'},
                  {7, 8, 11, 9, 7, 6, 4, 6, 9, 5, 9});
}