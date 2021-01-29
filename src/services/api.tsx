import initCategories from "./categories";
import initTodos from "./todos";
import config from "../config";

const api = {
  todos: initTodos(config.Todos_apiURL),
  categories: initCategories(config.Categories_apiURL),
};
export default api;
