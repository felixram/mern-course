import { useDashboardContext } from "../pages/DashboardLayout"
import links from "../utils/links"
import { NavLink } from "react-router-dom"

const NavLinks = ({ isBigSidebar }) => {
    const { toggleSidebar, user } = useDashboardContext();
    return (
        <div className="nav-links">
            {links.map(link => {
                const { path, text, icon } = link;
                const { rol } = user;
                if (path === 'admin' && rol !== 'admin') return;
                return <NavLink onClick={!isBigSidebar && toggleSidebar} to={path} key={text} className='nav-link' end><span className="icon">
                    {icon}
                </span>{text}</NavLink>
            })}
        </div>
    )
}

export default NavLinks