/*
 * @lc app=leetcode id=380 lang=cpp
 *
 * [380] Insert Delete GetRandom O(1)
 */

#include <cstdlib>
#include <ctime>
#include <map>
#include <vector>

// @lc code=start
using std::map;
using std::vector;

class RandomizedSet {
 private:
  vector<int> elements;
  map<int, int> elementToIndex;

  int getRandomNumber(int start, int end) {
    const int diff = end - start;
    return std::rand() % (diff + 1) + start;
  }

 public:
  bool insert(int val) {
    if (!this->elementToIndex.contains(val)) {
      this->elements.push_back(val);
      this->elementToIndex[val] = this->elements.size() - 1;
      return true;
    }
    return false;
  }

  bool remove(int val) {
    if (!this->elementToIndex.contains(val)) {
      return false;
    }

    const int lastElementIndex = this->elements.size() - 1;
    const int lastElement = this->elements.at(lastElementIndex);
    const int valIndex = this->elementToIndex[val];

    if (valIndex != lastElement) {
      this->elements[lastElementIndex] = val;
      this->elements[valIndex] = lastElement;
      this->elementToIndex[val] = lastElementIndex;
      this->elementToIndex[lastElement] = valIndex;
    }

    this->elements.pop_back();
    this->elementToIndex.erase(val);
    return true;
  }

  int getRandom() {
    const int randomIndex = this->getRandomNumber(0, this->elements.size() - 1);
    return this->elements[randomIndex];
  }
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * RandomizedSet* obj = new RandomizedSet();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
// @lc code=end

int main() {
  RandomizedSet* rset = new RandomizedSet();
  rset->insert(1);
  rset->remove(2);
  rset->insert(2);
  rset->getRandom();
  rset->remove(1);
  rset->insert(2);
  rset->getRandom();
}
