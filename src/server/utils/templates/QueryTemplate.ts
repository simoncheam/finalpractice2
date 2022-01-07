/* 
import { Query } from "../index";
import { MysqlResponse } from "../models";
import { Books, Categories, Users } from "../../types"


//get all
//get one by id
//create
//update
//delete

//get all
const get_all = () => Query<Books[]>("SELECT * FROM Books");
//const get_all = () => Query<Categories[]>("SELECT * FROM Categories");


///get one by id
const get_one_by_id = (id: number) => Query<Books[]>("SELECT * FROM Books WHERE id =?", [id]);


//put
const update = (book: Books, id: Books['id']) => Query("UPDATE Books SET ? WHERE id=? AND userid =?", [book, id]);


//post
const create = (new_book: Books) => {
    return Query(`INSERT INTO Books SET ?`, [new_book]);
}

const getUserBy = (column_name: string, value: string | number) =>
Query<Users[]>("SELECT * FROM Users WHERE ??=?", [column_name, value]);

//delete
const destroy = (id: Books['id']) => Query("DELETE FROM Books WHERE id=? and userid=?", [id ]);

export default {
    get_all,
    get_one_by_id,
    create,
    update,
    destroy
    
};

import booksDB from '../../database/queries/books'
import usersDB from '../../database/queries/users';


*/