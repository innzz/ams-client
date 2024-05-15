import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
// import { dataURLtoBlob } from "@/helpers/camera.helper";

type CameraProps = {
  photo: string | null;
  setPhoto: React.Dispatch<React.SetStateAction<string | null>>;
};

const Camera = ({ photo, setPhoto }: CameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, 300, 200);
      const dataURL = canvasRef.current.toDataURL("image/png");
      setPhoto(dataURL);
      stopCamera();
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    startCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
      startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-3/4 mx-auto h-full flex flex-col gap-5">
      <video ref={videoRef} className="w-full h-full" autoPlay muted></video>
      <div className="flex justify-center">
        {photo ? (
          <Button size={"lg"} onClick={retakePhoto}>
            Retake Photo
          </Button>
        ) : (
          <Button size={"lg"} onClick={takePhoto}>
            Take Photo
          </Button>
        )}
      </div>

      <canvas
        ref={canvasRef}
        width="300"
        height="200"
        style={{ display: "none" }}
      ></canvas>
    </div>
  );
};

export default Camera;
