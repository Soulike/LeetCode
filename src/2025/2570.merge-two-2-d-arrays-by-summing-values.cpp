/*
 * @lc app=leetcode id=2570 lang=cpp
 *
 * [2570] Merge Two 2D Arrays by Summing Values
 */

#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::vector<int>> mergeArrays(
      const std::vector<std::vector<int>>& nums1,
      const std::vector<std::vector<int>>& nums2) {
    constexpr int kIdIndex = 0;
    constexpr int kValueIndex = 1;
    int nums1Index = 0;
    int nums2Index = 0;

    std::vector<std::vector<int>> merged;
    merged.reserve(nums1.size() + nums2.size());

    while (nums1Index < nums1.size() && nums2Index < nums2.size()) {
      const int num1Id = nums1[nums1Index][kIdIndex];
      const int num2Id = nums2[nums2Index][kIdIndex];
      if (num1Id < num2Id) {
        merged.push_back(nums1[nums1Index]);
        nums1Index++;
      } else if (num1Id > num2Id) {
        merged.push_back(nums2[nums2Index]);
        nums2Index++;
      } else {
        merged.push_back({num1Id, nums1[nums1Index][kValueIndex] +
                                      nums2[nums2Index][kValueIndex]});
        nums1Index++;
        nums2Index++;
      }
    }

    while (nums1Index < nums1.size()) {
      merged.push_back(nums1[nums1Index]);
      nums1Index++;
    }

    while (nums2Index < nums2.size()) {
      merged.push_back(nums2[nums2Index]);
      nums2Index++;
    }

    return merged;
  }
};
// @lc code=end
