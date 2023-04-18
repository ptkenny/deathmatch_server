export const LogoutAttemptCommand = {
    name: 'logout',
    execute: (player: any) => {
        player.setVariable('user_id', null);
        player.outputChatBox('{#00FF00} You are now logged out.');
    },
};

export const LoginAttemptCommand = {
    name: 'login',
    execute: (player: any) => {
        console.log('login command executed');
        player.call('openLoginView');
    },
};
