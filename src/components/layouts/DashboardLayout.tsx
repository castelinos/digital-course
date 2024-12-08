import "@/assets/css/dashboard/layout.css";
import CurrencyFrancIcon from '@mui/icons-material/CurrencyFranc';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
    return (
        <section className="layout-container">

            {/* Sidebar */}
            <section className="d-flex flex-column flex-shrink-0 bg-black pt-2 border-end border-dark">
                <div className="nav nav-flush flex-column text-center px-2">
                    <div className="nav-item mt-3">
                        <a href="#" className="nav-link py-3">
                            <CurrencyFrancIcon className="fs-2 text-warning" />
                        </a>
                    </div>
                    <div className="nav-list mt-4 mx-2">
                        <div className="nav-list-item">
                            <PersonIcon />
                        </div>

                        <div className="nav-list-item">
                            <AssessmentRoundedIcon />
                        </div>
                    </div>
                </div>
                
            </section>

            <section className="layout-body">

                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                    <div className="container-fluid my-3">
                        <a className="navbar-brand fs-2 fw-normal px-4" href="#">Users</a>

                        <div className="d-flex fs-6">
                            Logout
                        </div>
                    </div>
                </nav>

                <Outlet />
            </section>
        </section>
    )
}

export default DashboardLayout;