/*
 * @lc app=leetcode id=1976 lang=cpp
 *
 * [1976] Number of Ways to Arrive at Destination
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
  [[nodiscard]] const std::vector<std::uint64_t>&
  GetPathNumberToVertexesWithMinimumDistance() const {
    return path_number_to_vertexes_with_minimum_distance_;
  }

 private:
  void BuildShortestDistanceToOtherVertexes(
      VertexType starting_vertex,
      std::uint64_t graph_vertex_number,
      const AdjacencyListType& adjacency_list);

  std::vector<DistanceType> minimum_distance_to_vertexes_;

  static constexpr std::uint64_t kPathNumberMod = 1e9 + 7;
  std::vector<std::uint64_t> path_number_to_vertexes_with_minimum_distance_;
};

class Solution {
 public:
  int countPaths(const int n, const std::vector<std::vector<int>>& roads) {
    Dijkstra::AdjacencyListType adjacency_list(n);
    for (const auto& road : roads) {
      const Dijkstra::VertexType vertex1 = road[0];
      const Dijkstra::VertexType vertex2 = road[1];
      const Dijkstra::DistanceType time = road[2];

      adjacency_list[vertex1].emplace_back(vertex2, time);
      adjacency_list[vertex2].emplace_back(vertex1, time);
    }

    Dijkstra dijkstra(0, n, adjacency_list);
    const auto& path_number_to_vertexes_with_minimum_distance =
        dijkstra.GetPathNumberToVertexesWithMinimumDistance();

    return static_cast<int>(
        path_number_to_vertexes_with_minimum_distance[n - 1]);
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

  path_number_to_vertexes_with_minimum_distance_.resize(graph_vertex_number, 0);
  path_number_to_vertexes_with_minimum_distance_[starting_vertex] = 1;

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

        path_number_to_vertexes_with_minimum_distance_[edge_destination] =
            path_number_to_vertexes_with_minimum_distance_[current_vertex];
      } else if (new_distance ==
                 minimum_distance_to_vertexes_[edge_destination]) {
        path_number_to_vertexes_with_minimum_distance_[edge_destination] +=
            path_number_to_vertexes_with_minimum_distance_[current_vertex];
        path_number_to_vertexes_with_minimum_distance_[edge_destination] %=
            kPathNumberMod;
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
  sol.countPaths(7, {{0, 6, 7},
                     {0, 1, 2},
                     {1, 2, 3},
                     {1, 3, 3},
                     {6, 3, 3},
                     {3, 5, 1},
                     {6, 5, 1},
                     {2, 5, 1},
                     {0, 4, 5},
                     {4, 6, 2}});
}
