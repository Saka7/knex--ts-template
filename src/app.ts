import { UserRepository } from "./user.repository";

const userRepository = new UserRepository();

(async () => {
    console.log(await userRepository.findOne(1));
    console.log(await userRepository.add({name: 'random-name', email: 'random-email', password: 'password'}));
    console.log(await userRepository.findAll());
    console.log(await userRepository.update(2, {name: 'newName'}));
    console.log(await userRepository.findAll());
    console.log(await userRepository.remove(1));
    console.log(await userRepository.findAll());

    console.log(userRepository.findOne(1).toString());
    console.log(userRepository.findByName('name').toString());
    console.log(userRepository.findByEmail('email').toString());
    console.log(userRepository.add({name: 'random', email: 'email', password: 'password'}).toString());
    console.log(userRepository.update(1,{name: 'name', email: 'email'}).toString());
    console.log(userRepository.remove(1).toString());
    console.log(userRepository.findAll().toString());

    userRepository.closeConnection();
})();

