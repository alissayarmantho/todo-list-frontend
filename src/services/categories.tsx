import axios from "axios";
import { Category } from "../types";

function categories_api(apiURL: string) {
  return {
    async get(): Promise<Category[]> {
      try {
        const resp = await axios.get(apiURL);
        return resp.data;
      } catch (err) {
        throw err;
      }
    },
    async getById(apiURL: string, categoryId: number): Promise<Category> {
      try {
        const resp = await axios.get(`${apiURL}/${categoryId}`);
        return resp.data;
      } catch (err) {
        throw err;
      }
    },
    async create(newCategory: Category): Promise<string> {
      try {
        const resp = await axios.post(apiURL, newCategory);
        return resp.data.message;
      } catch (err) {
        throw err;
      }
    },
    async update(
      updatedCategory: Category,
      categoryId: number
    ): Promise<string> {
      try {
        const resp = await axios.put(
          `${apiURL}/${categoryId}`,
          updatedCategory
        );
        return resp.data.message;
      } catch (err) {
        throw err;
      }
    },
    async destroy(categoryId: number): Promise<string> {
      try {
        const resp = await axios.delete(`${apiURL}/${categoryId}`);
        return resp.data.message;
      } catch (err) {
        throw err;
      }
    },
  };
}
export default categories_api;
