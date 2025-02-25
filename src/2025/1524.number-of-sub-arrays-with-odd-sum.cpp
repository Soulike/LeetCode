/*
 * @lc app=leetcode id=1524 lang=cpp
 *
 * [1524] Number of Sub-arrays With Odd Sum
 */

#include <cinttypes>
#include <vector>

// @lc code=start
class Solution {
 public:
  int numOfSubarrays(const std::vector<int>& arr) {
    int prevEvenPrefixSumIndexCount = 1;  // considering 0
    int prevOddPrefixSumIndexCount = 0;
    int result = 0;

    int currentPrefixSum = 0;
    for (int i = 0; i < arr.size(); i++) {
      currentPrefixSum += arr[i];
      if (currentPrefixSum & 0b1) {
        // If [0,i] has odd prefix sum, we can remove all previous sub arrays
        // with even prefix sums to get all odd sub arrays ends with i
        prevOddPrefixSumIndexCount++;
        result += prevEvenPrefixSumIndexCount;
      } else {
        // If [0,i] has even prefix sum, we can remove all previous sub arrays
        // with odd prefix sums to get all odd sub arrays ends with i
        prevEvenPrefixSumIndexCount++;
        result += prevOddPrefixSumIndexCount;
      }
      result %= kMod;
    }

    return result;
  }

 private:
  static constexpr std::uint64_t kMod = 1000000000 + 7;
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {1, 3, 5};
  sol.numOfSubarrays(nums);
}
