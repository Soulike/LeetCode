/*
 * @lc app=leetcode id=2349 lang=cpp
 *
 * [2349] Design a Number Container System
 */

#include <set>
#include <unordered_map>

// @lc code=start
class NumberContainers {
 public:
  NumberContainers() {}

  void change(int index, int number) {
    if (indexToNumber.contains(index)) {
      const int currentNumberAtIndex = indexToNumber[index];
      numberToIndexes[currentNumberAtIndex].erase(index);
      if (numberToIndexes[currentNumberAtIndex].empty()) {
        numberToIndexes.erase(currentNumberAtIndex);
      }
    }
    numberToIndexes[number].insert(index);
    indexToNumber[index] = number;
  }

  int find(int number) {
    if (!numberToIndexes.contains(number)) {
      return -1;
    }

    const std::set<int>& numberIndexes = numberToIndexes.at(number);
    return *(numberIndexes.cbegin());
  }

 private:
  std::unordered_map<int, std::set<int>> numberToIndexes;
  std::unordered_map<int, int> indexToNumber;
};

/**
 * Your NumberContainers object will be instantiated and called as such:
 * NumberContainers* obj = new NumberContainers();
 * obj->change(index,number);
 * int param_2 = obj->find(number);
 */
// @lc code=end
