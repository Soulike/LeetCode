/*
 * @lc app=leetcode id=1298 lang=cpp
 *
 * [1298] Maximum Candies You Can Get from Boxes
 */

#include <queue>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxCandies(std::vector<int>& status,
                 const std::vector<int>& candies,
                 const std::vector<std::vector<int>>& keys,
                 const std::vector<std::vector<int>>& contained_boxes,
                 const std::vector<int>& initial_boxes) {
    static constexpr int BOX_STATUS_OPEN = 1;
    static constexpr int BOX_STATUS_CLOSED = 0;

    int candies_count = 0;

    std::unordered_set<int> available_keys;

    std::queue<int> queue;
    int open_boxes_count_in_queue = 0;

    for (const int box : initial_boxes) {
      if (status[box] == BOX_STATUS_OPEN) {
        open_boxes_count_in_queue++;
      } else if (available_keys.contains(box)) {
        open_boxes_count_in_queue++;
        status[box] = BOX_STATUS_OPEN;
        available_keys.erase(box);
      }
      queue.push(box);
    }

    while (!queue.empty() &&
           // Still have keys, or still have open boxes, may be able still to
           // open boxes in queue.
           (open_boxes_count_in_queue > 0 || !available_keys.empty())) {
      const int box = queue.front();
      queue.pop();

      if (status[box] == BOX_STATUS_OPEN) {
        open_boxes_count_in_queue--;
      }

      if (status[box] == BOX_STATUS_CLOSED) {
        if (!available_keys.contains(box)) {
          // Can not unlock it now. Push it back and handle next.
          queue.push(box);
          continue;
        }

        // Open the box.
        available_keys.erase(box);
        status[box] = BOX_STATUS_OPEN;
      }

      for (const int key : keys[box]) {
        available_keys.insert(key);
      }
      candies_count += candies[box];

      for (const int contained_box : contained_boxes[box]) {
        if (status[contained_box] == BOX_STATUS_OPEN) {
          open_boxes_count_in_queue++;
        } else if (available_keys.contains(contained_box)) {
          open_boxes_count_in_queue++;
          status[contained_box] = BOX_STATUS_OPEN;
          available_keys.erase(contained_box);
        }
        queue.push(contained_box);
      }
    }

    return candies_count;
  }
};
// @lc code=end
