/*
 * @lc app=leetcode id=2402 lang=cpp
 *
 * [2402] Meeting Rooms III
 */

#include <algorithm>
#include <cinttypes>
#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int mostBooked(const int n, std::vector<std::vector<int>>& meetings) {
    std::ranges::sort(meetings);

    const auto room_info_comp = [](const RoomInfo& info1,
                                   const RoomInfo& info2) {
      if (info1.free_time == info2.free_time) {
        return info1.index > info2.index;
      }
      return info1.free_time > info2.free_time;
    };
    std::priority_queue<RoomInfo, std::vector<RoomInfo>,
                        decltype(room_info_comp)>
        room_info_heap(room_info_comp);
    for (int room = 0; room < n; room++) {
      room_info_heap.emplace(room, 0);
    }

    std::vector<int> used_count_of_rooms(n, 0);

    for (const auto& meeting : meetings) {
      const int start_time = meeting[0];
      const int end_time = meeting[1];

      std::vector<RoomInfo> free_room_infos;
      while (!room_info_heap.empty() &&
             room_info_heap.top().free_time <= start_time) {
        RoomInfo free_room_info = room_info_heap.top();
        room_info_heap.pop();

        free_room_info.free_time = start_time;
        free_room_infos.emplace_back(free_room_info);
      }
      for (const RoomInfo& room_info : free_room_infos) {
        room_info_heap.emplace(room_info);
      }

      const auto [room, room_free_time] = room_info_heap.top();
      room_info_heap.pop();

      if (room_free_time <= start_time) {
        room_info_heap.emplace(room, end_time);
      } else {
        const std::int64_t time_shift = room_free_time - start_time;
        room_info_heap.emplace(room, end_time + time_shift);
      }

      used_count_of_rooms[room]++;
    }

    int max_use_count_of_room = 0;
    int max_use_count_room = n;
    for (int room = 0; room < n; room++) {
      if (used_count_of_rooms[room] > max_use_count_of_room) {
        max_use_count_room = room;
        max_use_count_of_room = used_count_of_rooms[room];
      }
    }

    return max_use_count_room;
  }

 private:
  struct RoomInfo {
    int index = -1;
    std::intmax_t free_time = -1;
  };
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<std::vector<int>> meetings = {
      {18, 19}, {3, 12}, {17, 19}, {2, 13}, {7, 10}};
  sol.mostBooked(4, meetings);
}
