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

            // check for CSS files 
            const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
            const contents = fileType === 'css' ?
                `
                    const style = document.createElement('style');
                    styler.innerText = 'body { background-color: "red" }';
                    document.head.appendChild(style);
                `   : data

            const result: esbuild.OnLoadResult = {
                loader: 'jsx',
                contents,
                resolveDir: new URL('./', request.responseURL).pathname
            };
                // Files are stored in key-value pair
                    // key = args.path
                    // value = response/result object

            // if not, store response in cache and return result
            await fileCache.setItem(args.path, result);
            return result;
          });
        }
    };
};