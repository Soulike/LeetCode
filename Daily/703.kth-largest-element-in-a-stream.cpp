/*
 * @lc app=leetcode id=703 lang=cpp
 *
 * [703] Kth Largest Element in a Stream
 */
#include <vector>

// @lc code=start
class KthLargest {
 public:
  KthLargest(int k, std::vector<int>& nums) : k(k) {
    this->store.resize(k);
    this->storeSize = 0;

    for (int i = 0; i < nums.size(); i++) {
      this->insert(nums[i]);
    }
  }

  int add(int val) {
    this->insert(val);
    return this->store[this->k - 1];
  }

 private:
  std::vector<int> store;
  int storeSize;
  const int k;

 private:
  void insert(int val) {
    if (this->storeSize == 0) {
      this->store[this->storeSize] = val;
      this->storeSize++;
      return;
    }

    if (val <= this->store[this->storeSize - 1]) {
      if (this->storeSize == this->k) {
        return;
      }
      this->store[this->storeSize] = val;
      this->storeSize++;
      return;
    }

    int insertIndex = 0;
    for (int i = 0; i < this->storeSize; i++) {
      if (this->store[i] <= val) {
        insertIndex = i;
        break;
      }
    }

    this->storeSize = std::min(this->storeSize + 1, this->k);

    for (int i = this->storeSize - 1; i >= insertIndex + 1; i--) {
      store[i] = store[i - 1];
    }

    store[insertIndex] = val;
  }
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * KthLargest* obj = new KthLargest(k, nums);
 * int param_1 = obj->add(val);
 */
// @lc code=end
