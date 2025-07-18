import WelcomePage from '../components/WelcomePage';

const AllLeaves = () => {
  return (
    <>
      <WelcomePage title="All Leaves" />
      <div className="p-6 bg-base-100 rounded-xl shadow-md mt-4 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2">All Leave Requests</h2>
        <p className="text-base-content mb-4">View all your leave requests here. (Table coming soon!)</p>
      </div>
    </>
  );
};

export default AllLeaves; 