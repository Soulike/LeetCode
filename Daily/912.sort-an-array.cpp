/*
 * @lc app=leetcode id=912 lang=cpp
 *
 * [912] Sort an Array
 */
#include <cstdlib>
#include <ctime>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<int> sortArray(std::vector<int>& nums) {
    this->quickSort(nums);
    return nums;
  }

 private:
  void quickSort(std::vector<int>& nums) {
    std::srand(std::time(nullptr));
    this->quickSortCore(nums, 0, nums.size() - 1);
  }

  void quickSortCore(std::vector<int>& nums, int left, int right) {
    if (left >= right) {
      return;
    }
    const int randomIndex = left + std::rand() % (right - left + 1);
    std::swap(nums[left], nums[randomIndex]);

    const int pivot = nums[left];

    int leftIndex = left;
    int rightIndex = right;

    while (leftIndex < rightIndex) {
      while (nums[rightIndex] > pivot && leftIndex < rightIndex) {
        rightIndex--;
      }

      while (nums[leftIndex] <= pivot && leftIndex < rightIndex) {
        leftIndex++;
      }

      std::swap(nums[leftIndex], nums[rightIndex]);
    }

    std::swap(nums[left], nums[rightIndex]);

    this->quickSortCore(nums, left, rightIndex - 1);
    this->quickSortCore(nums, rightIndex + 1, right);
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> nums = {5, 1, 1, 2, 0, 0};
  sol.sortArray(nums);
}
