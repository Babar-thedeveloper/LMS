import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Layout from "../layout/Layout";
import GameManagement from "../pages/GameManagement";
import GroundManagement from "../pages/GroundManagement";
import SlotManagement from "../pages/SlotManagement";
import ChallanManagement from "../pages/ChallanManagement";
import BookingManagement from "../pages/BookingManagement";
import AdminDashboard from "../pages/AdminDashboard";
import ApplyLeaves from "../pages/ApplyLeaves";
import AllLeaves from "../pages/AllLeaves";
import OfficialDuty from "../pages/OfficialDuty";
import PersonalWork from "../pages/PersonalWork";
import AssetManagement from "../pages/AssetManagement";
import ViewAttendance from "../pages/ViewAttendance";
import CompanyAssets from "../pages/CompanyAssets";
import LeavePolicies from "../pages/LeavePolicies";
import Resignation from "../pages/Resignation";
import OnBehalfOf from "../pages/OnBehalfOf";
import ManagerDashboard from "../pages/ManagerDashboard";
import HRSection from "../pages/HRSection";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login route */}
      <Route path="/" element={<Auth />} />

      {/* Layout route with nested children */}
      <Route path="/layout" element={<Layout />}>
        <Route path="admindashboard" element={<AdminDashboard/>} />
        <Route path="games" element={<GameManagement />} />
        <Route path="grounds" element={<GroundManagement />} />
        <Route path="slots" element={<SlotManagement />} />
        <Route path="challans" element={<ChallanManagement />} />
        <Route path="bookings" element={<BookingManagement />} />
        {/* New Sidebar Pages */}
        <Route path="apply-leaves" element={<ApplyLeaves />} />
        <Route path="all-leaves" element={<AllLeaves />} />
        <Route path="official-duty" element={<OfficialDuty />} />
        <Route path="personal-work" element={<PersonalWork />} />
        <Route path="asset-management" element={<AssetManagement />} />
        <Route path="view-attendance" element={<ViewAttendance />} />
        <Route path="company-assets" element={<CompanyAssets />} />
        <Route path="leave-policies" element={<LeavePolicies />} />
        <Route path="resignation" element={<Resignation />} />
        <Route path="on-behalf-of" element={<OnBehalfOf />} />
        <Route path="manager-dashboard" element={<ManagerDashboard />} />
        <Route path="hr-section" element={<HRSection />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
