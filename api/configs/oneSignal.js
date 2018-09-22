const oneSignal = require('onesignal-node');
const oneSignalHelper = require('../helpers/oneSignalHelper');

module.exports = (app) => {
  const client = new oneSignal.Client({
    userAuthKey: process.env.USER_KEY,
    app: { appAuthKey: process.env.API_KEY, appId: process.env.APP_ID }
  });
  oneSignalHelper.pushMessage(client, 'teste wrapper', '0fb1402e-9853-4215-bac8-2ff2a9fee8e7');

  app.client = client;
}
