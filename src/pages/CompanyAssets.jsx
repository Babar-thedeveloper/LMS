import WelcomePage from '../components/WelcomePage';

const CompanyAssets = () => {
  return (
    <>
      <WelcomePage title="Company Assets" />
      <div className="p-6 bg-base-100 rounded-xl shadow-md mt-4 animate-fade-in">
        <h2 className="text-2xl font-bold mb-2">Company Assets</h2>
        <p className="text-base-content mb-4">View all company assets here. (Content coming soon!)</p>
      </div>
    </>
  );
};

export default CompanyAssets; 