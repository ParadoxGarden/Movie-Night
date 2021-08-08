const { SlashCommand, ApplicationCommandPermissionType } = require('slash-create');
const s = require('../config/settings');
const ds = s.settings['discord'];
const guildid = ds['guild'];
const perf = {};
perf[guildid] =
	[{
		type: ApplicationCommandPermissionType.ROLE,
		id: ds['role'],
		permission: true,
	}];
module.exports = class HelloCommand extends SlashCommand {
	constructor(creator) {
		super(creator, {
			name: 'hello',
			description: 'sends a friendly message',
			// Whether to enable this command for everyone by default
			defaultPermission: false,
			// Permissions are mapped by guild ID like this
			permissions: perf,
		});
		this.filePath = __filename;
	}
	async run(ctx) {
		return `Hello ${ctx.user.username}!`;
	}
};