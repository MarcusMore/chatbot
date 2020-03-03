const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  version: '2020-03-03',
  authenticator: new IamAuthenticator({
    apikey: 'fYo-S1MGHJk9iejAjqzVbgPSdoYKS36lrt42A85k6zoT',
  }),
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/65d57f1d-d7f0-4017-a0e4-0400b1023294',
});


assistant.createSession({
  assistantId: '28034039-a319-4a84-92b2-476dbf02c30a'
})
  .then(res => {
    //console.log(JSON.stringify(res, null, 2));
      console.log(JSON.stringify(res.result.session_id))
  })
  .catch(err => {
    console.log(err);
  });

  console.log(x);