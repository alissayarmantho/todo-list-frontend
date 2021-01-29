import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import BlockIcon from "@material-ui/icons/Block";
import API from "./services/api";
import "./App.css";
import { Category, Todo } from "./types";

function App() {
  //Category-related states
  const [categories, setCategories] = useState<Array<Category>>([]);
  //Create Category states
  const [newCategory, setNewCategory] = useState<string>("");
  const [isCreatingCategory, setCreatingCategory] = useState<boolean>(false);
  //Updating Category states
  const [editCategory, setEditCategory] = useState<string>("");
  const [isUpdatingCategory, setUpdatingCategory] = useState<boolean>(false);
  const [updatedCategory, setUpdatedCategory] = useState<string>("");
  //To filter by Category
  const [isGettingfilteredTodos, setGettingFilteredTodos] = useState<boolean>(
    false
  );
  const [currentCategoryId, setcurrentCategoryId] = useState<number>();

  //Todo-related states
  const [todos, setTodos] = useState<Array<Todo>>([]);
  //Create Todo states
  const [newTodo, setNewTodo] = useState<string>("");
  const [isCreatingTodo, setCreatingTodo] = useState<boolean>(false);
  //Updating Todo states
  const [editTodo, setEditTodo] = useState<string>("");
  const [isUpdatingTodo, setUpdatingTodo] = useState<boolean>(false);
  const [updatedTodo, setUpdatedTodo] = useState<string>("");

  useEffect(() => {
    API.categories
      .get()
      .then((cat) => {
        setCategories(cat);
      })
      .catch((err) => {
        console.log(err);
      });
    API.todos
      .get()
      .then((todo) => {
        setTodos(todo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function getAllTodos() {
    try {
      const todos = await API.todos.get();
      setTodos(todos);
    } catch (err) {
      console.log(err);
    }
  }

  async function filterTodos(category_id: number | undefined) {
    try {
      setGettingFilteredTodos(true);
      const filteredTodos = await API.todos.filterTodobyCategoryId(category_id);
      setTodos(filteredTodos);
    } catch (err) {
      console.log(err);
    } finally {
      setGettingFilteredTodos(false);
    }
  }

  async function createTodos(category_id: number, content: string) {
    const newTodo = {
      id: 0, //dummy value
      content,
      category_id,
    };
    try {
      setCreatingTodo(true);
      await API.todos.create(newTodo);
      console.log("Successfully created");
      const updated_todos = await API.todos.filterTodobyCategoryId(category_id);
      setTodos(updated_todos);
    } catch (err) {
      console.log(err);
    } finally {
      setNewTodo("");
      setCreatingTodo(false);
    }
  }

  async function updateTodo(
    todoId: number,
    content: string,
    category_id: number
  ) {
    const UpdatedTodo = {
      id: todoId,
      content,
      category_id,
    };
    try {
      setUpdatingTodo(true);
      await API.todos.update(UpdatedTodo, todoId);
      console.log("Successfully updated");
      const updated_todos = await API.todos.filterTodobyCategoryId(
        currentCategoryId
      );
      setTodos(updated_todos);
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatedTodo("");
      setEditTodo("");
      setUpdatingTodo(false);
    }
  }

  async function deleteTodo(todoId: number, category_id: number) {
    try {
      setTodos(todos.filter((c) => c.id !== todoId));
      await API.todos.destroy(todoId);
      console.log("Successfully deleted");
      const updated_todos = await API.todos.filterTodobyCategoryId(
        currentCategoryId
      );
      setTodos(updated_todos);
    } catch (err) {
      console.log(err);
    }
  }

  async function createCategory(name: string) {
    const category: Category = {
      id: 0, //dummy value
      name,
    };
    try {
      setCreatingCategory(true);
      await API.categories.create(category);
      console.log("Successfully created");
      const updatedCategories = await API.categories.get();
      setCategories(updatedCategories);
    } catch (err) {
      console.log(err);
    } finally {
      setNewCategory("");
      setCreatingCategory(false);
    }
  }

  async function updateCategory(categoryId: number, name: string) {
    const category: Category = {
      id: categoryId,
      name,
    };
    try {
      setUpdatingCategory(true);
      await API.categories.update(category, categoryId);
      console.log("Successfully updated");
      const updated_categories = await API.categories.get();
      setCategories(updated_categories);
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatedCategory("");
      setEditCategory("");
      setUpdatingCategory(false);
    }
  }

  async function deleteCategory(categoryId: number) {
    try {
      setCategories(categories.filter((c) => c.id !== categoryId));
      setTodos(todos.filter((c) => c.category_id !== categoryId));
      await API.categories.destroy(categoryId);
      console.log("Successfully deleted");
      const updated_categories = await API.categories.get();
      const updated_todos = await API.todos.filterTodobyCategoryId(
        currentCategoryId
      );
      setCategories(updated_categories);
      setTodos(updated_todos);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className="Banner"></div>
      <div className="App">
        <div className="Categories">
          <div className="Categories_CardContainer">
            <button
              className="Categories_Card"
              onClick={() => {
                setcurrentCategoryId(undefined);
                getAllTodos();
              }}
              disabled={isGettingfilteredTodos}
            >
              All
            </button>
            <div className="hidden_UpdateandDelete">
              <IconButton aria-label="Add" disabled={true}>
                <AddIcon />
              </IconButton>
            </div>
          </div>
          {categories.map((category) => (
            <div className="Categories_CardContainer" key={category.id}>
              {editCategory === category.id.toString() ? (
                <input
                  type="text"
                  className="Textfield_Style"
                  value={updatedCategory}
                  placeholder={category.name}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                  disabled={isUpdatingCategory}
                />
              ) : (
                <button
                  className="Categories_Card"
                  onClick={() => {
                    setcurrentCategoryId(category.id);
                    filterTodos(category.id);
                  }}
                  disabled={isGettingfilteredTodos}
                >
                  {category.name}
                </button>
              )}
              <div className="UpdateandDelete">
                {editCategory === category.id.toString() ? (
                  <IconButton
                    aria-label="Add"
                    onClick={() => updateCategory(category.id, updatedCategory)}
                    disabled={isUpdatingCategory}
                  >
                    <DoneIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="Update"
                    onClick={() => {
                      setUpdatedCategory(category.name);
                      setEditCategory(category.id.toString());
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                )}
                <IconButton
                  aria-label="Delete"
                  onClick={() => deleteCategory(category.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
          <div className="TextfieldContainer">
            <input
              type="text"
              className="Textfield_Style"
              value={newCategory}
              placeholder="Add a Category"
              onChange={(e) => setNewCategory(e.target.value)}
              disabled={isCreatingCategory}
            ></input>
            <IconButton
              aria-label="Add"
              onClick={() => createCategory(newCategory)}
              disabled={isCreatingCategory}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div className="Todo">
          <p className="Title">Todo List</p>
          {todos.map((todo) => (
            <div className="Todo_Card" key={todo.id}>
              {editTodo === todo.id.toString() ? (
                <input
                  type="text"
                  className="Textfield_Style_ForEditingTodo"
                  value={updatedTodo}
                  placeholder={todo.content}
                  onChange={(e) => setUpdatedTodo(e.target.value)}
                  disabled={isUpdatingTodo}
                />
              ) : (
                <div className="Todo_Content">{todo.content}</div>
              )}
              <div className="UpdateandDelete">
                {editTodo === todo.id.toString() ? (
                  <IconButton
                    aria-label="Add"
                    onClick={() =>
                      updateTodo(todo.id, updatedTodo, todo.category_id)
                    }
                    disabled={isUpdatingTodo}
                  >
                    <DoneIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="Update"
                    onClick={() => {
                      setUpdatedTodo(todo.content);
                      setEditTodo(todo.id.toString());
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                )}
                <IconButton
                  aria-label="Delete"
                  onClick={() => deleteTodo(todo.id, todo.category_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
          {currentCategoryId ? (
            <div className="TextfieldContainer">
              <input
                type="text"
                className="Textfield_Style_ForTodo"
                value={newTodo}
                placeholder="Add a Todo"
                onChange={(e) => setNewTodo(e.target.value)}
                disabled={isCreatingTodo}
              ></input>
              <IconButton
                aria-label="Add"
                onClick={() => createTodos(currentCategoryId!, newTodo)}
                disabled={isCreatingTodo}
              >
                <AddIcon />
              </IconButton>
            </div>
          ) : (
            <div className="TextfieldContainer">
              <textarea
                className="Textfield_Style_ForTodo"
                value={newTodo}
                placeholder="Please select a category from the list on the left or create a new category. Then, select a category to begin adding a new Todo."
                disabled={true}
              ></textarea>
              <IconButton aria-label="Add" disabled={true}>
                <BlockIcon />
              </IconButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
