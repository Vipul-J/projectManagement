import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { BsSearch } from 'react-icons/bs'; // Import the search icon from react-icons
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProjectOne() {
  const [profName, setProfName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch projects from the server when the component mounts
    axios.get('http://localhost:3001/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = () => {
    // Submit the form data to the server
    if (!profName || !projectTitle || !completionDate) {
      // Check if any required field is empty
      alert('Please fill in all required fields.');
      return;
    }

    axios.post('http://localhost:3001/api/projects', {
      profName,
      projectTitle,
      completionDate,
    })
      .then(response => {
        console.log(response.data);
        // Fetch updated projects after submitting
        axios.get('http://localhost:3001/api/projects')
          .then(response => setProjects(response.data))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  };

  // Filter projects based on search query
  const filteredProjects = projects.filter(project =>
    (project.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.profName.toLowerCase().includes(searchQuery.toLowerCase())) &&
    isValidDate(project.completionDate)
  );
  return (
    <>
<Navbar />
<div className="container mt-5">
      <div className='border border-3 rounded  p-5'>
      <h1 className="mb-4 text-decoration-underline text-center mb-4">Completed Projects</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Prof Name:</label>
          <input type="text" className="form-control" value={profName} onChange={(e) => setProfName(e.target.value)} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Project Title:</label>
          <input type="text" className="form-control" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Completion Date:</label>
          <input type="date" className="form-control" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} required />
        </div>
      </div>

      <button className="btn btn-info fw-bolder text-white" onClick={handleSubmit}>Add Project</button>
      </div>
      <h2 className="mt-4 text-center mt-3">Completed Projects Data </h2>
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
          style={{ maxWidth: '380px' }} // Adjust the width as needed
        />
      </div>
      <table className="table table-striped shadow">
        <thead>
          <tr>
            <th>Prof Name</th>
            <th>Project Title</th>
            <th>Completion Date</th>
          </tr>
        </thead>
        <tbody>
        {filteredProjects.map((project, index) => (
            <tr key={index}>
              <td>{project.profName}</td>
              <td>{project.projectTitle}</td>
              <td>{new Date(project.completionDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  );
}

function isValidDate(dateString) {
  const parsedDate = new Date(dateString);
  return !isNaN(parsedDate.getTime()) && parsedDate.toString() !== 'Invalid Date';
}


export default ProjectOne;
