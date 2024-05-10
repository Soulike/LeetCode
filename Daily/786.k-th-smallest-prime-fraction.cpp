/*
 * @lc app=leetcode id=786 lang=cpp
 *
 * [786] K-th Smallest Prime Fraction
 */
#include <utility>
#include <vector>

using std::pair;
using std::vector;

// @lc code=start
struct Fraction {
 public:
  const int numerator;
  const int dominator;

  Fraction(int numerator, int dominator)
      : numerator(numerator), dominator(dominator) {}
};

struct FractionInMatrix : public Fraction {
 public:
  const int ranking;

  FractionInMatrix(int ranking, const int numerator, const int dominator)
      : Fraction(numerator, dominator), ranking(ranking) {}
};

class Solution {
 public:
  vector<int> kthSmallestPrimeFraction(vector<int>& arr, int k) {
    double left = 0, right = 1;  // fraction range [0,1]

    while (true) {
      const double mid = (left + right) / 2;
      const FractionInMatrix fractionInMatrix =
          countAndGetLessOrEqualFraction(arr, mid);
      const int ranking = fractionInMatrix.ranking;
      const int numerator = fractionInMatrix.numerator;
      const int dominator = fractionInMatrix.dominator;

      if (ranking < k) {
        left = mid;
      } else if (ranking > k) {
        right = mid;
      } else {
        return {numerator, dominator};
      }
    }
  }

  // Count how many fractions are less than or equal to `target`,
  // and return the biggest one.
  FractionInMatrix countAndGetLessOrEqualFraction(vector<int>& arr,
                                                  double target) {
    const int N = arr.size();

    int leqFractionCount = 0;  // how many fractions <= target
    // The result fraction p / q
    int p = 0;
    int q = 1;

    for (int i = 0; i < N; i++) {
      int j = 0;
      // arr[i] / arr[j] >= target
      while (j < N && arr[i] >= target * arr[j]) {
        j++;
      }
      leqFractionCount += (N - j);

      // p / q < arr[i] / arr[j]
      // log the maximum p / q.
      if (j < N && p * arr[j] < q * arr[i]) {
        p = arr[i];
        q = arr[j];
      }
    }
    // After the loop, p / q is the `count`th smallest fraction
    return FractionInMatrix(leqFractionCount, p, q);
  }
};
// @lc code=end

int main() {
  Solution sol;
  vector<int> vec = {1, 2, 3, 5};
  sol.kthSmallestPrimeFraction(vec, 3);
}