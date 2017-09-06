import { UserRepository } from './user.repository';
import { User } from "./user.model";

describe('User Repository', () => {

    const userRepository = new UserRepository();
    const db = userRepository.getDb();
    const defaultUser = new User(1,'name','email','password');

    beforeAll(async () => {
        await db.migrate.rollback();
        await db.migrate.latest();
        await db.seed.run();
    });

    afterAll(async () => {
        await db.migrate.rollback();
        await db.migrate.latest();
        await db.seed.run();
        await userRepository.closeConnection();
    });

    afterEach(async () => {
        await db('users').del();
        await db.seed.run();
    });

    it('should find user by id', async () => {
        const id = 1;
        const user = await userRepository.findOne(id);

        expect(user).not.toBeNull();
        expect(user).toBeDefined();
        expect(user.id).toBe(id);
        expect(user).toEqual(defaultUser);
    });

    it('should find user by username', async () => {
        const username = 'name';
        const user = await userRepository.findByName(username);

        expect(user).not.toBeNull();
        expect(user).toBeDefined();
        expect(user.name).toBe(username);
        expect(user).toEqual(defaultUser);
    });

    it('should find user by email', async () => {
        const email = 'email';
        const user = await userRepository.findByEmail(email);

        expect(user).not.toBeNull();
        expect(user).toBeDefined();
        expect(user.email).toBe(email);
        expect(user).toEqual(defaultUser);
    });

    it('should get all users', async () => {
        const users = await userRepository.findAll();

        expect(users).not.toBeNull();
        expect(users).toBeDefined();
        expect(users.length).toBe(1);
        expect(users).toEqual([defaultUser]);
    });

    it('should add new user', async () => {
        const user = {
            name: 'new-name',
            email: 'new-email',
            password: 'password'
        };
        const addedUserId = await userRepository.add(user);

        expect(addedUserId).not.toBeNull();
        expect(addedUserId).toBeDefined();
        // Depends on database vendor
        expect(addedUserId).toEqual(defaultUser.id + 1);
    });

    it('should fully update user', async () => {
        let newUserCredential = new User(null, 'newName', 'newEmail', 'newPassword');
        await userRepository.update(defaultUser.id, newUserCredential);
        const updatedUser = await userRepository.findOne(defaultUser.id);
        newUserCredential['id'] = defaultUser.id;

        expect(updatedUser).not.toBeNull();
        expect(updatedUser).toBeDefined();
        expect(updatedUser).toEqual(newUserCredential);
    });


    it('should partially update user', async () => {
        const newUserCredentials = {name: 'random'};
        await userRepository.update(defaultUser.id, newUserCredentials);
        const updatedUser = await userRepository.findOne(defaultUser.id);

        expect(updatedUser).not.toBeNull();
        expect(updatedUser).toBeDefined();

        expect(updatedUser).toEqual(new User(
            defaultUser.id,
            newUserCredentials.name,
            defaultUser.email,
            defaultUser.password
        ));
    });

    it('should delete user by id', async () => {
        const deletedUsers = await userRepository.remove(defaultUser.id);
        expect(deletedUsers).not.toBeNull();
        expect(deletedUsers).toBeDefined();
        expect(deletedUsers).toBe(1);
        expect((await userRepository.findAll()).length).toBe(0);
    });

});