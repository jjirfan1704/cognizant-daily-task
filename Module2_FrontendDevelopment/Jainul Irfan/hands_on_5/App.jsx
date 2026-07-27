import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseCard from './components/CourseCard';
import StudentProfile from './components/StudentProfile';

function App() {

    // course list + async status flags
    const [modules, setModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // search box state
    const [query, setQuery] = useState('');

    // enrolled list, lifted up so both Header and CourseCard can use it
    const [enrolled, setEnrolled] = useState([]);

    // fetch runs once on mount ([] dependency array = componentDidMount equivalent)
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts => {
                // use a different slice of posts than post #0-4 so the content differs
                const mapped = posts.slice(5, 10).map((post, i) => ({
                    id: post.id,
                    code: `LT-10${i + 1}`,
                    name: post.title.slice(0, 30),
                    credits: (i % 2 === 0) ? 3 : 4,
                    grade: ['B', 'A', 'C', 'A', 'B'][i],
                }));
                setModules(mapped);
                setIsLoading(false);
            })
            .catch(err => {
                setLoadError(err.message);
                setIsLoading(false);
            });
    }, []);

    // logs whenever the module list changes.
    // the [modules] dependency array matters here: without it, this effect would
    // re-run after every single render (including ones unrelated to modules),
    // and since some of those renders are caused by state this effect could touch,
    // that risks an infinite render loop. Scoping it to [modules] means it only
    // fires when the course list itself actually changes.
    useEffect(() => {
        console.log('Module list updated:', modules.length);
    }, [modules]);

    // enroll handler — lifts the update up from CourseCard into App's state
    function handleEnroll(mod) {
        const isAlreadyEnrolled = enrolled.some(m => m.id === mod.id);
        if (!isAlreadyEnrolled) {
            setEnrolled([...enrolled, mod]);
        }
    }

    // derive the visible list from the search query
    const visibleModules = modules.filter(m =>
        m.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <Header portalName="Learning Tracker" enrollmentCount={enrolled.length} />

            <main style={{ maxWidth: '960px', margin: '24px auto', padding: '0 16px' }}>

                <h2 style={{ marginBottom: '12px' }}>My Courses</h2>

                <input
                    type="text"
                    placeholder="Search by course title..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    style={{ padding: '8px', marginBottom: '16px', width: '100%' }}
                />

                {isLoading && <p>Loading...</p>}

                {loadError && <p style={{ color: 'red' }}>Error: {loadError}</p>}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {visibleModules.map(mod => (
                        <CourseCard
                            key={mod.id}
                            {...mod}
                            onEnroll={() => handleEnroll(mod)}
                        />
                    ))}
                </div>

                <StudentProfile />

            </main>

            <Footer />
        </>
    );
}

export default App;
