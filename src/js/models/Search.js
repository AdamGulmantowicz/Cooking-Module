import axios from 'axios';
import configs from '../config';

const {recipe, APIs } = configs;

export default class Search {
    constructor(query){
        this.query = query;
    }
    
    async getResults(){
        try {
            const res = await axios(
                `${APIs.edamam}/search?q=${this.query}&app_id=${recipe.id}&app_key=${recipe.key}&from=0&to=15`
                );
            this.results = res.data.hits.map(el => el.recipe);
        }catch(err) {
            console.log(err);
        }
    }
}