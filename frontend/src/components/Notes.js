import React from 'react'
import Alert from './Alert'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { url } from '../config/Api'

class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      message: null,
      isSuccess: false,
    }
    this.deleteNote = this.deleteNote.bind(this)
  }

  componentDidMount() {
    fetch(`${url}/notes`)
      .then((res) => res.json())
      .then((result) => {
        this.setState(
          {
            isLoaded: true,
            items: result.data,
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            })
          }
        )
      })
  }

  deleteNote(id) {
    fetch(`${url}/notes/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoaded: false,
          message: result.message,
          isSuccess: result.status === 'fail' ? false : true,
        })
        this.componentDidMount()
      })
  }

  render() {
    const { error, isLoaded, items, message, isSuccess } = this.state
    if (error) {
      return <div>Error : {message}</div>
    } else if (!isLoaded) {
      return <div>Data sedang diambil, silahkan tunggu ...</div>
    } else {
      if (items.notes.length > 0) {
        return (
          <div>
            {message ? <Alert isSuccess={isSuccess} message={message} /> : ''}
            <div className="card-columns mt-5">
              {items.notes.map((item, index) => {
                return (
                  <div className="card" key={index}>
                    <Link to={`/edit/${item.id}`}>
                      <div className="card-body py-3">
                        {item.tags.map((tag, index) => {
                          return (
                            <span
                              className={`tag mt-1 ${
                                index % 2 === 1 ? 'mx-2' : ''
                              }`}
                              style={{
                                backgroundColor: `#${Math.floor(
                                  Math.random() * 16777215
                                ).toString(16)}70`,
                              }}
                              key={index}
                            >
                              {tag}
                            </span>
                          )
                        })}
                        <h3 className="mt-2">{item.title}</h3>
                        <p className="description mb-2">{item.body}</p>
                        <small>Last Update : {item.updatedAt}</small>
                      </div>
                    </Link>
                    <div className="card-footer text-right m-0 p-1">
                      <button
                        onClick={() => this.deleteNote(item.id)}
                        className="delete-button"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      } else {
        return (
          <div className="row mt-3">
            <h3>No Note</h3>
          </div>
        )
      }
    }
  }
}

export default Notes
