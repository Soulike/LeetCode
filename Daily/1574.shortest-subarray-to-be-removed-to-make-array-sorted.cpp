/*
 * @lc app=leetcode id=1574 lang=cpp
 *
 * [1574] Shortest Subarray to be Removed to Make Array Sorted
 */
#include <vector>

// @lc code=start
class Solution {
 public:
  int findLengthOfShortestSubarray(std::vector<int>& arr) {
    const int N = static_cast<int>(arr.size());
    int prefixIndex = 0;
    for (int i = 1; i < N; i++) {
      if (arr[i - 1] <= arr[i]) {
        prefixIndex = i;
      } else {
        break;
      }
    }
    if (prefixIndex == N - 1) {
      return 0;
    }

    int suffixIndex = N - 1;
    for (int i = N - 2; i >= 0; i--) {
      if (arr[i] <= arr[i + 1]) {
        suffixIndex = i;
      } else {
        break;
      }
    }

    int minSubarrayLength = std::min(N - prefixIndex - 1, suffixIndex);
    for (int i = 0; i <= prefixIndex; i++) {
      for (int j = N - 1; j >= suffixIndex; j--) {
        if (arr[i] <= arr[j]) {
          minSubarrayLength = std::min(minSubarrayLength, j - i - 1);
        } else {
          break;
        }
      }
    }

    return minSubarrayLength;
  }
};
// @lc code=end

int main() {
  std::vector<int> arr = {2, 2, 2, 1, 1, 1};
  Solution sol;
  sol.findLengthOfShortestSubarray(arr);
}
