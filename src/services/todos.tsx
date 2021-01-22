import axios from 'axios'

type Todo_data = {  
    content: string; 
    category_id: number; 
};

function todos_api (apiURL: string) {
    return {
        async get() {
            try {
                const resp = await axios.get(apiURL);
                return resp.data.posts;
            } catch(err) {
                throw err;
            }
        },
        async getById(apiURL: string, todo_id: number) {
            try{
                const resp = await axios.get(apiURL + "/" + todo_id.toString())
                return resp.data;
             }
             catch(err){
                 throw err;
             }
        },
        async filterTodobyCategoryId(category_id: number){
            try{
                const resp = await axios.get(apiURL + "?categoryid=" + category_id.toString())
                return resp.data;
             }
             catch(err){
                 throw err;
             }
        },
        async create(new_todo: Todo_data) {
           try{
              await axios.post(apiURL, new_todo);
           }
           catch(err){
               throw err;
           }
           return {
               "message": "Successfully created new todo."
           }
        },
        async update(updated_todo : Todo_data, todo_id : number) {
            try{
                await axios.put(apiURL + "/" + todo_id.toString(), updated_todo);
             }
             catch(err){
                 throw err;
             }
             return {
                 "message": "Successfully updated the todo."
             }
        },
        async destroy(todo_id : number) {
            try{
                await axios.delete(apiURL + "/" + todo_id.toString());
             }
             catch(err){
                 throw err;
             }
             return {
                 "message": "Successfully deleted the todo."
             }
        }
    }
}
export default todos_api;