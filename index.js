const { Client, GatewayIntentBits, Partials, Collection, ActivityType, GuildChannel , channelLink} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const {DisTube} = require("distube");
const {SpotifyPlugin} = require("@distube/spotify")
const {SoundCloudPlugin} = require("@distube/soundcloud")
const {YtDlpPlugin} = require("@distube/yt-dlp")

const client = new Client({
      intents: [Guilds, GuildMembers, GuildMessages, "GuildVoiceStates"],
   partials: [User, Message, GuildMember, ThreadMember]
});

client.distube = new DisTube(client,{
  emitNewSongOnly: true,
  leaveOnFinish: false,
  emitAddSongWhenCreatingQueue: true,
  plugins: [new SpotifyPlugin({
    parallel: true,
    emitEventsAfterFetching: false,
    api: {
      clientId: "d5e17b93286945c88dcfddc1c0c5902d",
      clientSecret: "376263bbde204b7599da0e73ced55cde",
      topTracksCountry: "UK"
    }
  }), new SoundCloudPlugin(), new YtDlpPlugin({update:true, })]
})


client.config = require("./config.json")
client.events = new Collection();
client.commands = new Collection(); 
client.buttons = new Collection();  

const { loadEvents } = require("./Handlers/eventHandler")
const { loadDistubeEvents } = require("./Handlers/distubeEventHandler")

//Cuando el bot está listo
client.once('ready', (bot) => {
    client.user?.setStatus('dnd')
    client.user?.setActivity('Not Lewd Development', { type: ActivityType.Competing});
});


loadEvents(client);
loadDistubeEvents(client);
client.login(client.config.token);

module.exports = client;