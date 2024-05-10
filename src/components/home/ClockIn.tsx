import { useState } from "react";
import OpenCameraButton from "../shared/OpenCameraButton";
import Camera from "../shared/Camera";
import PhotoPreview from "../shared/PhotoPreview";
import ClockInButton from "./ClockInButton";

const ClockIn = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const openCameraHandler = () => {
    setPhoto(null)
    setIsCameraOpen(true);
  };

  if (photo) {
    return (
      <div className="w-[60%] mx-auto h-full">
        <div className="w-full">
          <PhotoPreview photo={photo} />
        </div>
        <div className="flex justify-start items-center gap-3">
          <p className="text-[25px] font-[500]">User name: </p>
          <p className="text-[25px]">Inzamam Pawaskar</p>
        </div>
        <div className="mt-5 flex justify-center items-center gap-7">
        <ClockInButton />
        <OpenCameraButton title={"Retake Photo"} variant={"secondary"} onClick={openCameraHandler} />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      {isCameraOpen ? (
        <Camera photo={photo} setPhoto={setPhoto} />
      ) : (
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-[40px] font-[600]">Clock-In:</h2>
          <p className="text-[20px] font-[400]">
            Before clocking in, we'll ensure you're in the right location by
            capturing a picture of you.
          </p>
          <OpenCameraButton title={"Open Camera"} onClick={openCameraHandler} />
        </div>
      )}
    </div>
  );
};

export default ClockIn;
