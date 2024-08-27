// @deno-types="npm:chromospace"
// import * as chs from "https://esm.sh/chromospace@0.0.10";
import * as chs from "http://localhost:5173/src/main.ts";

/**
 * @typedef TextFile
 * @property {string} name
 * @property {string} contents
 */

/**
 * @typedef Model
 * @property {DataView} [nparr_model]
 * @property {boolean} is_numpy
 * @property {TextFile} model
 * @property {string} delimiter
 */

export default {
  /** @type {import("npm:@anywidget/types@0.1.6").Render<Model>} */
  render({ model, el }) {

    const options = {
      center: true,
      normalize: true,
    };

    //~ create a scene
    let chromatinScene = chs.initScene();

    //~ this config specifies how the 3D model will look
    const viewConfig = {
      binSizeScale: 0.01,
      color: "#ff00ff",
    };

    //~ process numpy
    const structureNumpy = model.get("structure_nparray");
    const isNumpy = (structureNumpy  != undefined && structureNumpy != null && structureNumpy.byteLength != 0);
    if (isNumpy) {
      console.log("-----------------");
      console.log("numpy array was supplied!");
      const numpyChunk = chs.parseNumpyArray(structureNumpy , options);
      console.log(numpyChunk);
      chromatinScene = chs.addChunkToScene(chromatinScene, numpyChunk, viewConfig);
    }

    //~ process string
    const structureString = model.get("structure_string");
    if (structureString != "") {
      console.log("-----------------");
      console.log("string was supplied!");
      const stringChunk = chs.parseXYZ(
        structureString,
        model.get("delimiter"),
        options,
      );
      chromatinScene = chs.addChunkToScene(chromatinScene, stringChunk, viewConfig);
    }
    
    //~ process filepath
    const structurePath = model.get("structure_path");
    const isPath = (structurePath && structurePath.name != "");
    if (isPath) {
      console.log("-----------------");
      console.log("path was supplied!");
      const pathChunk = chs.parseXYZ(
        structurePath.contents,
        model.get("delimiter"),
        options,
      );
      chromatinScene = chs.addChunkToScene(chromatinScene, pathChunk, viewConfig);
    }

    const [renderer, canvas] = chs.display(chromatinScene, { alwaysRedraw: false});
    el.appendChild(canvas);

    return () => {
      // Optionally cleanup
      renderer.endDrawing();
    };
  },
};
