"use client";
import { useEffect } from "react";
import Loader from "./Loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import useAchievements from "@/hooks/useAchievements";
import AchievementsForm from "./AchievementsForm";

export default function AchievementsTable() {
  const {
    achievements,
    loading,
    error,
    fetchAchievements,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    totalItems,
  } = useAchievements();

  useEffect(() => {
    fetchAchievements(currentPage, pageSize);
    // eslint-disable-next-line
  }, [currentPage, pageSize]);

  // Helper for range of page numbers (handles many pages gracefully)
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (range[0] > 1) range.unshift(1, "...");
    if (range[range.length - 1] < totalPages) range.push("...", totalPages);
    return range;
  };

  // Calculate display range
  const startIdx = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalItems);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="text-sm text-gray-500">
          Showing <span className="font-semibold">{startIdx}</span>–
          <span className="font-semibold">{endIdx}</span> of{" "}
          <span className="font-semibold">{totalItems}</span> entries
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-gray-500">
            Rows per page:
          </label>
          <select
            id="pageSize"
            className="rounded border px-2 py-1"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <AchievementsForm />
          <Table>
            <TableCaption>A list of your recent achievements.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>S#</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>District</TableHead>
                <TableHead className="text-right">Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {achievements.map((achievement, idx) => (
                <TableRow key={achievement._id}>
                  <TableCell className="font-bold">
                    {startIdx + idx}
                  </TableCell>
                  <TableCell className="font-bold">
                    {achievement.project}
                  </TableCell>
                  <TableCell>{achievement.sector}</TableCell>
                  <TableCell>{achievement.district}</TableCell>
                  <TableCell className="text-right">
                    Rs. {achievement.budget}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="font-bold">
                  Total
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-bold">
                  Rs.{" "}
                  {achievements.reduce(
                    (total, achievement) => total + achievement.budget,
                    0
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-4">Page {currentPage} of {totalPages}</span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}