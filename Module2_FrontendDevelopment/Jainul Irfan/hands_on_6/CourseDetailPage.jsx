import { useParams } from 'react-router-dom';

// useParams reads :moduleId from the URL
function CourseDetailPage() {
    const { moduleId } = useParams();

    return (
        <div style={{ padding: '24px' }}>
            <h2>Course Detail</h2>
            <p>Showing details for course ID: <strong>{moduleId}</strong></p>
            <p>A real app would fetch this course's full record from the API using this ID.</p>
        </div>
    );
}

export default CourseDetailPage;
