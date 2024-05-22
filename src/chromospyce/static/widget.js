// @deno-types="npm:chromospace"
import * as chs from "https://esm.sh/chromospace@0.0.8";
//import * as chs from "http://localhost:5173/src/main.ts";

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

    const renderer = new chs.ChromatinBasicRenderer();
    const chromatinScene = {
      chunks: [],
      models: [],
    };

    //~ process numpy
    const structureNumpy = model.get("structure_nparray");
    const isNumpy = (structureNumpy  != undefined && structureNumpy != null && structureNumpy.byteLength != 0);
    if (isNumpy) {
      console.log("numpy array was supplied!");
      const numpyChunk = chs.parseNumpyArray(structureNumpy , options);
      chromatinScene.chunks.push(numpyChunk );
    }

    //~ process string
    const structureString = model.get("structure_string");
    if (structureString != "") {
      console.log("string was supplied!");
      const stringChunk = chs.parseXYZ(
        structureString,
        model.get("delimiter"),
        options,
      );
      chromatinScene.chunks.push(stringChunk);
    }
    
    //~ process filepath
    const structurePath = model.get("structure_path");
    if (!structurePath) {
      console.log("invalid path!");
    }
    const isPath = (structurePath && structurePath.name != "");
    if (isPath) {
      console.log("path was supplied!");
      const pathChunk = chs.parseXYZ(
        structurePath.contents,
        model.get("delimiter"),
        options,
      );
      chromatinScene.chunks.push(pathChunk );
    }

    renderer.addScene(chromatinScene);
    //~ start frame loop (requestAnimationFrame)
    renderer.startDrawing();

    el.appendChild(renderer.getCanvasElement());

    return () => {
      // Optionally cleanup
      renderer.endDrawing();
    };
  },
};
