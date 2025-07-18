import { FaRegSmileBeam } from "react-icons/fa";

const WelcomePage = ({ title }) => {
  return (
    <section className="hero min-h-[30vh] bg-gradient-to-r from-primary to-accent rounded-2xl shadow-lg mb-8 flex items-center justify-center">
      <div className="hero-content flex-col text-center text-base-100">
        <div className="flex justify-center mb-2">
          <FaRegSmileBeam className="text-5xl text-base-100 drop-shadow-lg" />
        </div>
        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">Welcome to {title}</h1>
        <p className="text-lg font-medium opacity-90">This is the {title.toLowerCase()} page of the LMS Leave Management System.</p>
      </div>
    </section>
  );
};

export default WelcomePage;
  