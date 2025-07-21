import React, { useState } from 'react';
import { FaCalendarAlt, FaRegClock, FaListAlt, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaSearch } from 'react-icons/fa';

const dummyLeaves = Array.from({ length: 15 }, (_, i) => {
  const types = ['CASUAL LEAVES', 'SICK LEAVES', 'ANNUAL LEAVES'];
  const statuses = ['Approved', 'Pending', 'Rejected'];
  const type = types[i % 3];
  const status = statuses[i % 3];
  const from = `2025-07-${String(i + 1).padStart(2, '0')}`;
  const to = `2025-07-${String(i + 2).padStart(2, '0')}`;
  const days = 1 + (i % 5);
  return {
    id: i + 1,
    from,
    to,
    days,
    type,
    status,
    reason: `Reason for leave #${i + 1}`,
  };
});

const statusBadge = (status) => {
  if (status === 'Approved') return <span className="badge badge-success gap-1"><FaCheckCircle /> Approved</span>;
  if (status === 'Rejected') return <span className="badge badge-error gap-1"><FaTimesCircle /> Rejected</span>;
  return <span className="badge badge-warning gap-1"><FaHourglassHalf /> Pending</span>;
};

const PAGE_SIZE = 10;

const AllLeaves = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('from');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  // Filter, sort, and paginate
  const filtered = dummyLeaves.filter(row =>
    row.type.toLowerCase().includes(search.toLowerCase()) ||
    row.status.toLowerCase().includes(search.toLowerCase()) ||
    row.from.includes(search) ||
    row.to.includes(search)
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'from' || sortBy === 'to') {
      return sortDir === 'asc' ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
    } else if (sortBy === 'type') {
      return sortDir === 'asc' ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type);
    } else if (sortBy === 'status') {
      return sortDir === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    } else if (sortBy === 'days') {
      return sortDir === 'asc' ? a.days - b.days : b.days - a.days;
    }
    return 0;
  });
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  return (
    <div className="w-full py-8 flex flex-col items-center animate-fade-in">
      <div className="card bg-base-100 shadow-xl w-full max-w-full animate-fade-in transition-all duration-500">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <h2 className="card-title flex items-center gap-2 text-lg md:text-2xl">
              <FaListAlt className="text-primary" /> All Leaves
            </h2>
            <div className="form-control w-full max-w-xs">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search by type, status, or date..."
                  className="input input-bordered w-full"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
                {/* <span className="btn btn-square btn-primary/50 pointer-events-none"><FaSearch /></span> */}
              </div>
            </div>
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
                  <th onClick={() => { setSortBy('days'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="cursor-pointer">
                    <FaRegClock className="inline mr-1" /> Days
                  </th>
                  <th onClick={() => { setSortBy('type'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="cursor-pointer">
                    <FaListAlt className="inline mr-1" /> Leave Type
                  </th>
                  <th onClick={() => { setSortBy('status'); setSortDir(sortDir === 'asc' ? 'desc' : 'asc'); }} className="cursor-pointer">
                    <FaCheckCircle className="inline mr-1" /> Leave Status
                  </th>
                  <th>View Leave</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((row, i) => (
                  <tr key={row.id} className="transition-all duration-300 hover:bg-primary/10 animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
                    <td>{row.from}</td>
                    <td>{row.to}</td>
                    <td>{row.days}</td>
                    <td>{row.type}</td>
                    <td>{statusBadge(row.status)}</td>
                    <td>
                      <button className="btn btn-xs btn-primary/50" onClick={() => setModal(row)}>
                        View Detail
                      </button>
                    </td>
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
      {/* Modal for View Detail */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <div className="card bg-base-100 shadow-xl w-full max-w-md animate-fade-in">
            <div className="card-body">
              <h3 className="card-title mb-2">Leave Detail</h3>
              <div className="mb-2"><b>Date From:</b> {modal.from}</div>
              <div className="mb-2"><b>Date To:</b> {modal.to}</div>
              <div className="mb-2"><b>Days:</b> {modal.days}</div>
              <div className="mb-2"><b>Type:</b> {modal.type}</div>
              <div className="mb-2"><b>Status:</b> {statusBadge(modal.status)}</div>
              <div className="mb-2"><b>Reason:</b> {modal.reason}</div>
              <button className="btn btn-primary/50 mt-4" onClick={() => setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLeaves; 