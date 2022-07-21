import Notes from '../components/Notes'
import { useNavigate } from 'react-router-dom'
import { CgNotes } from 'react-icons/cg'

export default function Home() {
  const navigate = useNavigate()

  const tes = () => {
    setTimeout(() => {
      navigate('/create')
    }, 300)
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center">
            <h1 className="m-0 text-warning">
              <CgNotes />
              <span style={{ fontSize: 20 }}>Home</span>
              <br />
              HanNotes
            </h1>
            <div className="mx-3"></div>
            <input
              type="text"
              className="form-control"
              placeholder="Add Note"
              style={{
                height: 45,
                borderRadius: 8,
              }}
              onClick={() => tes()}
            />
          </div>
        </div>
      </div>
      <Notes />
    </div>
  )
}
