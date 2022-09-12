import app from './app';
import logger from './logger';

app.listen(3000, () => {
  // eslint-disable-next-line no-unused-expressions
  console.log('Server on.');
  logger.log('info', 'Server runing');
});
