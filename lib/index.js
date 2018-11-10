const Debug = require('debug');
const debug = Debug('ctverif');
const assert = require('assert');
const path = require('path');
const cp = require('child_process');

Debug.formatters.a = (arr) => arr.map(s => s.replace(/([^=]*\s[^=]*)/, "'$1'")).join(" ");

function hyphenate(flag) {
  return flag.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function run(args) {
  return new Promise((resolve, reject) => {
    debug(`args: %O`, args);
    let smack_args = [];
    let clang_opts = [];
    clang_opts.push(`-I${path.resolve(__dirname, '../resources/include')}`);
    smack_args.push('--verifier', 'boogie');
    smack_args.push('--transform-bpl', 'bam -q --shadowing -o -');
    for (let [key, value] of Object.entries(args)) {
      if (key === 'sources')
        continue;
      else if (key === 'clangOptions')
        clang_opts.push(value);
      else
        smack_args.push(`--${hyphenate(key)}=${value}`);
    }
    smack_args.push(...args.sources, `--clang-options=${clang_opts.join(' ')}`);

    debug(`invoking smack with options: %o`, smack_args);
    debug(`smack %a`, smack_args);
    debug(`handing over stdio to smack`);
    let smack = cp.spawn('smack', smack_args, {stdio: 'inherit'});

    smack.on('close', (rc) => {
      debug(`smack returned with code ${rc}`);
      resolve(rc);
    });
  });
}

exports.run = run;
