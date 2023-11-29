import path from 'path';
import { Command } from 'commander';
import { serve }from 'local-api';

interface LocalApiError {
  code: string;
}

export const serveCommand = new Command()
    .command('serve [filename]')
    // command to start the serve with ability to name the file from the CLI
    // [] make filename optional

    .description('Open file for editing')

    .option('-p, --port <number>', 'port to run server on', '4005')
    // option for user to determine which port to run the server on else default 4005
    /// <> indicate required value for port hence default provided

    .action(async (filename = "notebook.js", options: { port: string }) => {
 
      const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === "string";
      };

    // error handling in case port is already running
      try {
        // find the path the user is saving the file in
        const dir = path.join(process.cwd(), path.dirname(filename));
        await serve(parseInt(options.port), path.basename(filename), dir);

        // let user know server was successfully started
        console.log(
          `Opened ${filename}. Navigate to https:..localhost:${options.port} to edit this file.`
        )


      } catch (err) {
        if (isLocalApiError(err)) {

          // server is already in use
          if (err.code === "EADDRINUSE") {
            console.error("Port is in use. Try running on a different port.");
          }
        
        // any other error type
        } else if (err instanceof Error) {
          console.log("Heres the problem", err.message);
        }
        // cancel the program if error found
        process.exit(1);
      }
    });
  

