const fs = require('fs');
module.exports = (client) => {
  let c = 0;
    fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((event) => {
      	require(`../events/${event}`);
      c++;
    })
  setTimeout(() => {
client.logger(`〢 Loaded ${c} Events`.bold)
  }, 1000)
};
