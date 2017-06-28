#!/usr/bin/env node
"use strict";

let fs = require('fs');
let path = require('path');
let meow = require('meow');
let index = require('../lib/index');
let meta = require('../package.json');

let cli = meow(`
  Usage
    $ ${meta.name} SOURCE-CODE.c

  Options
    --entry-points PROC [PROC ...]  Name(s) of entry point(s).
    --clang-options OPTIONS         Options for the C compiler.
    --time-limit N                  Bound on verification time.
    --unroll N                      Bound on loop unrolling.

  Examples
    $ ${meta.name} sha256.c --clang-options '-Imbedtls/include'
`, {
  default: {
  }
});

(async () => {
  if (cli.input.length < 1)
    cli.showHelp();

  let args = Object.assign({}, cli.flags, {sources: cli.input});
  console.log(`${cli.pkg.name} version ${cli.pkg.version}`);
  process.exit(await index.run(args));
})();
