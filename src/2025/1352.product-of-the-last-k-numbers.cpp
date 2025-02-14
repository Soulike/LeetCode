/*
 * @lc app=leetcode id=1352 lang=cpp
 *
 * [1352] Product of the Last K Numbers
 */

#include <vector>

// @lc code=start
class ProductOfNumbers {
 public:
  ProductOfNumbers() {}

  void add(int num) {
    if (num == 0) {
      // 0 causes all following products to be 0s (invalid).
      // Reset the `prefixProduct`.
      prefixProduct.resize(0);
      return;
    }

    if (prefixProduct.empty()) {
      prefixProduct.push_back(num);
      return;
    }

    prefixProduct.push_back(prefixProduct.back() * num);
  }

  int getProduct(int k) {
    const int currentSize = prefixProduct.size();
    if (k > currentSize) {
      // If k is larger than `prefixProduct`, we must have met 0s before.
      // The product must be 0.
      return 0;
    }
    if (k == currentSize) {
      return prefixProduct.back();
    }
    return prefixProduct[currentSize - 1] / prefixProduct[currentSize - 1 - k];
  }

 private:
  std::vector<int> prefixProduct;
};

/**
 * Your ProductOfNumbers object will be instantiated and called as such:
 * ProductOfNumbers* obj = new ProductOfNumbers();
 * obj->add(num);
 * int param_2 = obj->getProduct(k);
 */
// @lc code=end

int main() {
  ProductOfNumbers sol;
  sol.add(3);
  sol.add(0);
  sol.add(2);
  sol.add(5);
  sol.add(4);
  sol.add(8);
  sol.getProduct(2);
}
