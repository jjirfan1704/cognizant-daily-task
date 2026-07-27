import { useSelector, useDispatch } from 'react-redux';
import { unenrollModule } from '../store/enrollmentSlice';

// reads enrolledModules from Redux, dispatches unenrollModule
function ProfilePage() {
    const enrolledModules = useSelector(state => state.enrollment.enrolledModules);
    const dispatch = useDispatch();

    return (
        <div style={{ padding: '24px' }}>
            <h2>My Profile</h2>
            <h3 style={{ marginTop: '16px' }}>Enrolled Courses ({enrolledModules.length})</h3>
            {enrolledModules.length === 0 && <p>You haven't enrolled in anything yet.</p>}
            <ul style={{ marginTop: '12px', listStyle: 'none', padding: 0 }}>
                {enrolledModules.map(mod => (
                    <li key={mod.id} style={{ border: '1px solid #dde5e4', borderRadius: '4px', padding: '12px', marginBottom: '8px' }}>
                        <strong>{mod.code}</strong> — {mod.name}
                        <button
                            onClick={() => dispatch(unenrollModule(mod.id))}
                            style={{ marginLeft: '12px', padding: '4px 10px', cursor: 'pointer', color: '#c0392b' }}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfilePage;
