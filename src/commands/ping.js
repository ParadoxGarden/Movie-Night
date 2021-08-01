const { SlashCommand, CommandOptionType, ApplicationCommandPermissionType } = require('slash-create');
const s = require('../settings');
ds = s.settings['discord']

module.exports = class HelloCommand extends SlashCommand {
    constructor(creator) {
      super(creator, {
        name: 'hello',
        description: 'sends a friendly message',
        // Whether to enable this command for everyone by default
        defaultPermission: false,
        // Permissions are mapped by guild ID like this
        permissions: {
          870106495474368524: [
            {
              type: ApplicationCommandPermissionType.ROLE,
              id: ds['role'],
              permission: true,
            },
          ],
        }
      });
      this.filePath = __filename;
  }

  async run(ctx) {
    return 'Hi Snazzah!';
  }
}