"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    // command to start the serve with ability to name the file from the CLI
    // [] make filename optional
    .description('Open file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    // option for user to determine which port to run the server on else default 4005
    /// <> indicate required value for port hence default provided
    .action(() => {
    console.log('Ready to serve');
});
