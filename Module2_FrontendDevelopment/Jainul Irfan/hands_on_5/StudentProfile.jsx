import { useState } from 'react';

// StudentProfile — owns its own local state, form with onChange handlers
function StudentProfile() {
    const [fullName, setFullName] = useState('');
    const [semester, setSemester] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div style={{ border: '1px solid #dde5e4', borderRadius: '4px', padding: '20px', marginTop: '24px' }}>
            <h2>My Profile</h2>
            <div style={{ marginTop: '12px' }}>
                <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    style={{ display: 'block', marginBottom: '8px', padding: '8px', width: '100%' }}
                />
                <input
                    type="text"
                    placeholder="Semester"
                    value={semester}
                    onChange={e => setSemester(e.target.value)}
                    style={{ display: 'block', marginBottom: '8px', padding: '8px', width: '100%' }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ display: 'block', padding: '8px', width: '100%' }}
                />
            </div>
            {fullName && <p style={{ marginTop: '12px' }}>Hello, {fullName}! Semester: {semester}</p>}
        </div>
    );
}

export default StudentProfile;
