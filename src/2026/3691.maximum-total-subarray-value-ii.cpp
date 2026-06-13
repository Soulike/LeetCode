/*
 * @lc app=leetcode id=3691 lang=cpp
 *
 * [3691] Maximum Total Subarray Value II
 */

#include <algorithm>
#include <queue>
#include <vector>

// @lc code=start
class MinMaxSegmentTree {
 public:
  struct MinMaxValue {
    int min;
    int max;
  };

 public:
  explicit MinMaxSegmentTree(const std::vector<int>& nums)
      : root_(Build(nums, 0, nums.size() - 1)) {}

  [[nodiscard]] MinMaxValue Query(const int left, const int right) const {
    return QueryImpl(root_, left, right);
  }

 private:
  struct Range {
    int begin;
    int end;  // included
  };

  struct Node {
    Range range;
    MinMaxValue min_max_value;
    Node* left;
    Node* right;
  };

 private:
  static Node* Build(const std::vector<int>& nums,
                     const int left_index,
                     const int right_index) {
    if (left_index == right_index) {
      return new Node(Range(left_index, right_index),
                      MinMaxValue(nums[left_index], nums[left_index]), nullptr,
                      nullptr);
    }
    const int mid = (right_index - left_index) / 2 + left_index;
    Node* const left_child = Build(nums, left_index, mid);
    Node* const right_child = Build(nums, mid + 1, right_index);
    return new Node(Range(left_index, right_index),
                    MinMaxValue(std::min(left_child->min_max_value.min,
                                         right_child->min_max_value.min),
                                std::max(left_child->min_max_value.max,
                                         right_child->min_max_value.max)),
                    left_child, right_child);
  }

  static MinMaxValue QueryImpl(const Node* const root,
                               const int left_index,
                               const int right_index) {
    if (root->range.begin == left_index && root->range.end == right_index) {
      return root->min_max_value;
    }
    const auto& [left_child_begin_index, left_child_end_index] =
        root->left->range;
    const auto& [right_child_begin_index, right_child_end_index] =
        root->right->range;
    if (right_index <= left_child_end_index) {
      // Full range in left
      return QueryImpl(root->left, left_index, right_index);
    } else if (right_child_begin_index <= left_index) {
      // Full range in right
      return QueryImpl(root->right, left_index, right_index);
    } else {
      // Need split
      const MinMaxValue left_child_result =
          QueryImpl(root->left, left_index, left_child_end_index);
      const MinMaxValue right_child_result =
          QueryImpl(root->right, right_child_begin_index, right_index);
      return MinMaxValue(
          std::min(left_child_result.min, right_child_result.min),
          std::max(left_child_result.max, right_child_result.max));
    }
  }

 private:
  Node* root_;
};

class Solution {
 public:
  long long maxTotalValue(const std::vector<int>& nums, const int k) {
    MinMaxSegmentTree min_max_segment_tree(nums);

    static constexpr auto comp = [](const MinMaxDiff& diff1,
                                    const MinMaxDiff& diff2) {
      return diff1.diff < diff2.diff;
    };
    std::priority_queue<MinMaxDiff, std::vector<MinMaxDiff>, decltype(comp)>
        min_max_diff_pq(comp);
    for (int begin = 0; begin < nums.size(); begin++) {
      const auto& [min_value, max_value] =
          min_max_segment_tree.Query(begin, nums.size() - 1);
      MinMaxDiff min_max_diff = {begin, static_cast<int>(nums.size()) - 1,
                                 max_value - min_value};
      min_max_diff_pq.push(min_max_diff);
    }

    long long total_value = 0;
    for (int i = 0; i < k; i++) {
      const MinMaxDiff min_max_diff = min_max_diff_pq.top();
      min_max_diff_pq.pop();

      total_value += min_max_diff.diff;

      if (min_max_diff.begin < min_max_diff.end) {
        const auto& [min_value, max_value] = min_max_segment_tree.Query(
            min_max_diff.begin, min_max_diff.end - 1);
        MinMaxDiff new_min_max_diff = {min_max_diff.begin, min_max_diff.end - 1,
                                       max_value - min_value};
        min_max_diff_pq.push(new_min_max_diff);
      }
    }

    return total_value;
  }

 private:
  struct MinMaxDiff {
    int begin;
    int end;  // included
    int diff;
  };
};
// @lc code=end

int main() {
  Solution sol;
  sol.maxTotalValue({4, 2, 5, 1}, 3);
}
