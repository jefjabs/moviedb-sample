const app    = require('express')();

require("./autoload.js").start(app);
require("./boot.js").start(app);

