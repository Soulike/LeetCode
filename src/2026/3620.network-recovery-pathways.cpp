/*
 * @lc app=leetcode id=3620 lang=cpp
 *
 * [3620] Network Recovery Pathways
 */

#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int findMaxPathScore(const std::vector<std::vector<int>>& edges,
                       const std::vector<bool>& online,
                       const long long k) {
    const int node_count = online.size();

    std::vector<std::vector<Path>> adjacency_table(node_count);
    int min_distance = INT_MAX;
    int max_distance = INT_MIN;
    for (const std::vector<int>& edge : edges) {
      const int from = edge[0];
      const int to = edge[1];
      const int distance = edge[2];

      if (!online[from] || !online[to]) {
        continue;
      }

      adjacency_table[from].push_back({to, distance});
      min_distance = std::min(min_distance, distance);
      max_distance = std::max(max_distance, distance);
    }

    if (!IsPossible(node_count, adjacency_table, 0, k)) {
      // Unreachable even with all edges.
      return -1;
    }

    // Binary search upper boundary
    int left = min_distance;
    int right = max_distance + 1;
    while (left < right) {
      const int mid = (right - left) / 2 + left;
      if (IsPossible(node_count, adjacency_table, mid, k)) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left - 1;
  }

 private:
  struct Node {
    int index;
    long long known_min_distance;
  };

  struct Path {
    int target_index;
    int distance;
  };

  // Is it possible to find a path from 0 to n - 1 with min_allowed_distance and
  // max_total_distance
  static bool IsPossible(const int node_count,
                         const std::vector<std::vector<Path>>& adjacency_table,
                         const int min_allowed_distance,
                         const long long max_total_distance) {
    std::vector<long long> min_distances(node_count, LONG_LONG_MAX);

    static constexpr auto comp = [](const Node node1, const Node node2) {
      return node1.known_min_distance > node2.known_min_distance;
    };
    std::priority_queue<Node, std::vector<Node>, decltype(comp)> min_heap(comp);

    min_distances[0] = 0;
    min_heap.push({0, 0});

    while (!min_heap.empty()) {
      const auto [index, known_min_distance] = min_heap.top();
      min_heap.pop();
      if (known_min_distance > min_distances[index]) {
        continue;
      }

      if (index == node_count - 1) {
        return known_min_distance <= max_total_distance;
      }

      for (const auto [adjacent_node_index, distance] :
           adjacency_table[index]) {
        if (distance < min_allowed_distance ||
            known_min_distance + distance > max_total_distance) {
          continue;
        }

        if (known_min_distance + distance <
            min_distances[adjacent_node_index]) {
          min_distances[adjacent_node_index] = known_min_distance + distance;
          min_heap.push(
              {adjacent_node_index, min_distances[adjacent_node_index]});
        }
      }
    }

    return false;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.findMaxPathScore({{0, 1, 8}}, {true, true}, 11);
}
