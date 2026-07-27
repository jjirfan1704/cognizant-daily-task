// Header — receives portalName and enrollmentCount as props
function Header({ portalName, enrollmentCount }) {
    return (
        <header style={{ background: '#0f5e56', color: '#fff', padding: '16px 24px' }}>
            <h1>{portalName}</h1>
            <nav>
                <a href="#" style={{ color: '#fff', marginRight: '16px' }}>Home</a>
                <a href="#" style={{ color: '#fff', marginRight: '16px' }}>Courses</a>
                <a href="#" style={{ color: '#fff' }}>Profile</a>
            </nav>
            {/* enrollment count passed down as a prop from App */}
            <p>Enrolled: {enrollmentCount}</p>
        </header>
    );
}

export default Header;
