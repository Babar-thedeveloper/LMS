import WelcomePage from '../components/WelcomePage';

const OfficialDuty = () => {
  return (
    <>
      <WelcomePage title="Official Duty" />
      <div className="p-6 bg-base-100 rounded-xl shadow-md mt-4 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2">Official Duty Requests</h2>
        <p className="text-base-content mb-4">Manage your official duty requests here. (Content coming soon!)</p>
      </div>
    </>
  );
};

export default OfficialDuty; 