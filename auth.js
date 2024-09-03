'use strict';

const Bcrypt = require('bcrypt');

const users = {
    Luke: {
        username: 'Luke',
        password: '$2a$10$rOvIJGiJWGIPIgiDHh8FPe1LoGhOED7YJHD843VSEzmZHx15BrWn.',   // DadSucks
        name: 'Luke Skywalker',
        id: '1'
    }
};

const validate = async (request, username, password) => {
    const user = users[username];
    if (!user) {
        return { credentials: null, isValid: false };
    }
    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };
    return { isValid, credentials };
};

module.exports = {
    validate
};
