import importlib.metadata
import pathlib

import anywidget
import traitlets

try:
    __version__ = importlib.metadata.version("chromospyce")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

def text_file_serializer(path: pathlib.Path, widget):
    if path is None:
        return None

    if path.exists():
        if path.is_file():
            return {
                "name": path.name,
                "contents": path.read_text()
            }

class Widget(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    _css = pathlib.Path(__file__).parent / "static" / "widget.css"

    # 3D structure input type: 1) path to file, 2) string, 3) numpy array
    structure_path = traitlets.Instance(pathlib.Path, default_value=None, allow_none=True).tag(sync=True, to_json=text_file_serializer)
    structure_string = traitlets.Unicode("").tag(sync=True)
    structure_nparray = traitlets.Bytes().tag(sync=True)

    # additional parameters
    delimiter = traitlets.Unicode(" ").tag(sync=True)

    def add_chunk_numpyarray():
        print("not implemented")

    def add_chunk_xyz():
        print("not implemented")

