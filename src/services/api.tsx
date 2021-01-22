import initCategories from './categories'
import initPosts from './todos'
import config from '../config'

const api = {
    categories: initCategories(config.Todos_apiURL),
    posts: initPosts(config.Categories_apiURL)
}
export default api;