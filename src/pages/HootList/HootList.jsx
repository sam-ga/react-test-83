import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Services
import { index } from '../../services/hootService'

// Styles
import styles from './HootList.module.scss'

const HootList = () => {

  const [hoots, setHoots] = useState([])

  useEffect(() => {
    const fetchHoots = async () => {
      try {
        const { data } = await index()
        setHoots(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchHoots()
  }, [])

  return (
    <main className={styles.container}>
        { hoots.map((hoot) => (
          <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
            <article>
              <header>
                <h2>{hoot.title}</h2>
                <p>
                  {hoot.author.username} posted on 
                  {new Date(hoot.createdAt).toLocaleDateString()}
                </p>
              </header>
              <p>{hoot.text}</p>
            </article>
          </Link>
        ))}
    </main>
  )
}

export default HootList
