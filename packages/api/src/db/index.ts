import {getDBConfig}  from"../config/dbConfig";
import {Pool} from "pg"


export const pool = new Pool(getDBConfig())
// export const query = (text:any, params:any) => pool.query(text, params)

export class DBPool {

    private pool = new Pool(getDBConfig())
    
    constructor(){}

    public get(){
        // return (text:any, params:any) => this.pool.query(text, params)
        return this.pool
    }
}