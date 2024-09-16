// @deno-types="npm:chromospace"
import * as chs from "https://esm.sh/chromospace@^0.1.x";

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
    const defaultViewConfig = {
      scale: 0.02,
      color: "#ff0066",
      links: false,
    };

    //~ process input
    /** @type {DataView} */
    const structure = model.get("structure");
    const viewConfig = model.get("viewconfig");
    if (structure === undefined) {
      console.error("suplied structure is UNDEFINED");
    }
    console.log(viewConfig);
    const vc = viewConfig === undefined || Object.keys(viewConfig).length === 0
      ? defaultViewConfig
      : viewConfig;
    const chunk = chs.load(structure.buffer, options);
    chromatinScene = chs.addChunkToScene(chromatinScene, chunk, vc);

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
