// src/components/CommentForm/CommentForm.jsx

import { useState, useEffect } from 'react'

import styles from './CommentForm.module.scss'

import { createComment } from '../../services/hootService'

const CommentForm = ({ hootId, fetchHoot }) => {
  const [formData, setFormData] = useState({ text: '' })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    // handleAddComment
    try {
      const { data } = await createComment(hootId, formData)
      // Update state to show comment
      fetchHoot()
      setFormData({ text: '' })
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text-input">Your comment:</label>
        <textarea
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        <button type="submit">SUBMIT COMMENT</button>
      </form>
    </main>
  )
}

export default CommentForm
