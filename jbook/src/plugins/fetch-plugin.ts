import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild){
        build.onLoad({ filter: /.*/ }, async (args: any) => {
            console.log('onLoad', args);
     
            if (args.path === 'index.js') {
              return {
                loader: 'jsx',
                contents: inputCode,
              };
            } 
        
            // Check to see if file has already been fetched (stored in the cache)
            const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
            // if so, return stored file
            if (cachedResult){
                return cachedResult;
            }
            const { data, request } = await axios.get(args.path);
            // Files are stored in key-value pair
                // key = args.path
                // value = response/result object
            const result: esbuild.OnLoadResult = {
                loader: 'jsx',
                contents: data,
                resolveDir: new URL('./', request.responseURL).pathname
            };
            // if not, store response in cache and return result
            await fileCache.setItem(args.path, result);
            return result;
          });
        }
    };
};