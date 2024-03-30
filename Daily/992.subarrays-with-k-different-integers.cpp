/*
 * @lc app=leetcode id=992 lang=cpp
 *
 * [992] Subarrays with K Different Integers
 */
#include <map>
#include <vector>

using std::unordered_map;
using std::vector;

// @lc code=start
class Solution {
 public:
  int subarraysWithKDistinct(vector<int>& nums, int k) {
    return this->atMostK(nums, k) - this->atMostK(nums, k - 1);
  }

  int atMostK(const vector<int>& nums, const int& k) {
    int left = 0;
    int right = 0;
    unordered_map<int, int> numToFreq;
    int result = 0;

    while (right < nums.size()) {
      numToFreq[nums[right]]++;

      while (numToFreq.size() > k && left <= right) {
        numToFreq[nums[left]]--;
        if (numToFreq[nums[left]] == 0) {
          numToFreq.erase(nums[left]);
        }
        left++;
      }

      // At this point, we always get a window fulfilling distinct nums <= k
      result += right - left + 1;

      right++;
    }

    return result;
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {1, 2, 1, 2, 3};
  sol.subarraysWithKDistinct(vec, 2);
}