import { useContext, useState } from "react";
import OpenCameraButton from "../shared/OpenCameraButton";
import Camera from "../shared/Camera";
import PhotoPreview from "../shared/PhotoPreview";
import ClockInButton from "./ClockInButton";
import { ClockContext } from "@/context/ClockProvider";
import { dataURLtoBlob } from "@/helpers/camera.helper";
import { uploadImageToCloudinary } from "@/services/axios/upload";
import { clockIn } from "@/services/axios/clock";
import { ClockinType } from "@/types/clock.type";
import { useClocksData } from "@/services/swr/clock";

const ClockIn = () => {
  const { mutate } = useClocksData();
  const [username, setUsername] = useState<string>("");
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const clockContext = useContext(ClockContext);

  const openCameraHandler = () => {
    setPhoto(null);
    setIsCameraOpen(true);
  };

  const clockInHandler = async () => {
    try {
      setIsLoading(true);
      //If photos is selected
      if (photo) {
        //convert photo path to file
        const blob = dataURLtoBlob(photo);
        const file = new File([blob], "captured_photo.png", {
          type: "image/png",
        });
        //Upload the photo
        const data = await uploadImageToCloudinary(file);
        //check if photo is successfully uploaded
        if (data) {
          const clockInObj: ClockinType = {
            username,
            checkInImage: data,
            checkInTime: new Date(),
          };
          const clockedIn = await clockIn(clockInObj);
  
          if (clockedIn.success) {
            localStorage.setItem("user", JSON.stringify(clockedIn.data));
            clockContext.setUser!(clockedIn.data);
            mutate();
          }
        }
      }
      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally{
      setIsLoading(false)
    }
  };

  //If photo is selected then show clockin option or retake a photo
  if (photo) {
    return (
      <div className="w-full sm:w-[60%] mx-auto h-full bg-green-100 p-6 rounded-md">
        <div className="w-full">
          <PhotoPreview photo={photo} />
        </div>
        <div className="flex justify-start items-center gap-3">
          <p className="text-[25px] font-[500]">User name: </p>
          <p className="text-[25px]">{username}</p>
        </div>
        <div className="mt-5 flex flex-wrap justify-center items-center gap-7">
          <ClockInButton onClick={clockInHandler} isLoading={isLoading} />
          <OpenCameraButton
            title={"Retake Photo"}
            variant={"secondary"}
            onClick={openCameraHandler}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-green-100 p-6 rounded-md">
      {isCameraOpen ? (
        <Camera photo={photo} setPhoto={setPhoto} />
      ) : (
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-[40px] font-[600]">Clock-In:</h2>
          <p className="text-[20px] font-[400]">
            Before clocking in, we'll ensure you're in the right location by
            capturing a picture of you.
          </p>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-[20px]">
              User name <span className="text-red-700">*</span>
            </label>
            <div className="w-full">
              <input
                type="text"
                className="border-[1px] border-black h-10 px-3 rounded-md w-full max-w-[400px]"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <OpenCameraButton
            title={"Open Camera"}
            onClick={openCameraHandler}
            disabled={username ? false : true}
          />
        </div>
      )}
    </div>
  );
};

export default ClockIn;
