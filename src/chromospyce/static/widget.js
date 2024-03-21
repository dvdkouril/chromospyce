import * as chs from "https://esm.sh/chromospace";
    //import * as chs from "http://localhost:5173/src/main.ts";

    export default {
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
            let chromatinScene = {
                chunks: [rawChunkChunk],
                models: [],
            };
            renderer.addScene(chromatinScene);
        } else {
            
            console.log("normal file!");
            const chsChunks = chs.parseXYZ(model.get("model").contents, model.get("delimiter"), options);
            
            //~ create a scene
            let chromatinScene = {
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
      }
    }
