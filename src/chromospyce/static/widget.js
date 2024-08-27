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

    //~ process input
    const structure = model.get("structure");
    const chunk = chs.load(structure, options);
    chromatinScene = chs.addChunkToScene(chromatinScene, chunk, viewConfig);

    const [renderer, canvas] = chs.display(chromatinScene, {
      alwaysRedraw: false,
    });
    el.appendChild(canvas);

    return () => {
      // Optionally cleanup
      renderer.endDrawing();
    };
  },
};
