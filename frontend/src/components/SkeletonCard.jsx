import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonLoader = () => {
  return (
    <div className="flex justify-between gap-4 flex-wrap  justify-center  md:justify-between">
      <div className=" w-[17rem] sm:w-[20rem] md:w-[17rem] lg:w-[19rem] rounded-t-lg">
        <Skeleton height={230} />
        <Skeleton height={20} className="mt-2" />
        <Skeleton width={122} height={20} className="mt-2" />
        <Skeleton  height={20} className="mt-2 w-[70%]" />
      </div>

      <div className=" w-[17rem] sm:w-[20rem] md:w-[17rem] lg:w-[19rem] rounded-t-lg">
        <Skeleton height={230} />
        <Skeleton height={20} className="mt-2" />
        <Skeleton width={122} height={20} className="mt-2" />
        <Skeleton  height={20} className="mt-2 w-[70%]" />
      </div>

      <div className=" w-[17rem] sm:w-[20rem] md:w-[17rem] lg:w-[19rem] rounded-t-lg">
        <Skeleton height={230} />
        <Skeleton height={20} className="mt-2" />
        <Skeleton width={122} height={20} className="mt-2" />
        <Skeleton  height={20} className="mt-2 w-[70%]" />
      </div>

      <div className=" w-[17rem] sm:w-[20rem] md:w-[17rem] lg:w-[19rem] rounded-t-lg">
        <Skeleton height={230} />
        <Skeleton height={20} className="mt-2" />
        <Skeleton width={122} height={20} className="mt-2 w-[70%]" />
        <Skeleton  height={20} className="mt-2 w-[70%]" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
