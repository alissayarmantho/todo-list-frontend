import axios from "axios";
import { Todo } from "../types";

function todos_api(apiURL: string) {
  return {
    async get(): Promise<Todo[]> {
      try {
        const resp = await axios.get(apiURL);
        return resp.data;
      } catch (err) {
        throw err;
      }
    },
    async getById(apiURL: string, todoId: number): Promise<Todo> {
      try {
        const resp = await axios.get(`${apiURL}/${todoId}`);
        return resp.data;
      } catch (err) {
        throw err;
      }
    },
    async filterTodobyCategoryId(
      category_id: number | undefined
    ): Promise<Todo[]> {
      try {
        if (category_id) {
          const resp = await axios.get(`${apiURL}?categoryid=${category_id}`);
          return resp.data;
        } else {
          const resp = await axios.get(apiURL);
          return resp.data;
        }
      } catch (err) {
        throw err;
      }
    },
    async create(newTodo: Todo): Promise<string> {
      try {
        const resp = await axios.post(apiURL, newTodo);
        return resp.data.message;
      } catch (err) {
        throw err;
      }
    },
    async update(updatedTodo: Todo, todoId: number): Promise<string> {
      try {
        const resp = await axios.put(`${apiURL}/${todoId}`, updatedTodo);
        return resp.data.message;
      } catch (err) {
        throw err;
      }
    },
    async destroy(todoId: number): Promise<string> {
      try {
        const resp = await axios.delete(`${apiURL}/${todoId}`);
        return resp.data.message;
      } catch (err) {
        throw err;
      }
    },
  };
}
export default todos_api;
