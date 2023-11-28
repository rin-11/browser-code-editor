"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("local-api");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    // command to start the serve with ability to name the file from the CLI
    // [] make filename optional
    .description('Open file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    // option for user to determine which port to run the server on else default 4005
    /// <> indicate required value for port hence default provided
    .action((filename = 'notebook.js', options) => {
    // find the path the user is saving the file in
    const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
    (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir);
});
