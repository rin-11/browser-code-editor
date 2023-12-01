"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const local_api_1 = require("@rin11/local-api");
const isProduction = process.env.NODE_ENV === 'production';
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    // command to start the serve with ability to name the file from the CLI
    // [] make filename optional
    .description('Open file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    // option for user to determine which port to run the server on else default 4005
    /// <> indicate required value for port hence default provided
    .action((filename = "notebook.js", options) => __awaiter(void 0, void 0, void 0, function* () {
    const isLocalApiError = (err) => {
        return typeof err.code === "string";
    };
    // error handling in case port is already running
    try {
        // find the path the user is saving the file in
        const dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        yield (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction);
        // let user know server was successfully started
        console.log(`Opened ${filename}. Navigate to https:localhost:${options.port} to edit this file.`);
    }
    catch (err) {
        if (isLocalApiError(err)) {
            // server is already in use
            if (err.code === "EADDRINUSE") {
                console.error("Port is in use. Try running on a different port.");
            }
            // any other error type
        }
        else if (err instanceof Error) {
            console.log("Heres the problem", err.message);
        }
        // cancel the program if error found
        process.exit(1);
    }
}));
