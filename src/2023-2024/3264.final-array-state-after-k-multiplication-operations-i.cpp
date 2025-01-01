/*
 * @lc app=leetcode id=3264 lang=cpp
 *
 * [3264] Final Array State After K Multiplication Operations I
 */

#include <queue>
#include <vector>

// @lc code=start
class ArrayElement {
 public:
  int index;
  int value;
};

class Solution {
 public:
  std::vector<int> getFinalState(std::vector<int>& nums,
                                 int k,
                                 int multiplier) {
    std::vector<ArrayElement> elements;
    elements.reserve(nums.size());
    for (int i = 0; i < nums.size(); i++) {
      elements.emplace_back(i, nums[i]);
    }

    auto comparator = [](const ArrayElement& element1,
                         const ArrayElement& element2) {
      if (element1.value != element2.value) {
        return element1.value > element2.value;
      }
      return element1.index > element2.index;
    };
    std::priority_queue<ArrayElement, std::vector<ArrayElement>,
                        decltype(comparator)>
        numsPq(comparator, elements);

    for (int i = 0; i < k; i++) {
      ArrayElement element = numsPq.top();
      numsPq.pop();
      element.value *= multiplier;
      nums[element.index] = element.value;

      numsPq.push(element);
    }

    return nums;
  }
};

// @lc code=end
