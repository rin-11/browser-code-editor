import path from 'path';
import { Command } from 'commander';
import { serve }from 'local-api';


export const serveCommand = new Command()
    .command('serve [filename]')
    // command to start the serve with ability to name the file from the CLI
    // [] make filename optional

    .description('Open file for editing')

    .option('-p, --port <number>', 'port to run server on', '4005')
    // option for user to determine which port to run the server on else default 4005
    /// <> indicate required value for port hence default provided

    .action((filename = 'notebook.js', options: { port: string }) => {
        // find the path the user is saving the file in
        const dir = path.join(process.cwd(), path.dirname(filename));
        serve(parseInt(options.port), path.basename(filename), dir);
      });
