import axios from 'axios'

type Category_data = {  
    name: string; 
};

function categories_api (apiURL: string) {
    return {
        async get() {
            try {
                const resp = await axios.get(apiURL)
                return resp.data.categories;
            } catch(err) {
                throw err;
            }
        },
        async getById(apiURL: string, category_id: number) {
            try{
                const resp = await axios.get(apiURL + "/" + category_id.toString())
                return resp.data;
             }
             catch(err){
                 throw err;
             }
        },
        async create(new_category : Category_data) {
            try{
                await axios.post(apiURL, new_category);
             }
             catch(err){
                 throw err;
             }
             return {
                 "message": "Successfully created new category."
             }
        },
        async update(updated_category : Category_data, category_id : number) {
            try{
                await axios.put(apiURL + "/" + category_id.toString(), updated_category);
             }
             catch(err){
                 throw err;
             }
             return {
                 "message": "Successfully updated the category."
             }
        },
        async destroy(category_id : number) {
            try{
                await axios.delete(apiURL + "/" + category_id.toString());
             }
             catch(err){
                 throw err;
             }
             return {
                 "message": "Successfully deleted the category."
             }
        }
        

    }
}
export default categories_api;