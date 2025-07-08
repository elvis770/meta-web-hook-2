const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const VERIFY_TOKEN = 'appointTest';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Webhook server is up and running!');
});

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified! ✅');
    res.status(200).send(challenge);
  } else {
    console.log('Webhook verification failed ❌');
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  console.log('📬 Webhook event received:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
