import { Query} from '../index'
import { Categories } from '../../types';

//get all ✅ OK
const get_all = () => Query<Categories[]>("SELECT * FROM Categories");


//get one by id ✅ OK
const get_one_by_id = (id: number) => Query<Categories[]>("SELECT * FROM Categories WHERE id =?", [id]);




export default {
    get_all,
    get_one_by_id,

};