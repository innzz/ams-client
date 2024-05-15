import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentDate, getTime } from "@/helpers/date.helper";
import { useState } from "react";

type Data = {
  _id: number;
  username: string;
  checkInTime: Date;
  checkOutTime: Date;
};

type DataTableProps = {
  data: Data[] | [];
  isLoading?: boolean;
};

const DataTable = ({ data, isLoading }: DataTableProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameFilter(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const filterData = () => {
    let filtered = data;

    if (usernameFilter) {
      filtered = filtered.filter((item) =>
        item.username.toLowerCase().includes(usernameFilter.toLowerCase())
      );
    }

    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.checkInTime);
        return itemDate >= startDateObj || itemDate <= endDateObj;
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPageCount = Math.ceil(filteredData.length / itemsPerPage);


  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-start mb-4 gap-4">
        <div className="relative w-full md:w-auto mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Filter by username"
            value={usernameFilter}
            onChange={handleUsernameChange}
            className="py-2 px-3 w-full md:w-64 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {usernameFilter && (
            <button
              onClick={() => setUsernameFilter("")}
              className="absolute right-0 top-0 mt-2 mr-3 text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              &#x2715;
            </button>
          )}
        </div>
        <div className="flex flex-wrap w-full items-center md:w-auto">
          <div className="flex items-center">
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="date"
              id="start-date"
              onChange={handleStartDateChange}
              className="py-2 px-3 mr-2 md:mr-4 mb-2 md:mb-0 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              onChange={handleEndDateChange}
              className="py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <button
          onClick={filterData}
          className="py-2 px-4 ml-2 md:ml-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
        >
          Apply Filters
        </button>
      </div>
      <Table>
        {isLoading ? (
          <TableCaption>Data is being fetching.</TableCaption>
        ) : (
          <>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Check-In Time</TableHead>
                <TableHead className="text-center">Check-Out Time</TableHead>
              </TableRow>
            </TableHeader>
            {currentItems.length > 0 ? <TableBody>
              {currentItems.map((cell) => (
                <TableRow key={cell._id}>
                  <TableCell className="font-medium">{cell.username}</TableCell>
                  <TableCell className="font-medium">
                    {getCurrentDate(new Date(cell.checkInTime))}
                  </TableCell>
                  <TableCell className="text-center">{getTime(new Date(cell.checkInTime))}</TableCell>
                  <TableCell className="text-center">{ cell.checkOutTime ? getTime(new Date(cell.checkOutTime)) : "--"}</TableCell>
                </TableRow>
              ))}
            </TableBody> : <TableCaption>No data</TableCaption>}
            
          </>
        )}
      </Table>
      <div className="mt-4 flex justify-start gap-5">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded-lg focus:outline-none ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-300"
              : "bg-blue-300 text-gray-700"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            indexOfLastItem >= filteredData.length ||
            currentPage === totalPageCount
          }
          className={`py-2 px-4 rounded-lg focus:outline-none ${
            indexOfLastItem >= filteredData.length ||
            currentPage === totalPageCount
              ? "bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-300"
              : "bg-blue-300 text-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
