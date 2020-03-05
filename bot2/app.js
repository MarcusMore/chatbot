const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const express = require('express');
const bodyParser = require('body-parser');
const prompt = require('prompt-sync')();

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

app.post('/conversation/', async (req, res) => {

	const service = new AssistantV2({
		version: '2019-02-28',
		authenticator: new IamAuthenticator({
			apikey: 'fYo-S1MGHJk9iejAjqzVbgPSdoYKS36lrt42A85k6zoT', // replace with API key
		})
	});
	
	const assistantId = '28034039-a319-4a84-92b2-476dbf02c30a'; // replace with assistant ID
	let sessionId;
	
	// Create session.
	service
		.createSession({
			assistantId,
		})
		.then(res => {
			sessionId = res.result.session_id;
			sendMessage({
				messageType: 'text',
				text: '',  // start conversation with empty message
			});
		})
		.catch(err => {
			console.log(err); // something went wrong
		});
		// Send message to assistant.
function sendMessage(messageInput) {
  service
    .message({
      assistantId,
      sessionId,
      input: messageInput,
    })
    .then(res => {
      processResponse(res.result);
    })
    .catch(err => {
      console.log(err); // something went wrong
    });
}

// Process the response.
function processResponse(response) {
  let endConversation = false;

  // Check for client actions requested by the assistant.
  if (response.output.actions) {
    if (response.output.actions[0].type === 'client'){
      if (response.output.actions[0].name === 'display_time') {
        // User asked what time it is, so we output the local system time.
        console.log('The current time is ' + new Date().toLocaleTimeString() + '.');
      } else if (response.output.actions[0].name === 'end_conversation') {
        // User said goodbye, so we're done.
        console.log(response.output.generic[0].text);
        endConversation = true;
      }
    }
  } else {
    // Display the output from assistant, if any. Supports only a single
    // response.
    if (response.output.generic) {
      if (response.output.generic.length > 0) {
        switch (response.output.generic[0].response_type) {
          case 'text':
            // It's a text response, so we just display it.
            console.log(response.output.generic[0].text);
            break;
          case 'option':
            // It's an option response, so we'll need to show the user
            // a list of choices.
            console.log(response.output.generic[0].title);
            const options = response.output.generic[0].options;
            // List the options by label.
            for (let i = 0; i < options.length; i++) {
              console.log((i+1).toString() + '. ' + options[i].label);
            }
            break;
        }
      }
    }
  }

  // If we're not done, prompt for the next round of input.
  if (!endConversation) {
    const newMessageFromUser = prompt('>> ');
    newMessageInput = {
      messageType: 'text',
      text: newMessageFromUser,
    }
    sendMessage(newMessageInput);
  } else {
    // We're done, so we delete the session.
    service
      .deleteSession({
        assistantId,
        sessionId,
      })
      .then(res => {
        return;
      })
      .catch(err => {
        console.log(err); // something went wrong
      });
  }
}
	// const { text, context = {} } = req.body;
	// const assistant = new AssistantV2({
	// 	authenticator: new IamAuthenticator({ apikey: 'fYo-S1MGHJk9iejAjqzVbgPSdoYKS36lrt42A85k6zoT' }),
	// 	url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/65d57f1d-d7f0-4017-a0e4-0400b1023294',
	// 	version: '2018-09-19'
	// });

	// assistant
	// 	.createSession({
	// 		assistantId: '28034039-a319-4a84-92b2-476dbf02c30a'
	// 	})
	// 	.then(res => {
	// 		//console.log(JSON.stringify(res, null, 2));
	// 		console.log(JSON.stringify(res.result.session_id));
	// 	})
	// 	.catch(err => {
	// 		//console.log(err);
	// 	});

		// assistant
		// 		.message({
		// 			input: {
		// 				message_type: 'text',
		// 				text: text
		// 			},
		// 			assistantId: '28034039-a319-4a84-92b2-476dbf02c30a',
		// 			sessionId: "24941333-5135-410a-856c-efee9caff4d7",
		// 			context,
		// 		})
		// 		.then(response => {
		// 			console.log(JSON.stringify(response.result, null, 2));
		// 		})
		// 		.catch(err => {
		// 			console.log(err);
		// 		});

});
app.listen(port, () => console.log(`Running on port ${port}`));
