import * as Knex from "knex";
import * as Bluebird from 'bluebird';
import knexInstance from './knex';

import { User } from "./user.model";

/**
 * User Repository
 * Persistence manager for user entity
 */
export class UserRepository {

    private db: Knex;

    /**
     * @param {Knex} db [optional] Knex Database instance
     */
    constructor(db = knexInstance) {
        this.db = db;
    }

    /**
     * Get database instance
     * @returns {Knex}
     */
    getDb(): Knex {
        return this.db;
    }

    /**
     * Destroys database connection
     * @returns {Bluebird<void>}
     */
    closeConnection(): Bluebird<void> {
        return this.db.destroy();
    }

    /**
     * Finds user by id
     * @param {number} id
     * @returns {Bluebird<User>}
     */
    findOne(id: number): Bluebird<User> {
        return this.db('users').select('*').where({id}).first();
    }

    /**
     * Finds user by name
     * @param {string} name
     * @returns {Bluebird<User>}
     */
    findByName(name: string): Bluebird<User> {
        return this.db('users').select('*').where({name}).first();
    }

    /**
     * Find user by email
     * @param {string} email
     * @returns {Bluebird<User>}
     */
    findByEmail(email: string): Bluebird<User> {
        return this.db('users').select('*').where({email}).first();
    }

    /**
     * Retrieves all users
     * @returns {Bluebird<Array<User>>}
     */
    findAll(): Bluebird<Array<User>> {
        return this.db('users').select('*');
    }

    /**
     * Inserts passed user, if id isn't specified it'll be auto-generated
     *
     * @param {User} user
     * @returns {Bluebird<number>} id or inserted user
     */
    add(user: User): Bluebird<number> {
        // TODO refactor
        return this.db('users').insert(user).then(ids => ids[0]);
    }

    /**
     * Updates user by id
     *
     * @param {number} id
     * @param {User} user
     * @returns {Bluebird<User>}
     */
    update(id: number, user: User): Bluebird<User> {
        let userToAdd = Object.assign({}, user);
        delete userToAdd.id;
        return this.db('users').where({id}).update(userToAdd);
    }

    /**
     * Removes user by given id
     *
     * @param {number} id
     * @returns {Bluebird<number>} number of removed users
     */
    remove(id: number): Bluebird<number> {
       return this.db('users').where({id}).del();
    }

}