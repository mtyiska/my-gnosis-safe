import { Service } from '@tsed/di';
import { DBPool } from 'src/db';
import { UpdateUserType } from 'src/types';
import * as db from 'zapatos/db';
import type * as s from 'zapatos/schema';
import {pool} from '../db';


@Service()
export class UserService{
    // constructor(private pool: DBPool){}

    async getUsers():Promise<s.multisig_users.Selectable[]>{
        return await db.sql<s.multisig_users.SQL, s.multisig_users.Selectable[]>`
        SELECT  * FROM ${"multisig_users"}`.run(pool);
    }

    async createUser(user:s.multisig_users.Insertable): Promise<s.multisig_users.Insertable[]> {
        const createUser: s.multisig_users.Insertable = {
            address:user.address
        }
      return await db.sql<s.multisig_users.SQL, s.multisig_users.Insertable[]>`
          INSERT INTO ${"multisig_users"} 
          (${db.cols(createUser)})
          VALUES (${db.vals(createUser)}) RETURNING *`
        .run(pool);
    }
    
    async getUserById(id:string): Promise<s.multisig_users.Selectable>{
        return await db.sql<s.multisig_users.SQL, s.multisig_users.Selectable>`
        SELECT * FROM ${"multisig_users"} WHERE ${{user_id: id}}`.run(pool);
    }
    
    async updateUser(id:string, data:UpdateUserType):Promise<s.multisig_users.Updatable>{
        const query = updateUserByID(id, data);
        const colValues = Object.values(data)
        const colAndId = [...colValues, id]
        // const q = 
        await pool.query(query, colAndId);
        return await this.getUserById(id);
    }
    
    
    async deleteUser(id:string):Promise<boolean>{
        db.sql<s.multisig_users.SQL, s.multisig_users.Updatable[]>`
        DELETE FROM ${"multisig_users"}
        WHERE ${{user_id: id}}`.run(pool);
        return true;
    }
    
}




function updateUserByID (id:string, cols:s.multisig_users.Updatable) {
    const query = ['UPDATE multisig_users'];
    query.push('SET');
  
    const set:any = [];
    Object.keys(cols).forEach(function (key, i) {
      set.push(key + ' = $' + (i + 1) + ''); 
    });
    query.push(set.join(', '));
    query.push('WHERE id = $' + (Object.keys(cols).length + 1) +'');
  
    return query.join(' ');
  }




