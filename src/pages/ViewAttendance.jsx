import WelcomePage from '../components/WelcomePage';

const ViewAttendance = () => {
  return (
    <>
      <WelcomePage title="View Attendance" />
      <div className="p-6 bg-base-100 rounded-xl shadow-md mt-4 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2">Attendance Records</h2>
        <p className="text-base-content mb-4">Check your attendance records here. (Content coming soon!)</p>
      </div>
    </>
  );
};

export default ViewAttendance; 