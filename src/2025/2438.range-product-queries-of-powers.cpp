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
    const std::vector<int> power_exps = Get2PowerExps(n);
    std::vector<int> power_exps_prefix_sum(power_exps.size() + 1);
    for (int i = 0; i < power_exps.size(); i++) {
      power_exps_prefix_sum[i + 1] = power_exps_prefix_sum[i] + power_exps[i];
    }

    std::vector<int> products;
    for (const std::vector<int>& query : queries) {
      const int from = query[0];
      const int to = query[1];
      const int exp =
          power_exps_prefix_sum[to + 1] - power_exps_prefix_sum[from];

      products.push_back(Get2ExpMod(exp));
    }

    return products;
  }

 private:
  static constexpr int kMod = 1e9 + 7;
  static std::vector<int> Get2PowerExps(const int n) {
    std::vector<int> power_exps;
    for (int i = 0; i < 31; i++) {
      const int mask = 1 << i;
      if (mask > n) {
        break;
      }
      if ((n & mask) != 0) {
        power_exps.push_back(i);
      }
    }

    return power_exps;
  }

  static int Get2ExpMod(const int exp) { return GetExpMod(2, exp); }

  static int GetExpMod(int64_t base, int exp) {
    int64_t result = 1;
    while (exp > 0) {
      if (exp % 2) {
        result *= base;
        result %= kMod;
      }
      base *= base;
      base %= kMod;
      exp /= 2;
    }
    return result;
  }
};
// @lc code=end
