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
    const std::string& numString = std::to_string(num);

    std::vector<std::string> allWords;
    for (int i = static_cast<int>(numString.size()) - 1; i >= 0; i -= 3) {
      const std::vector<std::string>& words =
          this->getNumberWordsInRange(i - 2, numString);
      allWords.insert(allWords.end(), words.rbegin(), words.rend());
    }

    std::string result;
    for (int i = static_cast<int>(allWords.size()) - 1; i >= 0; i--) {
      if (!result.empty()) {
        result += " ";
      }
      result += allWords[i];
    }

    return result;
  }

 private:
  // Process num[highIndex] - num[highIndex + 2]
  std::vector<std::string> getNumberWordsInRange(int highIndex,
                                                 const std::string& num) {
    bool isZero = true;
    for (int i = highIndex; i <= highIndex + 2; i++) {
      if (i >= 0 && num[i] != '0') {
        isZero = false;
        break;
      }
    }
    if (isZero) {
      return {};
    }

    std::vector<std::string> words;

    const std::string hundredNum =
        highIndex >= 0 ? std::string("0") + num[highIndex] : "00";
    const std::string& hundredNumWord =
        this->BelowTwentyNumberToWords.at(hundredNum);
    if (!hundredNumWord.empty()) {
      words.push_back(hundredNumWord);
      words.emplace_back("Hundred");
    }

    const std::string otherNums = highIndex + 1 < num.size()
                                      ? num.substr(highIndex + 1, 2)
                                      : std::string("0") + num[highIndex + 2];

    if (otherNums[0] < '2') {
      // < 20
      const std::string& word = this->BelowTwentyNumberToWords.at(otherNums);
      if (!word.empty()) {
        words.push_back(word);
      }
    } else {
      // >= 20
      const std::string& tensWord =
          this->MultipleTensNumberToWords.at(otherNums.substr(0, 1));
      const std::string& belowTenWord = this->BelowTwentyNumberToWords.at(
          std::string("0") + otherNums.substr(1, 1));
      if (!tensWord.empty()) {
        words.push_back(tensWord);
      }
      if (!belowTenWord.empty()) {
        words.push_back(belowTenWord);
      }
    }

    const int thousands = (static_cast<int>(num.size()) - highIndex - 1) / 3;
    if (thousands > 0) {
      words.push_back(this->ThousandsWords.at(thousands));
    }
    return words;
  }

 private:
  const std::unordered_map<std::string, std::string> BelowTwentyNumberToWords =
      {
          {"00", ""},         {"01", "One"},      {"02", "Two"},
          {"03", "Three"},    {"04", "Four"},     {"05", "Five"},
          {"06", "Six"},      {"07", "Seven"},    {"08", "Eight"},
          {"09", "Nine"},     {"10", "Ten"},      {"11", "Eleven"},
          {"12", "Twelve"},   {"13", "Thirteen"}, {"14", "Fourteen"},
          {"15", "Fifteen"},  {"16", "Sixteen"},  {"17", "Seventeen"},
          {"18", "Eighteen"}, {"19", "Nineteen"},
  };
  const std::unordered_map<std::string, std::string> MultipleTensNumberToWords =
      {
          {"2", "Twenty"}, {"3", "Thirty"},  {"4", "Forty"},  {"5", "Fifty"},
          {"6", "Sixty"},  {"7", "Seventy"}, {"8", "Eighty"}, {"9", "Ninety"},
  };
  const std::unordered_map<int, std::string> ThousandsWords = {
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
