import React from 'react';
import LeaveApplicationForm from './ApplyLeaves/LeaveApplicationForm';
import RemainingLeavesCards from './ApplyLeaves/RemainingLeavesCards';
import LeaveHistoryTable from './ApplyLeaves/LeaveHistoryTable';

const ApplyLeaves = () => {
  return (
    <div className="w-full px-2 md:px-6 py-8 flex flex-col gap-8">
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 flex flex-col gap-8 min-w-[320px]">
          <LeaveApplicationForm />
          <LeaveHistoryTable />
        </div>
        <div className="lg:w-80 flex-shrink-0">
          <RemainingLeavesCards />
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaves; 