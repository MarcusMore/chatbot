const chatbot = require('../chatbot/chatbot');

module.exports = app => {

  app.get('/', (req, res)=>{
    res.send({'hello': 'Marcus'});
  });

  app.post('/api/df_text_query', async(req, res)=>{
    
    try{
      let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
      res.send(responses[0].queryResult);
    }catch (error) {
      console.log('That did not go well.')
      console.error(error)
      process.exit(1)
  }
    
    
            // .then(responses => {
            //     console.log('Detected intent');
            //     const result = responses[0].queryResult;
            //     console.log(`  Query: ${result.queryText}`);
            //     console.log(`  Response: ${result.fulfillmentText}`);
            //     if (result.intent) {
            //         console.log(`  Intent: ${result.intent.displayName}`);
            //     } else {
            //         console.log(`  No intent matched.`);
            //     }
            // })
            // .catch(err => {
            //     console.error('ERROR:', err);
            // });
  });

  app.post('/api/df_event_query', async(req, res)=>{
    let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
    res.send(responses[0].queryResult);
  });
}