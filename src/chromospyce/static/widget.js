// @deno-types="npm:chromospace"
import * as chs from "https://esm.sh/chromospace";
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

    // const chsModel = chs.parse3dg(model.get("model").contents, options);
    // const chsChunks = chs.parseXYZ(model.get("model").contents, ' ', options);

    const renderer = new chs.ChromatinBasicRenderer();

    //~ see if there's a raw numpy array sent
    const isNumpy = model.get("is_numpy");
    const rawChunk = model.get("nparr_model");
    // if (rawChunk) {
    if (isNumpy) {
      console.log("numpy array was supplied!");
      const rawChunkChunk = chs.parseNumpyArray(rawChunk, options);
      //~ create a scene
      const chromatinScene = {
        chunks: [rawChunkChunk],
        models: [],
      };
      renderer.addScene(chromatinScene);
    } else {
      console.log("normal file!");
      const chsChunks = chs.parseXYZ(
        model.get("model").contents,
        model.get("delimiter"),
        options,
      );

      //~ create a scene
      const chromatinScene = {
        chunks: [chsChunks],
        models: [],
      };
      renderer.addScene(chromatinScene);
    }

    //~ start frame loop (requestAnimationFrame)
    renderer.startDrawing();

    el.appendChild(renderer.getCanvasElement());

    return () => {
      // Optionally cleanup
      renderer.endDrawing();
    };
  },
};
