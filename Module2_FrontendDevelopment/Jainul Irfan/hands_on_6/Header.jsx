import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// nav links use <Link> for client-side routing
// enrolled count is read straight from Redux via useSelector — no props needed
function Header({ portalName }) {
    const enrolledModules = useSelector(state => state.enrollment.enrolledModules);

    return (
        <header style={{ background: '#0f5e56', color: '#fff', padding: '16px 24px' }}>
            <h1>{portalName}</h1>
            <nav style={{ marginTop: '8px' }}>
                <Link to="/" style={{ color: '#fff', marginRight: '16px' }}>Home</Link>
                <Link to="/courses" style={{ color: '#fff', marginRight: '16px' }}>Courses</Link>
                <Link to="/profile" style={{ color: '#fff' }}>Profile</Link>
            </nav>
            <p style={{ marginTop: '8px' }}>Enrolled: {enrolledModules.length}</p>
        </header>
    );
}

export default Header;
