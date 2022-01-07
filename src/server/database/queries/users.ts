import { Query} from '../index'
import { Users } from '../../types';

//get all ✅ OK
const get_all = () => Query<Users[]>("SELECT * FROM Users");

//get one by id ✅ OK
const get_one_by_id = (id: number) => Query<Users[]>("SELECT * FROM Users WHERE id =?", [id]);

//create✅ OK
const create = (new_user: Users) => {
    return Query(`INSERT INTO Users SET ?`, [new_user]);
}

//delete ✅ OK
const destroy = (id: Users['id']) => Query("DELETE FROM Users WHERE id=?", [id ]);

const getUserBy = (column_name: string, value: string | number) =>
    Query<Users[]>("SELECT * FROM Users WHERE ??=?", [column_name, value]);

export default {
    get_all,
    get_one_by_id,
    create,
    destroy, 
    getUserBy

};