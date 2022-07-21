import { useState, useEffect } from 'react'
import Alert from './Alert'
import { url } from '../config/Api'
import { useParams } from 'react-router-dom'
import { AiFillPlusCircle } from 'react-icons/ai'

function FormEditNote() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const [body, setBody] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [status, setStatus] = useState(null)
  const [validationError, setValidationError] = useState({})
  const { id } = useParams()

  useEffect(() => {
    function getProductById() {
      fetch(`${url}/notes/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setTitle(result.data.note.title)
            setTags(result.data.note.tags.join(','))
            setBody(result.data.note.body)
            setMessage(result.message)
            setIsSuccess(true)
            setIsLoaded(true)
            setStatus(result.data.status)
          },
          (error) => {
            setError(error)
          }
        )
    }

    getProductById()
  }, [id])

  function handleValidation() {
    let isValid = true

    if (!title) {
      isValid = false
      setValidationError((prevState) => ({
        ...prevState,
        title: 'Cannot be empty',
      }))
    }

    if (!tags) {
      isValid = false
      setValidationError((prevState) => ({
        ...prevState,
        tags: 'Cannot be empty',
      }))
    }

    if (!body) {
      isValid = false
      setValidationError((prevState) => ({
        ...prevState,
        body: 'Cannot be empty',
      }))
    }

    console.log(validationError)

    return isValid
  }

  function updateNote(e) {
    e.preventDefault()

    if (handleValidation()) {
      let arrTags = tags.split(',')

      const data = {
        title,
        tags: arrTags,
        body,
      }

      fetch(`${url}/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setMessage(result.message)
            setIsSuccess(result.status === 'fail' ? false : true)
          },
          (error) => {
            setError(error)
          }
        )
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  } else if (!isLoaded) {
    return <div>Tunggu, Data sedang diproses...</div>
  } else if (status === 'fail') {
    return <div>{message}</div>
  } else {
    return (
      <>
        {message ? <Alert isSuccess={isSuccess} message={message} /> : ''}
        <div className="row mt-5">
          <div className="col-md-6">
            <form onSubmit={updateNote}>
              <input
                type="text"
                name="title"
                id="title"
                className={`form-control ${
                  validationError.title ? 'is-invalid' : ''
                }`}
                value={title}
                placeholder={validationError.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                name="tags"
                id="tags"
                className={`form-control mt-2 ${
                  validationError.tags ? 'is-invalid' : ''
                }`}
                value={tags}
                placeholder={validationError.tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <textarea
                className={`form-control mt-2 ${
                  validationError.body ? 'is-invalid' : ''
                }`}
                placeholder={validationError.body ?? 'Body'}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="8"
              ></textarea>
              <div className="form-group text-right ">
                <button
                  type="submit"
                  className="btn text-primary"
                  style={{ fontSize: 40 }}
                >
                  <AiFillPlusCircle />
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default FormEditNote
