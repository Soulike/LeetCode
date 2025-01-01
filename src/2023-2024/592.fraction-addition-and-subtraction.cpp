/*
 * @lc app=leetcode id=592 lang=cpp
 *
 * [592] Fraction Addition and Subtraction
 */
#include <cinttypes>
#include <cmath>
#include <string>

// @lc code=start
template <typename T>
class Fraction {
 private:
  T _numerator;
  T _dominator;
  std::int8_t _sign;  // 1 or -1

 public:
  Fraction(T numerator, T dominator)
      : _numerator(std::abs(numerator)),
        _dominator(std::abs(dominator)),
        _sign(isInDifferentSign(numerator, dominator) ? -1 : 1){};

  Fraction operator+(const Fraction& other) const {
    const T newDominator = other._dominator * _dominator;
    const T newNumerator = other._dominator * _numerator * _sign +
                           _dominator * other._numerator * other._sign;
    Fraction fraction(newNumerator, newDominator);
    fraction.reduce();
    return fraction;
  }

  Fraction& operator+=(const Fraction& other) {
    const T dominator = other._dominator * _dominator;
    const T numerator = other._dominator * _numerator * _sign +
                        _dominator * other._numerator * other._sign;
    _numerator = std::abs(numerator);
    _dominator = std::abs(dominator);
    _sign = isInDifferentSign(numerator, dominator) ? -1 : 1;
    reduce();
    return *this;
  }

  std::string toString() {
    std::string result;
    if (_sign == -1) {
      result += '-';
    }
    result += std::to_string(_numerator);
    result += '/';
    result += std::to_string(_dominator);
    return result;
  }

 private:
  void reduce() {
    if (_numerator == 0) {
      _dominator = 1;
      _sign = 1;
      return;
    }

    T greatestCommonDivisor = getGreatestCommonDivisor(_numerator, _dominator);
    while (greatestCommonDivisor > 1) {
      _numerator /= greatestCommonDivisor;
      _dominator /= greatestCommonDivisor;
      greatestCommonDivisor = getGreatestCommonDivisor(_numerator, _dominator);
    }
  }

  bool isInDifferentSign(T num1, T num2) { return (num1 ^ num2) < 0; }

  T getGreatestCommonDivisor(const T num1, const T num2) {
    T divided = std::max(num1, num2);
    T divisor = std::min(num1, num2);

    while (divisor > 0) {
      T remainder = divided % divisor;
      divided = divisor;
      divisor = remainder;
    }
    return divided;
  }
};

class Solution {
 public:
  std::string fractionAddition(std::string expression) {
    Fraction<int> result(0, 1);
    int fractionStart = 0;
    for (int i = 1; i <= expression.size(); i++) {
      if (i == expression.size() || expression[i] == '+' ||
          expression[i] == '-') {
        Fraction<int> fraction =
            parseFractionString(expression, fractionStart, i - 1);
        result += fraction;
        fractionStart = i;
      }
    }

    return result.toString();
  }

 private:
  Fraction<int> parseFractionString(const std::string& expression,
                                    int begin,
                                    int end) {
    int numerator = 0;
    int dominator = 0;
    int sign = 1;
    if (expression[begin] == '+' || expression[begin] == '-') {
      if (expression[begin] == '-') {
        sign = -1;
      }
      begin++;
    }

    int slashIndex = -1;
    for (int i = begin; i < end; i++) {
      if (expression[i] == '/') {
        numerator = std::stoi(expression.substr(begin, (i - 1) - begin + 1));
        slashIndex = i;
        break;
      }
    }

    dominator = std::stoi(
        expression.substr(slashIndex + 1, end - (slashIndex + 1) + 1));

    return {numerator * sign, dominator};
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.fractionAddition("-5/2+10/3+7/9");
}
