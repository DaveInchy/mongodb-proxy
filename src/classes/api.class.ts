import SQLData from './db.class';

export default class SQLAPI extends SQLData {
    constructor(database: string = 'data.sqlite') {
        super(database);
        return this;
    }

    // Example: get user by username
    async getUserByUsername(username: string) {
        return this.get('SELECT * FROM users WHERE username = ?', [username]);
    }

    // Example: create user
    async createUser(username: string, email: string, password: string) {
        return this.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    }

    // Example: get all users
    async getAllUsers() {
        return this.all('SELECT * FROM users');
    }
}