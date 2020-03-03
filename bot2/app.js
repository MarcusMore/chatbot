const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  authenticator: new IamAuthenticator({ apikey: 'fYo-S1MGHJk9iejAjqzVbgPSdoYKS36lrt42A85k6zoT'}),
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/65d57f1d-d7f0-4017-a0e4-0400b1023294',
  version: '2018-09-19'
});

sessionID = null;

assistant.message(
  {
    input: { text: "I want to open a ticket" },
    assistantId: '28034039-a319-4a84-92b2-476dbf02c30a',
    sessionId: '75c15e80-5d20-49ab-80d0-221db714c227',
  })
  .then(response => {
    console.log(JSON.stringify(response.result, null, 2));
  })
  .catch(err => {
    console.log(err);
  });