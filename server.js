const app = require('./app');
const { SERVER_PORT } = require('./config');

const port = SERVER_PORT || '3000';

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
