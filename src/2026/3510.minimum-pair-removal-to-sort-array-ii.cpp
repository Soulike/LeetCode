/*
 * @lc app=leetcode id=3510 lang=cpp
 *
 * [3510] Minimum Pair Removal to Sort Array II
 */

#include <algorithm>
#include <memory>
#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumPairRemoval(const std::vector<int>& nums) {
    static constexpr auto pair_info_comp = [](const PairInfo& info1,
                                              const PairInfo& info2) {
      if (info1.sum != info2.sum) {
        return info1.sum > info2.sum;
      }
      return info1.index > info2.index;
    };

    // Retain all nodes and destroy them automatically.
    std::vector<std::unique_ptr<ListNode>> node_unique_ptrs;
    node_unique_ptrs.reserve(nums.size());

    int decreasing_pair_count = 0;
    std::priority_queue<PairInfo, std::vector<PairInfo>,
                        decltype(pair_info_comp)>
        pair_info_pq(pair_info_comp);

    const auto fake_head =
        std::make_unique<ListNode>(INT_MIN, nullptr, nullptr, false);
    {
      ListNode* current_node = fake_head.get();
      for (const int num : nums) {
        auto node_unique_ptr =
            std::make_unique<ListNode>(num, current_node, nullptr, true);
        current_node->next = node_unique_ptr.get();
        current_node = node_unique_ptr.get();
        node_unique_ptrs.push_back(std::move(node_unique_ptr));
      }
    }

    {
      ListNode* node = fake_head->next;
      int node_info_index = 0;
      while (node->next != nullptr) {
        pair_info_pq.emplace(node->value + node->next->value, node_info_index,
                             node, node->next);
        decreasing_pair_count += node->value > node->next->value;
        node = node->next;
        node_info_index++;
      }
    }

    int removal_count = 0;

    while (decreasing_pair_count > 0) {
      const auto [sum, node_info_index, first_node, second_node] =
          pair_info_pq.top();
      pair_info_pq.pop();
      if (!first_node->is_valid || !second_node->is_valid) {
        continue;
      }

      ListNode* const prev_node = first_node->prev;
      ListNode* const next_node = second_node->next;

      decreasing_pair_count -= first_node->value > second_node->value;
      if (prev_node != fake_head.get()) {
        decreasing_pair_count -= prev_node->value > first_node->value;
      }
      if (next_node) {
        decreasing_pair_count -= second_node->value > next_node->value;
      }

      auto new_node_unique_ptr =
          std::make_unique<ListNode>(sum, prev_node, next_node, true);
      auto* new_node = new_node_unique_ptr.get();
      node_unique_ptrs.push_back(std::move(new_node_unique_ptr));

      prev_node->next = new_node;
      pair_info_pq.emplace(prev_node->value + new_node->value, node_info_index,
                           prev_node, new_node);
      if (prev_node != fake_head.get()) {
        decreasing_pair_count += prev_node->value > new_node->value;
      }

      if (next_node) {
        next_node->prev = new_node;
        pair_info_pq.emplace(new_node->value + next_node->value,
                             node_info_index + 1, new_node, next_node);
        decreasing_pair_count += new_node->value > next_node->value;
      }

      first_node->is_valid = false;
      second_node->is_valid = false;

      removal_count++;
    }

    return removal_count;
  }

 private:
  struct ListNode {
    std::int64_t value;
    ListNode* prev;
    ListNode* next;
    bool is_valid;
  };

  struct PairInfo {
    std::int64_t sum;
    size_t index;
    ListNode* first_node;
    ListNode* second_node;
  };
};
// @lc code=end
