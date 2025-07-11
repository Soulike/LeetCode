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

    std::priority_queue<int, std::vector<int>, std::greater<>>
        free_rooms_min_heap;
    for (int room = 0; room < n; room++) {
      free_rooms_min_heap.push(room);
    }

    const auto busy_room_info_comp = [](const BusyRoomInfo& info1,
                                        const BusyRoomInfo& info2) {
      if (info1.free_time == info2.free_time) {
        return info1.index > info2.index;
      }
      return info1.free_time > info2.free_time;
    };
    std::priority_queue<BusyRoomInfo, std::vector<BusyRoomInfo>,
                        decltype(busy_room_info_comp)>
        busy_room_info_min_heap(busy_room_info_comp);

    std::vector<int> used_count_of_rooms(n);

    for (const auto& meeting : meetings) {
      const int start_time = meeting[0];
      const int end_time = meeting[1];

      while (!busy_room_info_min_heap.empty() &&
             busy_room_info_min_heap.top().free_time <= start_time) {
        free_rooms_min_heap.push(busy_room_info_min_heap.top().index);
        busy_room_info_min_heap.pop();
      }

      if (free_rooms_min_heap.empty()) [[unlikely]] {
        // Have no free room. Get one from busy room and delay current meeting.
        BusyRoomInfo first_freed_busy_room_info = busy_room_info_min_heap.top();
        busy_room_info_min_heap.pop();

        const std::intmax_t delay_time =
            first_freed_busy_room_info.free_time - start_time;

        first_freed_busy_room_info.free_time = end_time + delay_time;
        busy_room_info_min_heap.emplace(first_freed_busy_room_info);

        used_count_of_rooms[first_freed_busy_room_info.index]++;
      } else {
        const int free_room = free_rooms_min_heap.top();
        free_rooms_min_heap.pop();
        busy_room_info_min_heap.emplace(free_room, end_time);

        used_count_of_rooms[free_room]++;
      }
    }

    return static_cast<int>(std::ranges::max_element(used_count_of_rooms) -
                            used_count_of_rooms.cbegin());
  }

 private:
  struct BusyRoomInfo {
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
