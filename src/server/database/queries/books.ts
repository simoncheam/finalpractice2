// needs Query (sql connection), books types, mysqlresponse

import { Query } from '../index'
import { Books, BooksJoined } from '../../types';

//get all ✅ OK
const get_all = () => Query<Books[]>("SELECT * FROM Books");

//get all joined
const get_all_joined = () => Query<BooksJoined[]>("CALL getBooksJoined()");


//get one by id ✅ OK
const get_one_by_id = (id: number) => Query<Books[]>("SELECT * FROM Books WHERE id =?", [id]);

//create ✅ OK
const create = (new_book: Books) => {
    return Query(`INSERT INTO Books SET ?`, [new_book]);
}

//update ✅ OK
const update = (book: Books, id: Books['id']) => Query("UPDATE Books SET ? WHERE id=?", [book, id]);


//delete ✅ OK
const destroy = (id: Books['id']) => Query("DELETE FROM Books WHERE id=?", [id]);

export default {
    get_all,
    get_all_joined,
    get_one_by_id,
    create,
    update,
    destroy

};