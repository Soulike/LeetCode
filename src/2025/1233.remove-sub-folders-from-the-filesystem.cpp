/*
 * @lc app=leetcode id=1233 lang=cpp
 *
 * [1233] Remove Sub-Folders from the Filesystem
 */

#include <algorithm>
#include <string>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> removeSubfolders(std::vector<std::string>& folder) {
    std::ranges::sort(folder);
    std::vector<std::string> results;
    results.push_back(folder[0]);
    int current_prefix_index = 0;
    for (int i = 1; i < folder.size(); i++) {
      if (folder[i].starts_with(folder[current_prefix_index]) &&
          folder[i][folder[current_prefix_index].size()] == '/') {
        continue;
      }
      current_prefix_index = i;
      results.push_back(folder[i]);
    }

    return results;
  }
};
// @lc code=end
