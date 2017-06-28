const debug = require('debug')('main');
const assert = require('assert');
const path = require('path');
const cp = require('child_process');

function hyphenate(flag) {
  return flag.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function run(args) {
  return new Promise((resolve, reject) => {
    let smack_args = [];
    smack_args.push(`--clang-options=-I${path.resolve(__dirname, '../resources/include')}`);
    smack_args.push('--verifier', 'boogie');
    smack_args.push('--transform-bpl', 'bam -q --shadowing -o -');
    for (let entry of Object.entries(args)) {
      if (entry[0] === 'sources')
        continue;
      entry.splice(0, 1, `--${hyphenate(entry[0])}`);
      smack_args.push(entry.join("="));
    }
    smack_args.push(...args.sources);

    debug(`invoking smack with arguments:`)
    debug(smack_args);
    debug(`handing over stdio to smack`);
    let smack = cp.spawn('smack', smack_args, {stdio: 'inherit'});

    smack.on('close', (rc) => {
      debug(`smack returned with code ${rc}`);
      resolve(rc);
    });
  });
}

exports.run = run;
