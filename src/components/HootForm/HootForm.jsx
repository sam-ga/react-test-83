import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './HootForm.module.scss'

// Services
import { show, create, update } from '../../services/hootService'

const HootForm = () => {

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News',
  })
  const [errors, setErrors] = useState({})

  // ! Location Variables
  const navigate = useNavigate()
  const { hootId } = useParams()

  useEffect(() => {
    const fetchHoot = async () => {
      try {
        const { data } = await show(hootId)
        setFormData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (hootId) fetchHoot()
  }, [hootId])

  // ! Event Handlers
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res
      if (hootId) {
        res = await update(hootId, formData)
      } else {
        res = await create(formData)
      }
      navigate(`/hoots/${res.data._id}`)
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data)
    }
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>{ hootId ? 'Update' : 'Create'} a hoot</h1>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className='error'>{errors.title.message}</p>}
        <label htmlFor="text-input">Text</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        {errors.text && <p className='error'>{errors.text.message}</p>}
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        
        {/* Generic error message */}
        {errors.errorMessage && <p className='error'>{errors.errorMessage}</p>}
        
        <button type="submit">{ hootId ? 'Update' : 'Create'} Hoot</button>
      </form>
    </main>
  )
}

export default HootForm
