import React, { useState, useRef } from 'react';
import { FaCalendarAlt, FaRegCalendarPlus, FaFirstAid, FaPlaneDeparture, FaUserClock, FaBan } from 'react-icons/fa';

const LEAVE_TYPES = [
  { label: 'ANNUAL LEAVES', icon: <FaCalendarAlt className="text-blue-500" size={22} /> },
  { label: 'CASUAL LEAVES', icon: <FaRegCalendarPlus className="text-green-500" size={22} /> },
  { label: 'SICK LEAVES', icon: <FaFirstAid className="text-red-500" size={22} /> },
  { label: 'MATERNITY LEAVES', icon: <FaPlaneDeparture className="text-pink-500" size={22} /> },
  { label: 'SHORT LEAVE', icon: <FaUserClock className="text-yellow-500" size={22} /> },
  { label: 'LEAVE WITHOUT PAY', icon: <FaBan className="text-gray-500" size={22} /> },
];

const LeaveApplicationForm = ({ onSubmit }) => {
  const [leaveType, setLeaveType] = useState(LEAVE_TYPES[0].label);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef();

  // Calculate days
  const days = dateFrom && dateTo ? (Math.ceil((new Date(dateTo) - new Date(dateFrom)) / (1000 * 60 * 60 * 24)) + 1) : 0;

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachment(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ leaveType, dateFrom, dateTo, days, reason, attachment });
  };

  return (
    <form className="bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in" onSubmit={handleSubmit}>
      {/* Leave Type Selection */}
      <div>
        <label className="block font-semibold mb-2 text-base-content">Leave Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {LEAVE_TYPES.map(type => (
            <button
              type="button"
              key={type.label}
              className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer group
                ${leaveType === type.label ? 'bg-primary text-white border-primary scale-105' : 'bg-base-100 border-base-300 hover:bg-base-200'}`}
              onClick={() => setLeaveType(type.label)}
              title={type.label}
            >
              {type.icon}
              <span className="font-medium text-sm sm:text-base">{type.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Date Pickers */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Date From
            <span className="ml-1 text-xs text-gray-400" title="Select the start date">🛈</span>
          </label>
          <input type="date" className="input input-bordered w-full transition-all duration-200 focus:ring-2 focus:ring-primary" value={dateFrom} onChange={e => setDateFrom(e.target.value)} required />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Date To
            <span className="ml-1 text-xs text-gray-400" title="Select the end date">🛈</span>
          </label>
          <input type="date" className="input input-bordered w-full transition-all duration-200 focus:ring-2 focus:ring-primary" value={dateTo} onChange={e => setDateTo(e.target.value)} required />
        </div>
      </div>
      {/* Number of Days */}
      <div>
        <label className="block font-semibold mb-1">Number of Days
          <span className="ml-1 text-xs text-gray-400" title="Calculated automatically">🛈</span>
        </label>
        <input type="number" className="input input-bordered w-32 font-bold text-lg transition-all duration-200" value={days > 0 ? days : ''} readOnly />
      </div>
      {/* Reason for Leave */}
      <div>
        <label className="block font-semibold mb-1">Reason for Leave
          <span className="ml-1 text-xs text-gray-400" title="Please enter your reason">🛈</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full transition-all duration-200 focus:ring-2 focus:ring-primary"
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Please enter your reason"
          required
        />
      </div>
      {/* File Attachment */}
      <div>
        <label className="block font-semibold mb-1">Attachment (if required)
          <span className="ml-1 text-xs text-gray-400" title="Drag and drop or click to select a file">🛈</span>
        </label>
        <div
          className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 cursor-pointer ${dragActive ? 'border-primary bg-blue-50' : 'border-base-300 bg-base-100'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          {attachment ? (
            <div className="flex flex-col items-center gap-2 animate-fade-in">
              <span className="font-medium text-primary">{attachment.name}</span>
              <span className="text-xs text-gray-400">File selected</span>
            </div>
          ) : (
            <span className="text-gray-400">Drag & drop or click to select a file</span>
          )}
        </div>
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-full text-lg font-bold rounded-xl mt-2 transition-all duration-200 shadow-md hover:scale-105 focus:ring-4 focus:ring-primary/50 focus:outline-none animate-fade-in"
      >
        Submit Leave Request
      </button>
    </form>
  );
};

export default LeaveApplicationForm; 