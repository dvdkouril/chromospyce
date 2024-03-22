import importlib.metadata
import pathlib

import anywidget
import traitlets

try:
    __version__ = importlib.metadata.version("chromospyce")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

def text_file_serializer(path: pathlib.Path, widget):
    if path.exists():
        if path.is_file():
            return {
                "name": path.name,
                "contents": path.read_text()
            }

class Widget(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    _css = pathlib.Path(__file__).parent / "static" / "widget.css"
    model = traitlets.Instance(pathlib.Path, default_value=pathlib.Path("/home")).tag(sync=True, to_json=text_file_serializer)
    delimiter = traitlets.Unicode(" ").tag(sync=True)
    nparr_model = traitlets.Bytes().tag(sync=True)
    is_numpy = traitlets.Bool(False).tag(sync=True)

