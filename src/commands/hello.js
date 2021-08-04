const { SlashCommand, CommandOptionType, ApplicationCommandPermissionType } = require('slash-create');
const s = require('../config/settings');
ds = s.settings['discord']
guildid = ds['guild']
module.exports = class HelloCommand extends SlashCommand {
    constructor(creator) {
      super(creator, {
        name: 'hello',
        description: 'sends a friendly message',
        // Whether to enable this command for everyone by default
        defaultPermission: false,
        // Permissions are mapped by guild ID like this
        permissions: {
          guildid: [
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