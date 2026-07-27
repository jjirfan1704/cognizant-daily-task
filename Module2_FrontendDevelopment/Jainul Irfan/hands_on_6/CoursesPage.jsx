import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { enrollModule } from '../store/enrollmentSlice';
import CourseCard from '../components/CourseCard';

function CoursesPage() {
    const [modules, setModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts => {
                // different slice of posts than the base exercise, so the
                // actual rendered course titles differ
                const mapped = posts.slice(5, 10).map((post, i) => ({
                    id: post.id,
                    code: `LT-10${i + 1}`,
                    name: post.title.slice(0, 30),
                    credits: i % 2 === 0 ? 3 : 4,
                    grade: ['B', 'A', 'C', 'A', 'B'][i],
                }));
                setModules(mapped);
                setIsLoading(false);
            });
    }, []);

    // dispatch the enroll action, then jump to the profile page to show it worked
    function handleEnroll(mod) {
        dispatch(enrollModule(mod));
        navigate('/profile');
    }

    const visibleModules = modules.filter(m =>
        m.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div style={{ padding: '24px' }}>
            <h2>Courses</h2>
            <input
                type="text"
                placeholder="Search by course title..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ padding: '8px', marginBottom: '16px', width: '100%' }}
            />
            {isLoading && <p>Loading...</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {visibleModules.map(mod => (
                    <CourseCard
                        key={mod.id}
                        {...mod}
                        onEnroll={() => handleEnroll(mod)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CoursesPage;
