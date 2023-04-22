# spacy-wasm

An attempt to make [spaCy](https://github.com/explosion/spaCy) work on the client-side in a browser context using web assembly.

## How though?

I'm using [pyodide](https://github.com/pyodide/pyodide) which is essentially cpython but compiled for wasm using `emscripten`. The javascript calls the python script which loads the spacy model and returns a proxy function to a python function. Which is later executed to query the displacy rendered html string by passing in the text prompt.

To be noted, spacy and certain other depending libraries need to be compiled into web assembly (since they are written in C, pure python packages can be directly imported). I made use of [exodide](https://github.com/ymd-h/exodide) and this [DockerFile](https://github.com/ymd-h/exodide/blob/master/example-spaCy/Dockerfile) to build the packages. Additionally, I have put sample packages that I built in the `packages` directory.

> `en_core_web_sm` doesn't need compiling since its pure python by default.
