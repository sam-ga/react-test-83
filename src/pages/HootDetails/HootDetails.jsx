import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

// Services
import { show, deleteHoot } from '../../services/hootService'

// Styles
import styles from './HootDetails.module.scss'

// Components
import CommentForm from '../../components/CommentForm/CommentForm'
import Loading from '../../components/Loading/Loading'
import Icon from '../../components/Icon/Icon'

const HootDetails = ({ user }) => {
  const [hoot, setHoot] = useState(null)
  const [errors, setErrors] = useState(null)

  // ! Location variables
  const { hootId } = useParams()
  const navigate = useNavigate()

  const fetchHoot = useCallback(async () => {
    try {
      const { data } = await show(hootId)
      setHoot(data)
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }, [hootId])

  useEffect(() => {
    fetchHoot()
  }, [hootId, fetchHoot])

  // ! Event Handlers
  const handleDeleteHoot = async () => {
    try {
      await deleteHoot(hootId)
      navigate('/hoots')
    } catch (error) {
      console.log(error)
    }
  }

  // Render error message
  if (errors) return <p className='error'>{errors.errorMessage}</p>

  // Render loading message
  if (!hoot) return <Loading />

  return (
    <main className={styles.container}>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()} <Icon category={hoot.category} /></p>
          <h1>{hoot.title}</h1>
          <p>
            {hoot.author.username} posted on
            {new Date(hoot.createdAt).toLocaleDateString()}
          </p>

          {/* Authorized actions */}
          { hoot.author._id === user._id && 
            <>
              <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
              <button onClick={handleDeleteHoot}>Delete</button>
            </>
          }
        </header>
      <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>
        {!hoot.comments.length && <p>There are no comments.</p>}
        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
        <CommentForm hootId={hootId} fetchHoot={fetchHoot} />
      </section>
    </main>
  )
}

export default HootDetails
