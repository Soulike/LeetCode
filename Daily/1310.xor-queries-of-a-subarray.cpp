/*
 * @lc app=leetcode id=1310 lang=cpp
 *
 * [1310] XOR Queries of a Subarray
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> xorQueries(std::vector<int>& arr,
                              std::vector<std::vector<int>>& queries) {
    std::vector<int> prefixXor(arr.size());
    prefixXor[0] = arr[0];
    for (int i = 1; i < arr.size(); i++) {
      prefixXor[i] = prefixXor[i - 1] ^ arr[i];
    }

    std::vector<int> result(queries.size());

    for (int i = 0; i < queries.size(); i++) {
      const int from = queries[i][0];
      const int to = queries[i][1];

      result[i] = prefixXor[to] ^ prefixXor[from] ^ arr[from];
    }

    return result;
  }
};
// @lc code=end
