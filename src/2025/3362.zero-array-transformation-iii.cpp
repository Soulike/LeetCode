/*
 * @lc app=leetcode id=3362 lang=cpp
 *
 * [3362] Zero Array Transformation III
 */

#include <algorithm>
#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int maxRemoval(std::vector<int>& nums,
                 std::vector<std::vector<int>>& queries) {
    std::ranges::sort(queries, [](const std::vector<int>& query1,
                                  const std::vector<int>& query2) {
      return query1[0] < query2[0];
    });
    // The queries available for current `nums[i]` but not used for decrement
    // yet. Max heap, since we want to use at lease queries.
    std::priority_queue<int> unused_query_rights{std::less<int>()};
    // The queries using for decrement nums.
    // Min heap, since we want to remove stale queries does not cover `nums[i]`.
    std::priority_queue<int, std::vector<int>, std::greater<int>>
        using_query_rights{std::greater<int>()};
    // Next query index.
    int query_index = 0;

    // Iterate through every nums[i], and try to use queries to make it 0.
    for (int i = 0; i < nums.size(); i++) {
      // Get all queries starts at `i`.
      while (query_index < queries.size() && queries[query_index][0] == i) {
        unused_query_rights.push(queries[query_index][1]);
        query_index++;
      }

      // Remove all using queries does not apply to `i`.
      while (!using_query_rights.empty() && using_query_rights.top() < i) {
        using_query_rights.pop();
      }

      // Check if the using queries are enough.
      nums[i] -= using_query_rights.size();

      while (nums[i] > 0 && !unused_query_rights.empty() &&
             unused_query_rights.top() >= i) {
        // Using queries not enough. Use unused queries until enough.
        using_query_rights.push(unused_query_rights.top());
        unused_query_rights.pop();
        nums[i]--;
      }
      if (nums[i] > 0) {
        // All available queries are used but still not enough, impossible.
        return -1;
      }
    }

    return unused_query_rights.size();
  }
};
// @lc code=end
