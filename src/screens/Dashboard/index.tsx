import DataTable from "@/components/dashboard/DataTable";
import { useClocksData } from "@/services/swr/clock";

const Dashboard = () => {
  const { data, isLoading } = useClocksData();
  return (
    <section className="flex flex-col gap-4 pt-4">
      <h2 className="text-[30px] font-[500]">Attendance Record</h2>
      {data && <DataTable data={data.data} isLoading={isLoading} />}
    </section>
  );
};

export default Dashboard;
