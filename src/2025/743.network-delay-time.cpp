/*
 * @lc app=leetcode id=743 lang=cpp
 *
 * [743] Network Delay Time
 */

#include <cinttypes>
#include <queue>
#include <vector>

// @lc code=start
class Dijkstra {
 public:
  using VertexType = std::uint64_t;
  using DistanceType = std::uint64_t;
  class Edge {
   public:
    Edge(const VertexType destination, const DistanceType distance)
        : destination_(destination), distance_(distance) {}

    VertexType GetDestination() const { return destination_; }
    DistanceType GetDistance() const { return distance_; }

   private:
    VertexType destination_;
    DistanceType distance_;
  };
  using AdjacenciesType = std::vector<Edge>;
  using AdjacencyListType = std::vector<AdjacenciesType>;

  static constexpr DistanceType UNREACHABLE = -1;

  Dijkstra(VertexType starting_vertex,
           std::uint64_t graph_vertex_number,
           const AdjacencyListType& adjacency_list);

  [[nodiscard]] DistanceType GetMinimumDistanceToVertex(
      VertexType vertex) const;
  [[nodiscard]] const std::vector<DistanceType>&
  GetMinimumDistanceToOtherVertexes() const;

 private:
  void BuildShortestDistanceToOtherVertexes(
      VertexType starting_vertex,
      std::uint64_t graph_vertex_number,
      const AdjacencyListType& adjacency_list);

  std::vector<DistanceType> minimum_distance_to_vertexes_;
};

class Solution {
 public:
  int networkDelayTime(const std::vector<std::vector<int>>& times,
                       const int n,
                       const int k) {
    Dijkstra::AdjacencyListType adjacency_list(n);
    for (const std::vector<int>& time : times) {
      const Dijkstra::VertexType from = time[0];
      const Dijkstra::VertexType to = time[1];
      const Dijkstra::DistanceType distance = time[2];
      adjacency_list[from - 1].push_back({to - 1, distance});
    }

    Dijkstra dijkstra(k - 1, n, adjacency_list);
    const auto& minimum_distance_to_vertexes =
        dijkstra.GetMinimumDistanceToOtherVertexes();
    for (const auto distance : minimum_distance_to_vertexes) {
      if (distance == Dijkstra::UNREACHABLE) {
        return -1;
      }
    }

    return static_cast<int>(
        *std::max_element(minimum_distance_to_vertexes.cbegin(),
                          minimum_distance_to_vertexes.cend()));
  }
};

Dijkstra::Dijkstra(const VertexType starting_vertex,
                   const std::uint64_t graph_vertex_number,
                   const AdjacencyListType& adjacency_list) {
  BuildShortestDistanceToOtherVertexes(starting_vertex, graph_vertex_number,
                                       adjacency_list);
}

void Dijkstra::BuildShortestDistanceToOtherVertexes(
    const VertexType starting_vertex,
    const std::uint64_t graph_vertex_number,
    const AdjacencyListType& adjacency_list) {
  minimum_distance_to_vertexes_.resize(graph_vertex_number, UNREACHABLE);
  minimum_distance_to_vertexes_[starting_vertex] = 0;

  static constexpr auto edge_greater = [](const Edge& edge1,
                                          const Edge& edge2) {
    return edge1.GetDistance() > edge2.GetDistance();
  };

  // The min heap contains virtual edges from starting vertex to other vertexes,
  // sorted by the distances of edges.
  std::priority_queue<Edge, std::vector<Edge>, decltype(edge_greater)> min_heap(
      edge_greater);
  min_heap.push({starting_vertex, 0});

  while (!min_heap.empty()) {
    const Edge min_distance_edge = min_heap.top();
    min_heap.pop();
    const DistanceType current_distance = min_distance_edge.GetDistance();
    const VertexType current_vertex = min_distance_edge.GetDestination();

    if (current_distance > minimum_distance_to_vertexes_[current_vertex]) {
      continue;
    }

    const auto& adjacencies = adjacency_list[current_vertex];
    for (const Edge& edge : adjacencies) {
      const DistanceType edge_distance = edge.GetDistance();
      const VertexType edge_destination = edge.GetDestination();

      const DistanceType new_distance = current_distance + edge_distance;
      if (new_distance < minimum_distance_to_vertexes_[edge_destination]) {
        minimum_distance_to_vertexes_[edge_destination] = new_distance;
        min_heap.push({edge_destination, new_distance});
      }
    }
  }
}

const std::vector<Dijkstra::DistanceType>&
Dijkstra::GetMinimumDistanceToOtherVertexes() const {
  return minimum_distance_to_vertexes_;
}

Dijkstra::DistanceType Dijkstra::GetMinimumDistanceToVertex(
    const VertexType vertex) const {
  return minimum_distance_to_vertexes_[vertex];
}

// @lc code=end

int main() {
  Solution sol;
  sol.networkDelayTime({{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}, 4, 2);
}
