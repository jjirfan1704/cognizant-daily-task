import { Link } from 'react-router-dom';

// each card links to /courses/:moduleId
function CourseCard({ id, name, code, credits, grade, onEnroll }) {
    return (
        <div style={{ border: '1px solid #dde5e4', borderRadius: '4px', padding: '16px', background: '#f7fbfa' }}>
            <h3>{code}</h3>
            <p>{name}</p>
            <p>{credits} Credits | Grade: {grade}</p>
            <Link to={`/courses/${id}`} style={{ display: 'inline-block', marginTop: '8px', marginRight: '8px', color: '#0f5e56' }}>
                Details
            </Link>
            <button onClick={onEnroll} style={{ marginTop: '8px', padding: '6px 12px', cursor: 'pointer', background: '#17a398', color: '#fff', border: 'none', borderRadius: '4px' }}>
                Enroll
            </button>
        </div>
    );
}

export default CourseCard;
