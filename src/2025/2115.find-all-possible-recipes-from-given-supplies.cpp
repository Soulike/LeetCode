/*
 * @lc app=leetcode id=2115 lang=cpp
 *
 * [2115] Find All Possible Recipes from Given Supplies
 */

#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  std::vector<std::string> findAllRecipes(
      const std::vector<std::string>& recipes,
      const std::vector<std::vector<std::string>>& ingredients,
      const std::vector<std::string>& supplies) {
    std::vector<std::string> possibleRecipes;
    std::unordered_set<std::string> availableSupplies(supplies.cbegin(),
                                                      supplies.cend());
    std::unordered_map<std::string, std::vector<std::string>>
        recipeToIngredients;
    for (int i = 0; i < recipes.size(); i++) {
      recipeToIngredients[recipes[i]] = ingredients[i];
    }

    std::vector<std::string> availableRecipes;
    for (const auto& recipe : recipes) {
      if (isRecipeAvailable(recipe, recipeToIngredients, availableSupplies)) {
        availableRecipes.push_back(recipe);
      }
    }

    return availableRecipes;
  }

 private:
  static bool isRecipeAvailable(
      const std::string& recipe,
      const std::unordered_map<std::string, std::vector<std::string>>&
          recipeToIngredients,
      std::unordered_set<std::string>& availableSupplies) {
    std::unordered_set<std::string> checkingRecipeOrIngredients;
    return isRecipeOrIngredientAvailable(recipe, recipeToIngredients,
                                         availableSupplies,
                                         checkingRecipeOrIngredients);
  }

  static bool isRecipeOrIngredientAvailable(
      const std::string& recipeOrIngredient,
      const std::unordered_map<std::string, std::vector<std::string>>&
          recipeToIngredients,
      std::unordered_set<std::string>& availableSupplies,
      std::unordered_set<std::string>& checkingRecipeOrIngredients) {
    if (availableSupplies.contains(recipeOrIngredient)) {
      return true;
    }
    if (checkingRecipeOrIngredients.contains(recipeOrIngredient)) {
      // We meet a loop. Impossible to create.
      return false;
    }
    if (!recipeToIngredients.contains(recipeOrIngredient)) {
      // Neither a recipe nor an available supply. Impossible to create.
      return false;
    }

    checkingRecipeOrIngredients.insert(recipeOrIngredient);
    const auto& ingredients = recipeToIngredients.at(recipeOrIngredient);
    for (const auto& ingredient : ingredients) {
      if (!isRecipeOrIngredientAvailable(ingredient, recipeToIngredients,
                                         availableSupplies,
                                         checkingRecipeOrIngredients)) {
        return false;
      }
    }

    availableSupplies.insert(recipeOrIngredient);
    checkingRecipeOrIngredients.erase(recipeOrIngredient);
    return true;
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.findAllRecipes(
      {"xevvq", "izcad", "p", "we", "bxgnm", "vpio", "i", "hjvu", "igi", "anp",
       "tokfq", "z", "kwdmb", "g", "qb", "q", "b", "hthy"},
      {{"wbjr"},
       {"otr", "fzr", "g"},
       {"fzr", "wi", "otr", "xgp", "wbjr", "igi", "b"},
       {"fzr", "xgp", "wi", "otr", "tokfq", "izcad", "igi", "xevvq", "i",
        "anp"},
       {"wi", "xgp", "wbjr"},
       {"wbjr", "bxgnm", "i", "b", "hjvu", "izcad", "igi", "z", "g"},
       {"xgp", "otr", "wbjr"},
       {"wbjr", "otr"},
       {"wbjr", "otr", "fzr", "wi", "xgp", "hjvu", "tokfq", "z", "kwdmb"},
       {"xgp", "wi", "wbjr", "bxgnm", "izcad", "p", "xevvq"},
       {"bxgnm"},
       {"wi", "fzr", "otr", "wbjr"},
       {"wbjr", "wi", "fzr", "xgp", "otr", "g", "b", "p"},
       {"otr", "fzr", "xgp", "wbjr"},
       {"xgp", "wbjr", "q", "vpio", "tokfq", "we"},
       {"wbjr", "wi", "xgp", "we"},
       {"wbjr"},
       {"wi"}},
      {"wi", "otr", "wbjr", "fzr", "xgp"});
}
