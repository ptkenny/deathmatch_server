export const OpenLoginGameEvent = {
    name: 'openLoginView',
    execute: () => {
        mp.console.logInfo('Login view opened');
        mp.browsers.new('package://client_ui/index.html/login');
    },
};
