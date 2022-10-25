import AppDataSource from './data-source';

import app from './app';

AppDataSource.initialize()
  .then(() => {
    console.log('Connected database!');
    const PORT = process.env.PORT || 3333;

    app.listen(PORT, () =>
      console.log(`App running!\nhttp://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error(error));
