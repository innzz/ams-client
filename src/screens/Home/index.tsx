// import Camera from "../../components/shared/Camera";

import { useContext } from "react";
import ClockIn from "../../components/home/ClockIn";
import { ClockContext } from "@/context/ClockProvider";
import ClockOut from "@/components/home/ClockOut";

const Home = () => {
  const clockContext = useContext(ClockContext);
  return (
    <section>
      <div className="w-3/4 mt-12 mx-auto h-[80%]">
        {clockContext.user?.username ? <ClockOut /> : <ClockIn />}
      </div>
    </section>
  );
};

export default Home;
