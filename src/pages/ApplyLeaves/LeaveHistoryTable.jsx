import React, { useState } from 'react';
import { FaCalendarAlt, FaRegClock, FaListAlt, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

const dummyHistory = [
  { from: '2025-07-01', to: '2025-07-03', days: 3, type: 'CASUAL LEAVES', status: 'Approved' },
  { from: '2025-06-15', to: '2025-06-16', days: 2, type: 'SICK LEAVES', status: 'Pending' },
  { from: '2025-05-10', to: '2025-05-12', days: 3, type: 'ANNUAL LEAVES', status: 'Rejected' },
  // ...add more dummy records as needed
];

const PAGE_SIZE = 10;

const statusBadge = (status) => {
  if (status === 'Approved') return <span className="badge badge-success gap-1"><FaCheckCircle /> Approved</span>;
  if (status === 'Rejected') return <span className="badge badge-error gap-1"><FaTimesCircle /> Rejected</span>;
  return <span className="badge badge-warning gap-1"><FaHourglassHalf /> Pending</span>;
};

const LeaveHistoryTable = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('from');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);

  // Filter and sort
  const filtered = dummyHistory.filter(row =>
    row.type.toLowerCase().includes(search.toLowerCase()) ||
    row.status.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'from') {
      return sortDir === 'asc' ? a.from.localeCompare(b.from) : b.from.localeCompare(a.from);
    } else if (sortBy === 'type') {
      return sortDir === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
    } else if (sortBy === 'status') {
      return sortDir === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    }
    return 0;
  });
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex items-center gap-2">
          <FaListAlt className="text-primary" /> Leave History
        </h2>
        <div className="form-control w-full max-w-xs mb-4">
          <input
            type="text"
            placeholder="Search by type or status..."
            className="input input-bordered"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th onClick={() => { setSortBy('from'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="cursor-pointer">
                  <FaCalendarAlt className="inline mr-1" /> Date From
                </th>
                <th onClick={() => { setSortBy('to'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="cursor-pointer">
                  <FaCalendarAlt className="inline mr-1" /> Date To
                </th>
                <th>
                  <FaRegClock className="inline mr-1" /> Days
                </th>
                <th onClick={() => { setSortBy('type'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="cursor-pointer">
                  <FaListAlt className="inline mr-1" /> Leave Type
                </th>
                <th onClick={() => { setSortBy('status'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="cursor-pointer">
                  <FaCheckCircle className="inline mr-1" /> Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.map((row, i) => (
                <tr key={i}>
                  <td>{row.from}</td>
                  <td>{row.to}</td>
                  <td>{row.days}</td>
                  <td>{row.type}</td>
                  <td>{statusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-4">
          <button className="btn btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <span className="px-2">Page {page} of {totalPages}</span>
          <button className="btn btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default LeaveHistoryTable; 