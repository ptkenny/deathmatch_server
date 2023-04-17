export const LogoutAttemptCommand = {
	name: 'logout',
	execute: (player: any) => {
		player.setVariable('user_id', null);
		player.outputChatBox('{#00FF00} You are now logged out.');
	},
};
