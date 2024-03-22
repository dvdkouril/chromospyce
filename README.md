# chromospyce

## Installation

```sh
pip install chromospyce
```

## Development installation

Create a virtual environment and and install chromospyce in _editable_ mode with
the optional development dependencies:

```sh
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

All is set to open `example.ipynb` in JupyterLab, VS Code, or your favorite
editor to start developing. Any change made in the `src/chromospyce/static`
folder will be directly reflected in the notebook.
