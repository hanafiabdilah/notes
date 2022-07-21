import FormAddNote from '../components/FormAddNote'
import { Link } from 'react-router-dom'

import { FaChevronCircleLeft } from 'react-icons/fa'
import { CgNotes } from 'react-icons/cg'

export default function Create() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center">
            <Link to="/" style={{ fontSize: 30 }} className="m-0 text-warning">
              <FaChevronCircleLeft />
            </Link>
            <div className="mx-3"></div>
            <h1 className="m-0 text-warning">
              <CgNotes />
              <span style={{ fontSize: 20 }}>Add</span>
              <br />
              HanNotes
            </h1>
          </div>
        </div>
      </div>
      <FormAddNote />
    </div>
  )
}
