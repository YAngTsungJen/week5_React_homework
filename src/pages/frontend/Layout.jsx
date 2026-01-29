import { Outlet,NavLink, useNavigate } from "react-router";
function Layout(){
    const navigate = useNavigate();
    const navLinkClass = ({isActive})=>{
        return isActive ? 'nav-link linkisActive': 'nav-link';
    }
    const brandClass = ({isActive})=>{
        return isActive ? 'navbar-brand linkisActive': 'navbar-brand';
    }
    const changeToAdmin = () => {
        setTimeout(() => {
            navigate('/adminLayout')
        }, 2000);
    }
    return(<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink  className={brandClass} to="/">首頁</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className={navLinkClass} aria-current="page" to="/about">關於我</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={navLinkClass} to="/products">產品</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={navLinkClass} to="/carts">購物車列表</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className={navLinkClass}  onClick={changeToAdmin}>後台登入</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <Outlet />
    <footer className="mt-5 text-center">
        <p>© 2025 我的網站</p>
    </footer>
    </>)
}
export default Layout;
