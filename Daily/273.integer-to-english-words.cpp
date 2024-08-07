/*
 * @lc app=leetcode id=273 lang=cpp
 *
 * [273] Integer to English Words
 */
#include <algorithm>
#include <string>
#include <unordered_map>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::string numberToWords(int num) {
    if (num == 0) {
      return "Zero";
    }
    std::string numString = std::to_string(num);

    std::vector<std::string> components;
    for (int i = numString.size() - 1; i >= 0; i -= 3) {
      const std::string& numWord =
          this->getNumberWordsInRange(i - 2, numString);
      if (numWord.size()) {
        components.push_back(numWord);
      }
    }

    std::string result = "";
    for (int i = components.size() - 1; i >= 0; i--) {
      if (!result.empty()) {
        result += " ";
      }
      result += components[i];
    }

    return result;
  }

 private:
  // Process num[highIndex] - num[highIndex + 2]
  std::string getNumberWordsInRange(int highIndex, const std::string& num) {
    bool isZero = true;
    for (int i = highIndex; i <= highIndex + 2; i++) {
      if (i >= 0 && num[i] != '0') {
        isZero = false;
        break;
      }
    }
    if (isZero) {
      return "";
    }

    const std::string hundredNum =
        highIndex >= 0 ? std::string("0") + num[highIndex] : "00";
    const std::string& hundredNumWord =
        this->BelowTwentyNumberToWords[hundredNum];

    const std::string otherNums = highIndex + 1 < num.size()
                                      ? num.substr(highIndex + 1, 2)
                                      : std::string("0") + num[highIndex + 2];
    std::string otherNumsWord;
    if (otherNums[0] < '2') {
      // < 20
      otherNumsWord = this->BelowTwentyNumberToWords[otherNums];
    } else {
      // >= 20
      const std::string tensWord =
          this->MultipleTensNumberToWords[otherNums.substr(0, 1)];
      const std::string belowTenWord =
          this->BelowTwentyNumberToWords[std::string("0") +
                                         otherNums.substr(1, 1)];
      otherNumsWord =
          tensWord +
          (belowTenWord.empty()
               ? ""
               : " " + this->BelowTwentyNumberToWords[std::string("0") +
                                                      otherNums.substr(1, 1)]);
    }

    std::string numWord =
        (hundredNumWord.empty() ? "" : hundredNumWord + " Hundred ") +
        otherNumsWord;
    if (numWord.front() == ' ') {
      numWord = numWord.substr(1);
    }
    if (numWord.back() == ' ') {
      numWord = numWord.substr(0, numWord.size() - 1);
    }
    const int thousands = (num.size() - highIndex - 1) / 3;
    if (thousands > 0) {
      if (numWord.back() != ' ') {
        numWord += " ";
      }
      numWord += this->ThousandsWords[thousands];
    }
    return numWord;
  }

 private:
  std::unordered_map<std::string, std::string> BelowTwentyNumberToWords = {
      {"00", ""},         {"01", "One"},      {"02", "Two"},
      {"03", "Three"},    {"04", "Four"},     {"05", "Five"},
      {"06", "Six"},      {"07", "Seven"},    {"08", "Eight"},
      {"09", "Nine"},     {"10", "Ten"},      {"11", "Eleven"},
      {"12", "Twelve"},   {"13", "Thirteen"}, {"14", "Fourteen"},
      {"15", "Fifteen"},  {"16", "Sixteen"},  {"17", "Seventeen"},
      {"18", "Eighteen"}, {"19", "Nineteen"},
  };
  std::unordered_map<std::string, std::string> MultipleTensNumberToWords = {
      {"2", "Twenty"}, {"3", "Thirty"},  {"4", "Forty"},  {"5", "Fifty"},
      {"6", "Sixty"},  {"7", "Seventy"}, {"8", "Eighty"}, {"9", "Ninety"},
  };
  std::unordered_map<int, std::string> ThousandsWords = {
      {1, "Thousand"},   {2, "Million"},     {3, "Billion"},
      {4, "Trillion"},   {5, "Quadrillion"}, {6, "Quintillion"},
      {7, "Sextillion"}, {8, "Septillion"},  {9, "Octillion"},
      {10, "Nonillion"}};
};
// @lc code=end

int main() {
  Solution sol;
  sol.numberToWords(12345);
}
