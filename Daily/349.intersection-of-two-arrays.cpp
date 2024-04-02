/*
 * @lc app=leetcode id=349 lang=cpp
 *
 * [349] Intersection of Two Arrays
 */
#include <unordered_set>
#include <vector>

using std::unordered_set;
using std::vector;

// @lc code=start
class Solution {
 public:
  vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
    unordered_set<int> nums1Set(nums1.cbegin(), nums1.cend());
    vector<int> intersections;
    intersections.reserve(std::min(nums1.size(), nums2.size()));
    for (int i = 0; i < nums2.size(); i++) {
      if (nums1Set.erase(nums2[i]) > 0) {
        intersections.push_back(nums2[i]);
      }
    }
    return intersections;
  }
};
// @lc code=end
