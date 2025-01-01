/*
 * @lc app=leetcode id=2962 lang=cpp
 *
 * [2962] Count Subarrays Where Max Element Appears at Least K Times
 */
#include <cmath>
#include <vector>

using std::vector;

// @lc code=start
class Solution {
 public:
  long long countSubarrays(vector<int>& nums, int k) {
    const int maxElement = *std::max_element(nums.cbegin(), nums.cend());

    int left = 0;
    int right = 0;
    int currentMaxElementCount = 0;
    long long result = 0;

    while (right < nums.size()) {
      if (nums[right] == maxElement) {
        currentMaxElementCount++;
      }

      if (currentMaxElementCount == k) {
        while (currentMaxElementCount == k) {
          if (nums[left] == maxElement) {
            currentMaxElementCount--;
          }
          // Every left includes `nums.size() - right` valid sub arrays
          result += nums.size() - right;
          left++;
        }
      }

      right++;
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {1, 3, 2, 3, 3};
  sol.countSubarrays(vec, 2);  // 224
}