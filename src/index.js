import { initMongoDB } from './db/initMongoDb.js';

import { startServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();
