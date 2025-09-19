/*
 * @lc app=leetcode id=3484 lang=cpp
 *
 * [3484] Design Spreadsheet
 */

#include <string>
#include <unordered_map>

// @lc code=start
namespace {
bool IsCapitalLetter(const char letter) {
  return letter >= 'A' && letter <= 'Z';
}

template <typename T>
T ConvertStringToDecimal(const std::string_view string) {
  T result = 0;
  for (const char digit : string) {
    result *= 10;
    result += digit - '0';
  }
  return result;
}
}  // namespace

class Spreadsheet {
 public:
  Spreadsheet(const int rows) {}

  void setCell(const std::string_view cell, const int value) {
    const Coordinate coordinate = ConvertCellToCoordinate(cell);
    SetValueInSheet(coordinate, value);
  }

  void resetCell(const std::string_view cell) {
    const Coordinate coordinate = ConvertCellToCoordinate(cell);
    ResetValueInSheet(coordinate);
  }

  int getValue(const std::string_view formula) {
    const ParsedFormula parsed_formula = ParseFormula(formula);
    const Value operant1_value = GetValueFromOperant(parsed_formula.operant1);
    const Value operant2_value = GetValueFromOperant(parsed_formula.operant2);
    return operant1_value + operant2_value;
  }

 private:
  using Row = size_t;
  using Col = uint8_t;
  using Value = int;

  struct Coordinate {
    Row row;  // Begin with 0.
    Col col;  // 0-25 corresponds to A-Z.
  };

  struct ParsedFormula {
    std::string operant1;
    std::string operant2;
  };

  static Coordinate ConvertCellToCoordinate(const std::string_view cell) {
    const char col_letter = cell[0];
    const std::string_view row_number_string = cell.substr(1);

    const Col col = col_letter - 'A';
    const Row row = ConvertRowNumberStringToRow(row_number_string);
    return {row, col};
  }

  static Row ConvertRowNumberStringToRow(
      const std::string_view row_number_string) {
    const Row result = ConvertStringToDecimal<Row>(row_number_string);
    return result - 1;
  }

  static bool IsCell(const std::string_view operant) {
    return !operant.empty() && IsCapitalLetter(operant[0]);
  }

  static ParsedFormula ParseFormula(const std::string_view formula) {
    const size_t operator_index = formula.find_first_of('+');
    const std::string_view operant1 = formula.substr(1, operator_index - 1);
    const std::string_view operant2 = formula.substr(operator_index + 1);
    return {std::string(operant1), std::string(operant2)};
  }

  Value GetValueFromOperant(const std::string_view operant) {
    if (IsCell(operant)) {
      const Coordinate coordinate = ConvertCellToCoordinate(operant);
      return GetValueFromSheet(coordinate);
    }
    return ConvertStringToDecimal<Value>(operant);
  }

  Value GetValueFromSheet(const Coordinate& coordinate) {
    if (sheet.contains(coordinate.row) &&
        sheet[coordinate.row].contains(coordinate.col)) {
      return sheet[coordinate.row][coordinate.col];
    }
    return 0;
  }

  void SetValueInSheet(const Coordinate& coordinate, const Value value) {
    sheet[coordinate.row][coordinate.col] = value;
  }

  void ResetValueInSheet(const Coordinate& coordinate) {
    if (!sheet.contains(coordinate.row)) {
      return;
    }
    sheet[coordinate.row].erase(coordinate.col);
  }

  std::unordered_map<Row, std::unordered_map<Col, Value>> sheet;
};

/**
 * Your Spreadsheet object will be instantiated and called as such:
 * Spreadsheet* obj = new Spreadsheet(rows);
 * obj->setCell(cell,value);
 * obj->resetCell(cell);
 * int param_3 = obj->getValue(formula);
 */
// @lc code=end
