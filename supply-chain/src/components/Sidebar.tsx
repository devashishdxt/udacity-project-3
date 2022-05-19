import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/"><div className="sidebar-item">Home</div></Link>
            <Link to="/farmer"><div className="sidebar-item">Farmer</div></Link>
            <Link to="/distributor"><div className="sidebar-item">Distributor</div></Link>
            <Link to="/retailer"><div className="sidebar-item">Retailer</div></Link>
            <Link to="/consumer"><div className="sidebar-item">Consumer</div></Link>
            <Link to="/admin"><div className="sidebar-item">Admin</div></Link>
        </div>
    );
};

export default Sidebar;