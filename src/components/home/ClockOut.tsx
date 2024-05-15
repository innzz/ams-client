import { useContext, useState } from "react";
import OpenCameraButton from "../shared/OpenCameraButton";
import Camera from "../shared/Camera";
import PhotoPreview from "../shared/PhotoPreview";
import { ClockContext } from "@/context/ClockProvider";
import ClockOutButton from "./ClockOutButton";
import { dataURLtoBlob } from "@/helpers/camera.helper";
import { uploadImageToCloudinary } from "@/services/axios/upload";
import { ClockOutType } from "@/types/clock.type";
import { clockOut } from "@/services/axios/clock";
import { useClocksData } from "@/services/swr/clock";

const ClockOut = () => {
  const { mutate} = useClocksData();
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const clockContext = useContext(ClockContext);
  const openCameraHandler = () => {
    setPhoto(null)
    setIsCameraOpen(true);
  };

  const clockOutHandler = async() => {

        //If photos is selected
        if (photo) {
          //convert photo path to file
          const blob = dataURLtoBlob(photo);
          const file = new File([blob], "captured_photo.png", {
            type: "image/png",
          });
          //Upload the photo
          // const data = await uploadImage(formData);
          const data = await uploadImageToCloudinary(file);
          //check if photo is successfully uploaded
          if (data) {
            const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : {};
            const clockOutObj:ClockOutType = {
              _id: user._id,
              checkOutImage: data,
              checkOutTime: new Date()
            }
            const clockedOut = await clockOut(clockOutObj);
            
            if (clockedOut.success) {
              localStorage.removeItem("user");
              clockContext.setUser!({})
              mutate()
            }
          }
    
        }


  };

  //If photo is selected then show clockin option or retake a photo
  if (photo) {
    return (
      <div className="w-[60%] mx-auto h-full bg-red-100 p-6 rounded-md">
        <div className="w-full">
          <PhotoPreview photo={photo} />
        </div>
        <div className="flex justify-start items-center gap-3">
          <p className="text-[25px] font-[500]">User name: </p>
          <p className="text-[25px]">{clockContext.user?.username}</p>
        </div>
        <div className="mt-5 flex justify-center items-center gap-7">
        <ClockOutButton onClick={clockOutHandler} />
        <OpenCameraButton title={"Retake Photo"} variant={"secondary"} onClick={openCameraHandler} />
        </div>
      </div>
    );
  }


  return (
    <div className="w-full h-full bg-red-100 p-6 rounded-md">
      {isCameraOpen ? (
        <Camera photo={photo} setPhoto={setPhoto} />
      ) : (
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-[40px] font-[600]">Clock-Out:</h2>
          <p className="text-[20px] font-[400]">
            Before clocking out, we'll ensure you're in the right location by
            capturing a picture of you.
          </p>
          <div className="flex gap-4">
            <label htmlFor="username" className="text-[20px]">User name: </label>
            <p className="text-[20px]">{clockContext.user?.username}</p>
          </div>
          <OpenCameraButton title={"Open Camera"} onClick={openCameraHandler} />
        </div>
      )}
    </div>
  );
};

export default ClockOut;
