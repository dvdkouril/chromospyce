# chromospyce
A version of chromatin visualization library [chromospace](https://github.com/dvdkouril/chromospace) for computational notebooks. Made with [anywidget](https://github.com/manzt/anywidget).

**Heavily** work in progress.
## Installation

```sh
pip install chromospyce
```

## Development

Create a virtual environment and and install chromospyce in *editable* mode with the
optional development dependencies:

```sh
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

You then need to install the JavaScript dependencies and run the development server.

```sh
npm install
npm run dev
```

All is set to open `example.ipynb` in JupyterLab, VS Code, or your favorite editor
to start developing. Any change made in the `js` folder will be directly reflected
in the notebook.

