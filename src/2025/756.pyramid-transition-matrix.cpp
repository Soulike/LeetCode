/*
 * @lc app=leetcode id=756 lang=cpp
 *
 * [756] Pyramid Transition Matrix
 */

#include <string>
#include <string_view>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool pyramidTransition(const std::string& bottom,
                         const std::vector<std::string>& allowed) {
    std::vector<std::vector<char>> block_base_to_block(5 * 6 + 6);
    for (const std::string& triangle : allowed) {
      block_base_to_block[GetBlockBaseHash(triangle[0], triangle[1])].push_back(
          triangle[2]);
    }
    std::string next_layer;
    next_layer.reserve(bottom.size() - 1);
    const bool result = CanBuild(bottom, next_layer, block_base_to_block);
    return result;
  }

 private:
  using BlockBaseHash = std::uint_fast8_t;

  static bool CanBuild(
      const std::string_view prev_layer,
      std::string& current_layer,
      const std::vector<std::vector<char>>& block_base_to_block) {
    if (prev_layer.size() == 1) {
      // Pyramid done.
      return true;
    }
    if (current_layer.size() == prev_layer.size() - 1) {
      // Current layer done.
      std::string next_layer;
      next_layer.reserve(current_layer.size() - 1);
      return CanBuild(current_layer, next_layer, block_base_to_block);
    }
    const size_t prev_layer_begin_index = current_layer.size();
    const BlockBaseHash block_base_hash =
        GetBlockBaseHash(prev_layer[prev_layer_begin_index],
                         prev_layer[prev_layer_begin_index + 1]);
    if (block_base_to_block[block_base_hash].empty()) {
      return false;
    }

    const std::vector<char>& next_layer_blocks =
        block_base_to_block[block_base_hash];
    for (const char block : next_layer_blocks) {
      if (!current_layer.empty() &&
          block_base_to_block[GetBlockBaseHash(current_layer.back(), block)]
              .empty()) {
        continue;
      }
      current_layer.push_back(block);

      const bool can_build =
          CanBuild(prev_layer, current_layer, block_base_to_block);
      if (can_build) {
        return true;
      }

      current_layer.pop_back();
    }

    return false;
  }

  static constexpr BlockBaseHash GetBlockBaseHash(const char block1,
                                                  const char block2) {
    return (block1 - 'A') * 6 + (block2 - 'A');
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.pyramidTransition("BCD", {"BCC", "CDE", "CEA", "FFF"});
}