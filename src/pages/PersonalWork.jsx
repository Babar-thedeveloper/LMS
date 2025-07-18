import WelcomePage from '../components/WelcomePage';

const PersonalWork = () => {
  return (
    <>
      <WelcomePage title="Personal Work" />
      <div className="p-6 bg-base-100 rounded-xl shadow-md mt-4 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2">Personal Work Requests</h2>
        <p className="text-base-content mb-4">Manage your personal work requests here. (Content coming soon!)</p>
      </div>
    </>
  );
};

export default PersonalWork; 