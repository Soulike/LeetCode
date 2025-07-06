/*
 * @lc app=leetcode id=1865 lang=cpp
 *
 * [1865] Finding Pairs With a Certain Sum
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class FindSumPairs {
 public:
  FindSumPairs(std::vector<int>& nums1, std::vector<int>& nums2)
      : nums1_(std::move(nums1)), nums2_(std::move(nums2)) {
    for (const int num2 : nums2_) {
      num2_to_counts_[num2]++;
    }
  }

  void add(const int index, const int val) {
    const int prev_num2 = nums2_[index];
    const int next_num2 = nums2_[index] + val;

    num2_to_counts_[prev_num2]--;
    num2_to_counts_[next_num2]++;
    nums2_[index] = next_num2;
  }

  int count(const int total) {
    int result = 0;
    for (const int num1 : nums1_) {
      const int num2 = total - num1;
      if (num2_to_counts_.contains(num2)) {
        result += num2_to_counts_[num2];
      }
    }

    return result;
  }

 private:
  std::vector<int> nums1_;
  std::vector<int> nums2_;
  std::unordered_map<int, int> num2_to_counts_;
};

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * FindSumPairs* obj = new FindSumPairs(nums1, nums2);
 * obj->add(index,val);
 * int param_2 = obj->count(tot);
 */
// @lc code=end
