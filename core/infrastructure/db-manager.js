"use strict"

let config = localrequire('config.json');
let dbClient = localrequire(config.database.client);


module.exports = dbClient;