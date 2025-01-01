/*
 * @lc app=leetcode id=2762 lang=cpp
 *
 * [2762] Continuous Subarrays
 */
#include <map>
#include <type_traits>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long continuousSubarrays(std::vector<int>& nums) {
    using NumType = std::remove_reference_t<decltype(nums)>::value_type;
    using ReturnType =
        std::invoke_result_t<decltype(&Solution::continuousSubarrays), Solution,
                             decltype(nums)>;

    std::uint64_t subArrayCount = 0;

    std::size_t windowLeftIndex = 0;
    std::size_t windowRightIndex = 0;

    NumType currentSubArrayMin = nums[0];
    NumType currentSubArrayMax = nums[0];

    std::map<NumType, std::size_t> currentSubArrayNumToCount;
    currentSubArrayNumToCount[nums[0]]++;

    while (windowRightIndex < nums.size()) {
      // Extend the window if the sub array is valid
      while (currentSubArrayMax - currentSubArrayMin <= 2) {
        windowRightIndex++;
        if (windowRightIndex == nums.size()) {
          break;
        }
        currentSubArrayNumToCount[nums[windowRightIndex]]++;
        currentSubArrayMin =
            std::min(currentSubArrayMin, nums[windowRightIndex]);
        currentSubArrayMax =
            std::max(currentSubArrayMax, nums[windowRightIndex]);
      }

      // Found a valid sub array window: [left, right)
      const std::size_t subArrayLength = windowRightIndex - windowLeftIndex;
      subArrayCount += getAllSubArrayCount(subArrayLength);

      // Shrink window until [left, right] is valid
      while (currentSubArrayMax - currentSubArrayMin > 2) {
        // Remove `left` from the window
        currentSubArrayNumToCount[nums[windowLeftIndex]]--;
        if (currentSubArrayNumToCount[nums[windowLeftIndex]] == 0) {
          currentSubArrayNumToCount.erase(nums[windowLeftIndex]);
          if (nums[windowLeftIndex] == currentSubArrayMin) {
            // `currentSubArrayMin` is gone in the window. Get next minimum
            // number in the window.
            currentSubArrayMin = currentSubArrayNumToCount.cbegin()->first;
          }
          if (nums[windowLeftIndex] == currentSubArrayMax) {
            // `currentSubArrayMax` is gone in the window. Get next maximum
            // number in the window.
            currentSubArrayMax = currentSubArrayNumToCount.crbegin()->first;
          }
        }
        windowLeftIndex++;
      }

      if (windowRightIndex < nums.size()) {
        const std::size_t duplicateSubArrayLength =
            windowRightIndex - windowLeftIndex;
        subArrayCount -= getAllSubArrayCount(duplicateSubArrayLength);
      }
    }

    return static_cast<ReturnType>(subArrayCount);
  }

 private:
  static std::uint64_t getAllSubArrayCount(const std::size_t arrayLength) {
    // 1 + 2 + ... + (n-1) + n => (1 + n) * n / 2
    if (arrayLength % 2) {
      // is odd
      return ((1 + arrayLength) / 2) * arrayLength;
    }

    // is even
    return (1 + arrayLength) * (arrayLength / 2);
  }
};

// @lc code=end

int main() {
  std::vector<int> nums = {5, 4, 2, 4};
  Solution sol;
  sol.continuousSubarrays(nums);
}
