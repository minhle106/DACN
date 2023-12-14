import { useQuery } from "@tanstack/react-query";
import { getJob } from "../../stores/reducer/publicJobSlice";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";

const JobDetail = () => {
  const { id } = useParams();
  const { data: jobData, fetchStatus: jobFetchStatus } = useQuery({
    queryKey: ["publicJobs"],
    queryFn: () => getJob(id),
    staleTime: Infinity,
  });

  return (
    <div className="flex gap-5 mt-5">
      <div className="w-8/12">
        <JobCard job={jobData} moreInfo={true} />
      </div>
      <div className="w-4/12 bg-white rounded-lg border shadow px-5 py-5"></div>
    </div>
  );
};

export default JobDetail;
