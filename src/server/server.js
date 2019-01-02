// ----- Package Imports ----- //
import express from 'express';
import chalk from 'chalk';
// ----- File Imports ----- //
import tools from './tools/tools';
// ----- End Imports ----- //

const port = process.env.PORT || 3000;
console.log(`Port: ${port} `);
const app = express();

app.use(express.static(tools.publicPath()));

app.get('/express_backend', (req, res) => {
  res.send({
    express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT!!!!!',
  });
  console.log('Connection successful!');
});

app.listen(port, () => {
  console.log(
    chalk.white.bgRed(`Server started on port ${port} ...`),
  );
});

export default app;
