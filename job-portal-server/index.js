const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const bcrypt = require("bcryptjs");
require("dotenv").config();

app.use(express.json());
app.use(cors(
  {
    origin: 'https://mern-app-job-portal.vercel.app/'
  }
));

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://ganeshvathumilli:Pn5v6mWgQVZX2DTG@job-portal-demo.0cojxv1.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demoJobs");
    const resumesCollection = db.collection("resumes");
    const usersCollection = db.collection("users");

    // Post a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      const result = await jobsCollections.insertOne(body);
      if (result.insertedId) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: "Cannot insert! try again later", status: false });
      }
    });

    // Get all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollections.find({}).toArray();
      res.send(jobs);
    });

    // Get single job by id
    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollections.findOne({ _id: new ObjectId(id) });
      res.send(job);
    });

    // Delete a job
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollections.deleteOne(filter);
      res.send(result);
    });

    // Update a job
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = { $set: { ...jobData } };
      const result = await jobsCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Get jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      const jobs = await jobsCollections.find({ postedBy: req.params.email }).toArray();
      res.send(jobs);
    });

    // Get all resumes
    app.get("/all-resumes", async (req, res) => {
      try {
        const resumes = await resumesCollection.find({}).toArray();
        res.status(200).send(resumes);
      } catch (error) {
        console.error("Failed to fetch resumes: ", error);
        res.status(500).send({ message: "Failed to fetch resumes", status: false });
      }
    });

    // Submit resume
    app.post("/submit-resume", async (req, res) => {
      const { jobTitle, jobId, companyName, resumeLink, gmailId } = req.body;
      const resumeData = {
        jobId: new ObjectId(jobId),
        companyName,
        jobTitle,
        resumeLink,
        gmailId,
        submittedAt: new Date(),
      };
      try {
        const result = await resumesCollection.insertOne(resumeData);
        if (result.insertedId) {
          res.status(200).send(result);
        } else {
          res.status(500).send({ message: "Failed to submit resume. Try again later.", status: false });
        }
      } catch (error) {
        console.error("Error submitting resume: ", error);
        res.status(500).send({ message: "Failed to submit resume due to server error. Try again later.", status: false });
      }
    });

    // Delete resume
    app.delete("/resume/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const result = await resumesCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res.status(200).send({ acknowledged: true });
        } else {
          res.status(404).send({ message: "Resume not found" });
        }
      } catch (error) {
        console.error("Error deleting resume: ", error);
        res.status(500).send({ message: "Failed to delete resume due to server error" });
      }
    });

    // Signup endpoint
    app.post("/signup", async (req, res) => {
      const { name, email, password } = req.body;
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { name, email, password: hashedPassword };
      await usersCollection.insertOne(newUser);
      res.status(201).json({ message: "User created successfully" });
    });

    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    
      const jobs = await jobsCollections.find({ postedBy: email }).toArray();
      const isNewUser = jobs.length === 0;
    
      res.status(200).json({ message: "Login successful", user, isNewUser });
    });
    

    // Get jobs for logged-in user
    app.get("/jobs", async (req, res) => {
      const email = req.query.email;
      const jobs = await jobsCollections.find({ postedBy: email }).toArray();
      res.send(jobs);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Optional: Uncomment to close the client after the run function completes
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Dev!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
