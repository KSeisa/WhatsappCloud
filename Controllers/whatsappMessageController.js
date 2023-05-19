async function sendBasicMessage(to, body) {
  try {
    const result = await bot.sendText(to, body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.sendStatus(500);
  }
}

module.exports = {
  sendBasicMessage,
};