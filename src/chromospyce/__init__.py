import importlib.metadata
import pathlib

import anywidget
import traitlets

try:
    __version__ = importlib.metadata.version("chromospyce")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

class Widget(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    _css = pathlib.Path(__file__).parent / "static" / "widget.css"

    # 3D structure input: assumes Apache Arrow format
    structure = traitlets.Bytes().tag(sync=True)
    # ViewConfig: defines how the 3D structure will be shown
    viewconfig = traitlets.Dict().tag(sync=True)
