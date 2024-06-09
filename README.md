# chromospyce

This is an [anywidget](https://github.com/manzt/anywidget)-powered version of
the [chromospace](https://github.com/dvdkouril/chromospace) library intended
for use in computational notebooks, such as Jupyter Notebook.

## Basic usage
The available functionality is pretty limited at this moment. We will stabilize the API as we go. At this point, you can display 3D chromatin models.

Use case 1: Passing raw numpy array
```python
test_data = make_random_3D_chromatin_structure(n=100)
data = np.array(test_data)
chromospyce.Widget(structure_nparray=data.tobytes())
```
Use case 2: Passing XYZ string
```python
test_string = """
6
sample = 0
CA	1.101124	0.547027	-2.299305
CA	-0.919687	1.275041	-3.201912
CA	-0.974526	1.144577	-4.491504
CA	-0.881394	-0.011930	-4.496625
CA	-0.455539	-2.518781	-2.500660
CA	-0.626368	-2.086400	-3.427676
"""
chromospyce.Widget(structure_string=test_string, delimiter="\t")
```

Use case 3: Passing XYZ file path
```python
import pathlib
test_path = pathlib.Path("./sample_data/test.xyz")
chromospyce.Widget(structure_path=test_path, delimiter="\t")
```

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
