import { useEffect, useRef, useState } from 'react';

export default function VirtualList() {
    const rowRefs = useRef([]);
    const frameRef = useRef(null);

    const [items, setItems] = useState([]);
    const [status, setStatus] = useState('loading');
    const [heights, setHeights] = useState({});


    useEffect(() => {
        let cancelled = false;

        async function loadItems() {
            try {
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts',
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }

                const data = await response.json();

                // multiply data for heavier demo
                const multiplied = Array.from(
                    { length: 20 },
                    (_, groupIndex) =>
                        data.map((item) => ({
                            ...item,
                            id: `${groupIndex}-${item.id}`,
                        })),
                ).flat();

                if (!cancelled) {
                    setItems(multiplied);
                    setStatus('success');
                }
            } catch (error) {
                if (!cancelled) {
                    console.error(error);
                    setStatus('error');
                }
            }
        }

        loadItems();

        return () => {
            cancelled = true;

            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const getNextHeight = (index) =>
        `${120 + Math.sin(Date.now() / 200 + index) * 10}px`;


    // Bad on scroll
    function badOnScroll() {
        rowRefs.current.forEach((row, index) => {
            if (!row) {
                return;
            }
            // WRITE → invalidates layout
            row.style.height = getNextHeight(index);
            // READ → forces synchronous layout
            const height = row.getBoundingClientRect().height;
            // React WRITE again
            setHeights((prev) => ({
                ...prev,
                [index]: height,
            }));
        });
    }

    // Good on scroll
    // NOTE: Don't forget to off height style in render!
    function measureRows() {
        const nextHeights = {};
        // READ only once
        rowRefs.current.forEach((row, index) => {
            if (!row) {
                return;
            }
            nextHeights[index] = row.getBoundingClientRect().height;
        });
        // WRITE only once
        setHeights(nextHeights);
    }

    function goodOnScroll() {
        if (frameRef.current) {
            return;
        }
        frameRef.current = requestAnimationFrame(() => {
            frameRef.current = null;
            measureRows();
        });
    }

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'error') {
        return <div>Failed to load items</div>;
    }

    return (
        <div className="list" onScroll={goodOnScroll}>
            {items.map((item, index) => (
                <div
                    className="list-row"
                    key={item.id}
                    ref={(el) => {
                        rowRefs.current[index] = el;
                    }}
                    style={{
                        height: heights[index] ?? 120,
                    }}
                >
                    <h3>{item.title}</h3>

                    <p>
                        {item.body}
                        {' '}
                        {item.body}
                        {' '}
                        {item.body}
                    </p>
                </div>
            ))}
        </div>
    );
}