[![Build Status](https://travis-ci.org/michael-emmi/ctverif.svg?branch=master)](https://travis-ci.org/michael-emmi/ctverif)
[![npm version](https://badge.fury.io/js/ctverif.svg)](https://badge.fury.io/js/ctverif)

# ctverif

A tool for verifying constant-time code.

## Requirements

The basic requirements are:

* [Smack][]
* [Bam][]

which rely transitively on:

* [Clang][]
* [LLVM][]
* [Boogie][]
* [Corral][]
* [Z3][]

## Installation

Install from npm:

    $ npm i -g ctverif

## Usage

Run without arguments for usage:

    $ ctverif

## Development

Emulate installation of local repository:

    $ npm link

Release a new version to npm:

    $ npm version [major|minor|patch]
    $ npm publish

[Clang]: https://clang.llvm.org
[LLVM]: http://llvm.org
[Smack]: https://github.com/smackers/smack
[Boogie]: https://github.com/boogie-org/boogie
[Corral]: https://github.com/boogie-org/corral
[Z3]: https://github.com/Z3Prover/z3
[Bam]: https://github.com/michael-emmi/bam-bam-boogieman
