import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { renderShaderToy } from "./shadertoy";
import { shaderSource } from "./shader";
import { SliderVertical } from "./components/slider";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

function App() {
  const [open, setOpen] = React.useState(true);
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const textureImage = new Image();
    textureImage.src = "./Black Hole.jpg";
    textureImage.onload = () => {
      renderShaderToy(canvasRef.current! as HTMLCanvasElement, shaderSource, [
        textureImage,
      ]);
    };
  }, []);

  return (
    <div
      className="h-screen w-screen relative"
      style={{
        backgroundImage: "url('./black_hole_40.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* sidebar */}
      <div className="bg-black/60 absolute inset-y-0 left-0 w-96 p-12">
        <p className="text-white text-xl">
          Love all, trust a few, Do wrong to none: be able for thine enemy
          Rather in power than use; and keep thy friend Under thy own life's
          key: be check'd for silence, But never tax'd for speech.
        </p>

        <div className="flex justify-evenly w-full h-[640px]">
          <SliderVertical defaultValue={[50]} />
          <SliderVertical defaultValue={[25]} />
        </div>
      </div>
      <div className="absolute inset-y-0 left-96 right-0">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>

      <div className="absolute right-10 bottom-10">
        <div onClick={() => setOpen((x) => !x)} className="cursor-pointer">
          {open ? (
            <EyeOpenIcon className="w-10 h-10 text-white" />
          ) : (
            <EyeNoneIcon className="w-10 h-10 text-white" />
          )}
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
