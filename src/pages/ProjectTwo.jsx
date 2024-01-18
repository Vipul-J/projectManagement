import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProjectTwo() {
  const [profName, setProfName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [dateOfCommencement, setDateOfCommencement] = useState('');
  const [expectedCompletionDate, setExpectedCompletionDate] = useState('');
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:3001/api/ongoingProjects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3001/api/ongoingProjects', {
      profName,
      projectTitle,
      dateOfCommencement,
      expectedCompletionDate,
    })
      .then(response => {
        console.log(response.data);
        // Clear form fields after submission
        setProfName('');
        setProjectTitle('');
        setDateOfCommencement('');
        setExpectedCompletionDate('');
        // Fetch updated projects after submitting
        fetchData();
      })
      .catch(error => console.error(error));
  };

  const filteredProjects = projects.filter(project =>
    (project.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.profName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    isValidDate(project.dateOfCommencement) &&
    isValidDate(project.expectedCompletionDate)
  );

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className='border border-3 rounded p-5'>
          <h1 className="mb-4 text-decoration-underline text-center mb-4">On Going Projects</h1>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Prof Name:</label>
              <input type="text" className="form-control" value={profName} onChange={(e) => setProfName(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Project Title:</label>
              <input type="text" className="form-control" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Date of Commencement:</label>
              <input type="date" className="form-control" value={dateOfCommencement} onChange={(e) => setDateOfCommencement(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Expected Completion Date:</label>
              <input type="date" className="form-control" value={expectedCompletionDate} onChange={(e) => setExpectedCompletionDate(e.target.value)} required />
            </div>
          </div>

          <button className="btn btn-info fw-bolder text-white" onClick={handleSubmit}>Update Project</button>
        </div>

        <h2 className="mt-4 text-center mt-3">On Going Projects Data</h2>
        <div className="input-group mt-3 mb-3 d-flex justify-content-center align-items center">
          <span className="input-group-text">
            <BsSearch />
          </span>
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Title or Professor"
            style={{ maxWidth: '380px' }}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-striped table-bordered shadow">
            <thead>
              <tr>
                <th>Prof Name</th>
                <th>Project Title</th>
                <th>Date of Commencement</th>
                <th>Expected Completion Date</th>
              </tr>
            </thead>
            <tbody>
            {filteredProjects.map((project, index) => (
            <tr key={index}>
              <td>{project.profName}</td>
              <td>{project.projectTitle}</td>
              <td>{new Date(project.dateOfCommencement).toLocaleDateString()}</td>
              <td>{new Date(project.expectedCompletionDate).toLocaleDateString()}</td>
            </tr>
          ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
}
function isValidDate(dateString) {
  const parsedDate = new Date(dateString);
  return !isNaN(parsedDate.getTime()) && parsedDate.toString() !== 'Invalid Date';
}


export default ProjectTwo;
