const path = require('path');
const express = require('express');

const settings = require('./config/settings');

const serverApp = express();

function launch(servePath, port) {
  serverApp.use(express.static(servePath));

  serverApp.get('*', (req, res) => {
    res.sendFile(path.join(servePath, req.url));
  });

  serverApp.listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Listening on: ${port}`);
    console.log(`Serving content from: ${servePath}`);
  });
}

launch(settings.paths.prodOutput, settings.hotPort);
