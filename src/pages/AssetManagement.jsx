import WelcomePage from '../components/WelcomePage';

const AssetManagement = () => {
  return (
    <>
      <WelcomePage title="Asset Management" />
      <div className="p-6 bg-base-100 rounded-xl shadow-md mt-4 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2">Manage Assets</h2>
        <p className="text-base-content mb-4">View and manage your assets here. (Content coming soon!)</p>
      </div>
    </>
  );
};

export default AssetManagement; 