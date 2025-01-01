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
  std::vector<std::string> removeSubfolders(std::vector<std::string>& paths) {
    std::vector<std::string> results;
    std::sort(paths.begin(), paths.end());

    for (const auto& path : paths) {
      if (results.empty() || !path.starts_with(results.back() + '/')) {
        results.push_back(path);
      }
    }

    return results;
  }
};
// @lc code=end

int main() {
  std::vector<std::string> paths = {"/a", "/a/b", "/c/d", "/c/d/e", "/c/f"};
  Solution sol;
  sol.removeSubfolders(paths);
}
