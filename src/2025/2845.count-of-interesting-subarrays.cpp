/*
 * @lc app=leetcode id=2845 lang=cpp
 *
 * [2845] Count of Interesting Subarrays
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long countInterestingSubarrays(const std::vector<int>& nums,
                                      const int modulo,
                                      const int k) {
    // Here, we treat nums as an array only containing 0s and 1s, corresponds to
    // nums[i] % modulo != k and nums[i] % modulo == k.
    // We want to know how many we have (prefix_sum[j] - prefix_sum[i-1]) %
    // modulo == k.

    // (prefix_sum[j] - prefix_sum[i-1]) % modulo == k
    // => (prefix_sum[j] - prefix_sum[i-1]) % modulo == k % module
    // => prefix_sum[i-1] % modulo == (prefix_sum[j] - k) % modulo
    // So, during the prefix sum calculation, we can
    // add the number of (prefix_sum[j] - k) % modulo to result,
    // and then log the number of prefix_sum[i-1] % modulo.
    int prefix_sum = 0;
    std::unordered_map<int, int> prefix_sum_modulo_k_result_to_counts;
    // At beginning prefix sum is 0, and 0 % modulo == 0.
    prefix_sum_modulo_k_result_to_counts[0] = 1;

    long long interesting_subarray_count = 0;
    for (int i = 0; i < nums.size(); i++) {
      prefix_sum += nums[i] % modulo == k;
      // prefix_sum - k could be negative. Add modulo to ensure it is positive.
      interesting_subarray_count +=
          prefix_sum_modulo_k_result_to_counts[(prefix_sum - k + modulo) %
                                               modulo];
      prefix_sum_modulo_k_result_to_counts[prefix_sum % modulo]++;
    }

    return interesting_subarray_count;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.countInterestingSubarrays({4, 5}, 1, 0);
}
