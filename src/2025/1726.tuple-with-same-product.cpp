/*
 * @lc app=leetcode id=1726 lang=cpp
 *
 * [1726] Tuple with Same Product
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  int tupleSameProduct(const std::vector<int>& nums) {
    std::unordered_map<int, int> productToFreq;
    for (int i = 0; i < nums.size(); i++) {
      for (int j = i + 1; j < nums.size(); j++) {
        productToFreq[nums[i] * nums[j]]++;
      }
    }
    int tupleNumber = 0;
    for (const auto& productAndFreq : productToFreq) {
      // For 2 pairs [a,b] and [c,d]
      // we get 4 valid tuples, [a,b,c,d], [b,a,c,d], [a,b,d,c], [b,a,d,c].
      tupleNumber += productAndFreq.second * (productAndFreq.second - 1) * 4;
    }

    return tupleNumber;
  }
};
// @lc code=end

int main() {
  std::vector<int> nums = {1, 2, 4, 5, 10};
  Solution sol;
  sol.tupleSameProduct(nums);
}
