import express from 'express';
import path from 'path';

// saving files on the hard drive
import fs from 'fs/promises';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

interface LocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  // body parsing middleware
  router.use(express.json());

  const fullPath = path.join(dir, filename);

    // Make sure cells file exists else return default list
    router.get('/cells', async (req, res) => {

        const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === 'string';
        };

        try {
        // Read the file
        const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

        res.send(JSON.parse(result));
        } catch (err) {
        if (isLocalApiError(err)) {
            if (err.code === 'ENOENT') {
            // parse a list of cells out of it
            // send list of cells back to browser
            await fs.writeFile(fullPath, '[]', 'utf-8');
            res.send([]);
            }
        } else {
            throw err;
        }
        }
    });

// Make sure cells file exists else return default list
    router.post('/cells', async (req, res) => {
        // Take the list of cells from the request object
        // serialize them
        const { cells }: { cells: Cell[] } = req.body;

        // Write the cells into the file
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

        res.send({ status: 'ok' });
    });

  return router;
};
