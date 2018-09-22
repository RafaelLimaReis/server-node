const oneSignal = require('onesignal-node');

const pushMessage = (client, message, userId) => {
  /** criando notificação */
  var firstNotification = new oneSignal.Notification({
    contents: {
      en: message
    },
    include_player_ids: [userId]
  });

  /** enviando */
  client.sendNotification(firstNotification, function (err, httpResponse, data) {
    if (err) {
      console.log('Something went wrong...');
    } else {
      console.log(data);
    }
  });
}

module.exports = { pushMessage };
