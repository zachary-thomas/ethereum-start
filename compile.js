const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Will work on windows or unix file systems
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts.[':Inbox'];

