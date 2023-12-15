import { useQuery } from "@tanstack/react-query";
import { getJob } from "../../stores/reducer/publicJobSlice";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import CommingSoonImg from "../../assets/CommingSoon.jpg";

const JobDetail = () => {
  const { id } = useParams();
  const { data: jobData, fetchStatus: jobFetchStatus } = useQuery({
    queryKey: ["publicJobs", id],
    queryFn: () => getJob(id),
    staleTime: Infinity,
  });

  console.log(id);

  return (
    <div className="flex gap-5 mt-5">
      <div className="w-full">
        <JobCard job={jobData} moreInfo={true} />
      </div>
      <div className="w-4/12 bg-white rounded-lg border shadow px-5 py-5">
        <img src={CommingSoonImg} alt="Comming soon" />
      </div>
    </div>
  );
};

export default JobDetail;
