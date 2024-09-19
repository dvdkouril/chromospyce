import importlib.metadata
import pathlib

import anywidget
import traitlets

try:
    __version__ = importlib.metadata.version("chromospyce")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


def from_numpy(nparr):
    """
    This assumes `nparr` is a two-dimensional numpy array with xyz coordinates: [[x,y,z], ...]
    """
    xyz = nparr
    # Convert numpy array to pandas dataframe
    xyzDF = pd.DataFrame({'x': xyz[:, 0], 'y': xyz[:, 1], 'z': xyz[:, 2]})
    # Convert pandas DF to Arrow Table
    xyzArrowTable = pa.Table.from_pandas(xyzDF)
    # Convert the Table to bytes
    output_stream = pa.BufferOutputStream()
    with pa.ipc.RecordBatchStreamWriter(output_stream, xyzArrowTable.schema) as writer:
        writer.write_table(xyzArrowTable)

    # Get the table as Bytes
    table_bytes = output_stream.getvalue().to_pybytes()
    return table_bytes

class Widget(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    _css = pathlib.Path(__file__).parent / "static" / "widget.css"

    # 3D structure input: assumes Apache Arrow format
    structure = traitlets.Bytes().tag(sync=True)
    # ViewConfig: defines how the 3D structure will be shown
    viewconfig = traitlets.Dict().tag(sync=True)
