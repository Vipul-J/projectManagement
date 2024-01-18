const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS
// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/sexysathvikk', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Create a schema for your data
const projectSchema = new mongoose.Schema({
    profName: String,
    projectTitle: String,
    completionDate: Date,
    dateOfCommencement: Date,
    expectedCompletionDate: Date,
});

const Project = mongoose.model('Project', projectSchema);

// Middleware
app.use(bodyParser.json());



app.post('/api/projects', async (req, res) => {
    try {
        const { profName, projectTitle, completionDate } = req.body;
        const newProject = new Project({
            profName,
            projectTitle,
            completionDate,
        });
        await newProject.save();
        res.status(201).send('Project saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving project');
    }
});

app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        
        // Map the projects and format the date to avoid "Invalid Date" display
        const formattedProjects = projects.map(project => ({
            profName: project.profName,
            projectTitle: project.projectTitle,
            completionDate: project.completionDate ? project.completionDate.toLocaleDateString() : 'N/A',
        }));

        res.json(formattedProjects);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching projects');
    }
});


app.post('/api/ongoingProjects', async (req, res) => {
    const { profName, projectTitle, dateOfCommencement, expectedCompletionDate } = req.body;

    const newProject = new Project({
        profName,
        projectTitle,
        dateOfCommencement,
        expectedCompletionDate,
    });

    try {
        await newProject.save();
        res.status(201).send('Project saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving project');
    }
});

app.get('/api/ongoingProjects', async (req, res) => {
    try {
        const ongoingProjects = await Project.find({});
        res.status(200).json(ongoingProjects);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching ongoing projects');
    }
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});