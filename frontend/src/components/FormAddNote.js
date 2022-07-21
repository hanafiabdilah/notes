import React from 'react'
import { url } from '../config/Api'
import Alert from '../components/Alert'
import { AiFillPlusCircle } from 'react-icons/ai'

class FormAddNote extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tags: '',
      body: '',
      error: null,
      message: null,
      isSuccess: false,
      validationError: {},
    }
    this.addNote = this.addNote.bind(this)
  }

  handleValidation() {
    let isValid = true

    if (!this.state.title) {
      isValid = false
      this.setState((prevState) => ({
        validationError: {
          ...prevState.validationError,
          title: 'Cannot be empty',
        },
      }))
    }

    if (!this.state.tags) {
      isValid = false
      this.setState((prevState) => ({
        validationError: {
          ...prevState.validationError,
          tags: 'Cannot be empty',
        },
      }))
    }

    if (!this.state.body) {
      isValid = false
      this.setState((prevState) => ({
        validationError: {
          ...prevState.validationError,
          body: 'Cannot be empty',
        },
      }))
    }

    return isValid
  }

  addNote(e) {
    e.preventDefault()

    if (this.handleValidation()) {
      let tags = this.state.tags.split(',')

      const data = {
        title: this.state.title,
        tags: tags,
        body: this.state.body,
      }

      fetch(`${url}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          this.setState(
            {
              message: result.message,
              title: '',
              tags: [''],
              body: '',
              isSuccess: result.status === 'fail' ? false : true,
            },
            (error) => {
              this.setState({
                error,
              })
            }
          )
        })
    }
  }

  render() {
    const { error, message, isSuccess, validationError } = this.state
    if (error) {
      return <div>Error: {error}</div>
    } else
      return (
        <>
          {message ? <Alert isSuccess={isSuccess} message={message} /> : ''}
          <div className="row mt-5">
            <div className="col-md-6">
              <form onSubmit={this.addNote}>
                <input
                  refs="name"
                  type="text"
                  name="title"
                  id="title"
                  className={`form-control ${
                    validationError.title ? 'is-invalid' : ''
                  }`}
                  placeholder={validationError.title ?? 'Title'}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  className={`form-control mt-2 ${
                    validationError.tags ? 'is-invalid' : ''
                  }`}
                  placeholder={
                    validationError.tags ?? 'Tags (Separate with comma)'
                  }
                  onChange={(e) => this.setState({ tags: e.target.value })}
                />
                <textarea
                  className={`form-control mt-2 ${
                    validationError.body ? 'is-invalid' : ''
                  }`}
                  placeholder={validationError.body ?? 'Body'}
                  onChange={(e) => this.setState({ body: e.target.value })}
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

export default FormAddNote
