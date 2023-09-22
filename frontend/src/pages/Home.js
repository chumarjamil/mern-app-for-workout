import React from 'react';
import { useEffect, useState } from 'react';
const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect( () => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts/')
            const json = await response.json()

            if(response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return(
        <div className="home">
           <div className='workouts'>
            {workouts && workouts.map( (workouts) => (
              <p key={workouts._id}>{workouts.title}</p>  
            ))}
           </div>
        </div>
    )
}

export default Home