import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Assignment = () => {
    const [data, setData] = useState([])
    var limits = 20
    var offset = 1

    const loadMoreData = (sl, offset) => {
        axios.get(`https://api.seatgeek.com/2/events?client_id=MjQ1OTk2ODB8MTYzNzczNDkzNy45MDAwMjE&page=${offset}&per_page=${sl}`)
            .then((res) => {
                res.data.events.forEach((sl) => {
                    setData(e => [...e, sl])
                })
            })
    }

    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            offset = offset + 1;
            loadMoreData(limits, offset)
        }
    }

    useEffect(() => {
        axios.get(`https://api.seatgeek.com/2/events?client_id=MjQ1OTk2ODB8MTYzNzczNDkzNy45MDAwMjE&page=1&per_page=${limits}`)
            .then((res) => {
                setData(res.data.events)
            })
        window.addEventListener('scroll', handleScroll)
    }, [])

    return (
        <div>
            {
                data && data.map((doc) =>
                    <div style={{ padding: '0 2%' }}>
                        <div>
                            <h6>{doc.type}</h6>
                            <h6>{doc.id}</h6>
                            <h6>{doc.title}</h6>
                            <h6>{doc.popularity}</h6>
                            <h6>{doc.url}</h6>
                            <h6>{new Date(doc.datetime_local).toUTCString()}</h6>
                        </div>
                        <hr />
                    </div>
                )
            }
        </div>
    );
};

export default Assignment;