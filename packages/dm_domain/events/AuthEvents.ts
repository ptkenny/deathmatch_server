import crypto from 'crypto';
import { User } from '../db/schema';

function hashStringToPassword(str: string) {
    const salt = crypto.randomBytes(16).toString('hex');
    return crypto.pbkdf2Sync(str, salt, 1000, 64, 'sha512').toString('hex');
}

export const LoginAttemptGameEvent = {
    name: 'loginAttempt',
    execute: async (player: any, email: string, password: string) => {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            player.outputChatBox('{#FF0000} Invalid username or password.');
            return;
        }
        const userData = user?.get({ plain: true });
        if (hashStringToPassword(password) !== userData.password) {
            player.outputChatBox('{#FF0000} Invalid username or password.');
            return;
        }
        player.setVariable('user_id', userData.user_id);
        player.outputChatBox('{#00FF00} You are now logged in.');
        // TODO(patrick): Add a /logout command to unset the user_id variable.
        // TODO(patrick): Send an event to the client to automatically close the login window.
    },
};

export const RegisterAttemptGameEvent = {
    name: 'registerAttempt',
    execute: async (player: any, email: string, password: string) => {
        let user;
        try {
            user = await User.create({ email: email, password: hashStringToPassword(password) });
        } catch (e) {
            player.outputChatBox('{#FF0000} An account with that email already exists.');
            console.log(`Error creating user with email ${email}: ${e}`);
            return;
        }
        // TODO(patrick): Should we send a verification email here or make that a different, opt-in command like /verifyemail?
        player.outputChatBox('{#00FF00} Your account has been created. Please log in.');
    },
};
