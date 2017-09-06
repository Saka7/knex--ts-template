export class User {

    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public password?: string
    ) {}

    toString() {
        return JSON.stringify(this);
    }
}