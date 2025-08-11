/*
 * @lc app=leetcode id=2438 lang=cpp
 *
 * [2438] Range Product Queries of Powers
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> productQueries(
      const int n,
      const std::vector<std::vector<int>>& queries) {
    constexpr int kMod = 1e9 + 7;
    const std::vector<int> powers = GetPowers(n);
    std::vector<int> products;
    for (const std::vector<int>& query : queries) {
      const int from = query[0];
      const int to = query[1];
      std::int64_t product = 1;
      for (int i = from; i <= to; i++) {
        product *= powers[i];
        product %= kMod;
      }
      products.push_back(static_cast<int>(product));
    }

    return products;
  }

 private:
  static std::vector<int> GetPowers(const int n) {
    std::vector<int> powers;
    for (int i = 0; i < 31; i++) {
      const int mask = 1 << i;
      if (mask > n) {
        break;
      }
      if ((n & mask) != 0) {
        powers.push_back(mask);
      }
    }

    return powers;
  }
};
// @lc code=end
