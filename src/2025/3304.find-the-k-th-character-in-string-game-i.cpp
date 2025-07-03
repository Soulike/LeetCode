/*
 * @lc app=leetcode id=3304 lang=cpp
 *
 * [3304] Find the K-th Character in String Game I
 */

#include <string>
#include <string_view>

// @lc code=start
class Solution {
 public:
  char kthCharacter(const int k) {
    while (cache.size() < k) {
      const auto current_cache_size = cache.size();
      cache.reserve(current_cache_size * 2);
      for (size_t i = 0; i < current_cache_size; i++) {
        cache += static_cast<char>((cache[i] - 'a' + 1) % 26 + 'a');
      }
    }

    return cache[k - 1];
  }

 private:
  static inline std::string cache = "a";
};
// @lc code=end

int main() {
  Solution sol;
  sol.kthCharacter(10);
}
