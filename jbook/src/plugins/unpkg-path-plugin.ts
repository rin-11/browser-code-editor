import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache'
});


export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js'){
            return { path: args.path, namespace: 'a' };
        } 
        // check for relative path
        if (args.path.includes('./') || args.path.includes('../')) {
            return {
                namespace: 'a',
                path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
            };
        }
        return {
            namespace: 'a',
            path: `https://unpkg.com/${args.path}`
        };
        // else if (args.path === 'tiny-test-pkg'){
        //     return { 
        //         path: 'https://www.unpkg.com/tiny-test-pkg@1.0.0/index.js',
        //         namespace: 'a',
        //     };
        // }
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, { useState } from 'react';
              console.log(React, useState)
            `,
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
    },
  };
};