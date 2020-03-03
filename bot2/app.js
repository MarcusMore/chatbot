const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require('express');
const bodyParser = require('body-parser');



const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;


app.post('/conversation/', async (req, res) => {
  const { text, context = {} } = req.body;
  const assistant = new AssistantV2({
    authenticator: new IamAuthenticator({ apikey: 'fYo-S1MGHJk9iejAjqzVbgPSdoYKS36lrt42A85k6zoT'}),
    url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/65d57f1d-d7f0-4017-a0e4-0400b1023294',
    version: '2018-09-19'
  });
  
  assistant.createSession(
    {
    assistantId: '28034039-a319-4a84-92b2-476dbf02c30a'
    }
  )
  .then(res => {
   //console.log(JSON.stringify(res, null, 2));
    console.log(JSON.stringify(res.result.session_id))
  })
  .catch(err => {
    //console.log(err);
  });
  
  assistant.message(
    {
      input: { 
        'message_type': 'text',
        'text': text },
      assistantId: '28034039-a319-4a84-92b2-476dbf02c30a',
      sessionId: JSON.stringify(res.result.session_id),
      context,
    })
    .then(response => {
      console.log(JSON.stringify(response.result, null, 2));
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => console.log(`Running on port ${port}`));