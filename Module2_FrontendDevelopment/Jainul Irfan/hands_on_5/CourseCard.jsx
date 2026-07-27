// CourseCard — accepts code, name, credits, grade, onEnroll as props
function CourseCard({ code, name, credits, grade, onEnroll }) {
    return (
        <div style={{ border: '1px solid #dde5e4', borderRadius: '4px', padding: '16px', background: '#f7fbfa' }}>
            <h3>{code}</h3>
            <p>{name}</p>
            <p>{credits} Credits | Grade: {grade}</p>
            {/* Enroll button — invokes the handler passed down from App */}
            <button onClick={onEnroll} style={{ marginTop: '8px', padding: '6px 12px', cursor: 'pointer', background: '#17a398', color: '#fff', border: 'none', borderRadius: '4px' }}>
                Enroll
            </button>
        </div>
    );
}

export default CourseCard;
