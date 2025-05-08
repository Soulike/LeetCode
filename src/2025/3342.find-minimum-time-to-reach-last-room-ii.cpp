/*
 * @lc app=leetcode id=3342 lang=cpp
 *
 * [3342] Find Minimum Time to Reach Last Room II
 */

#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minTimeToReach(const std::vector<std::vector<int>>& moveTime) {
    const size_t kRowCount = moveTime.size();
    const size_t kColCount = moveTime[0].size();

    std::vector<std::vector<int>> minimum_reach_time(
        kRowCount, std::vector<int>(kColCount, INT_MAX));

    const auto vertex_info_compare = [](const VertexInfo& info1,
                                        const VertexInfo& info2) {
      return info1.reach_time > info2.reach_time;
    };
    std::priority_queue<VertexInfo, std::vector<VertexInfo>,
                        decltype(vertex_info_compare)>
        vertex_info_priority_queue(vertex_info_compare);
    vertex_info_priority_queue.push({0, 0, 0});

    while (!vertex_info_priority_queue.empty()) {
      const VertexInfo top_vertex_info = vertex_info_priority_queue.top();
      vertex_info_priority_queue.pop();
      if (top_vertex_info.reach_time >
          minimum_reach_time[top_vertex_info.x][top_vertex_info.y]) {
        continue;
      }

      if (top_vertex_info.x - 1 >= 0) {
        const int new_minimum_reach_time =
            std::max(top_vertex_info.reach_time,
                     moveTime[top_vertex_info.x - 1][top_vertex_info.y]) +
            (top_vertex_info.x + top_vertex_info.y) % 2 + 1;
        if (minimum_reach_time[top_vertex_info.x - 1][top_vertex_info.y] >
            new_minimum_reach_time) {
          minimum_reach_time[top_vertex_info.x - 1][top_vertex_info.y] =
              new_minimum_reach_time;
          vertex_info_priority_queue.push({top_vertex_info.x - 1,
                                           top_vertex_info.y,
                                           new_minimum_reach_time});
        }
      }
      if (top_vertex_info.x + 1 < kRowCount) {
        const int new_minimum_reach_time =
            std::max(top_vertex_info.reach_time,
                     moveTime[top_vertex_info.x + 1][top_vertex_info.y]) +
            (top_vertex_info.x + top_vertex_info.y) % 2 + 1;
        if (minimum_reach_time[top_vertex_info.x + 1][top_vertex_info.y] >
            new_minimum_reach_time) {
          minimum_reach_time[top_vertex_info.x + 1][top_vertex_info.y] =
              new_minimum_reach_time;
          vertex_info_priority_queue.push({top_vertex_info.x + 1,
                                           top_vertex_info.y,
                                           new_minimum_reach_time});
        }
      }
      if (top_vertex_info.y - 1 >= 0) {
        const int new_minimum_reach_time =
            std::max(top_vertex_info.reach_time,
                     moveTime[top_vertex_info.x][top_vertex_info.y - 1]) +
            (top_vertex_info.x + top_vertex_info.y) % 2 + 1;
        if (minimum_reach_time[top_vertex_info.x][top_vertex_info.y - 1] >
            new_minimum_reach_time) {
          minimum_reach_time[top_vertex_info.x][top_vertex_info.y - 1] =
              new_minimum_reach_time;
          vertex_info_priority_queue.push({top_vertex_info.x,
                                           top_vertex_info.y - 1,
                                           new_minimum_reach_time});
        }
      }
      if (top_vertex_info.y + 1 < kColCount) {
        const int new_minimum_reach_time =
            std::max(top_vertex_info.reach_time,
                     moveTime[top_vertex_info.x][top_vertex_info.y + 1]) +
            (top_vertex_info.x + top_vertex_info.y) % 2 + 1;
        if (minimum_reach_time[top_vertex_info.x][top_vertex_info.y + 1] >
            new_minimum_reach_time) {
          minimum_reach_time[top_vertex_info.x][top_vertex_info.y + 1] =
              new_minimum_reach_time;
          vertex_info_priority_queue.push({top_vertex_info.x,
                                           top_vertex_info.y + 1,
                                           new_minimum_reach_time});
        }
      }
    }

    return minimum_reach_time[kRowCount - 1][kColCount - 1];
  }

 private:
  class VertexInfo {
   public:
    int x;
    int y;
    int reach_time;
  };
};
// @lc code=end
