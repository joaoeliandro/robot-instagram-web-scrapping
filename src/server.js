require('dotenv/config');
const readlineSync = require('readline-sync');

const ig = require('./instagram');

const nlp = require('cloudmersive-nlp-api-client');

const defaultClient = nlp.ApiClient.instance;
// Configure API key authorization: Apikey
const Apikey = defaultClient.authentications['ApiKey'];

// Apikey.apiKey = 'b2c30d8d-b12a-4e2e-be89-02e948c43169';

const apiInstance = new nlp.LanguageDetectionApi();

function detectLanguage(textToDetect) {
  const callback = function (error, data, response) {
    if (error) console.error(error);
    else {
      console.log('API called successfully. Returned data: ' + data);
      console.log(response);
    }
  };

  apiInstance.languageDetectionPost(textToDetect, callback);
}

(async () => {
  await ig.initialize();

  const username = readlineSync.question("Username: ") || process.env.LOGIN;
  const password = readlineSync.question("Password: ",
    { hideEchoBack: true }) || process.env.PASSWORD;

  await ig.login(username, password);

  const unfollowProcess = readlineSync.question("Quer iniciar o processo? (s/n) ");

  await ig.unfollow(unfollowProcess);
})();
