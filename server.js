// Import necessary modules
const http = require('http');

// Initialise dependences / variables
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');


app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// QUESTION 1: Creating a GET endpoint to retrieve all patients

 app.get('', (req, res) => {
  const getPatients = "SELECT * FROM patients"
  db.query(getPatients, (err, results) => {
    // if there is an error
    if (err) {
      return res.status(500).send("Failed to retrieve patients", err)
  
    }
    // Send the retrieved patient data as a response
    res.status(200).send(results);
  });
});


// QUESTION 2: Creating a GET endpoint to retrieve all providers

 app.get('', (req, res) => {
  // Define the SQL query to get provider details
  const getProviders = "SELECT * FROM providers"
  
  // Execute the query
  db.query(getProviders, (err, results) => {
    // If there is an error
    if (err) {
      return res.status(500).send("Failed to retrieve providers: " + err.message)
    }
    
    // Send the retrieved provider data as a response
    res.status(200).send(results);
  });
});

// QUESTION 3: Creating a GET endpoint to retrieve all patients' first names

 app.get('', (req, res) => {
  // SQL query to select all patients' first names
  const getPatientFirstNames = "SELECT first_name FROM patients"
  
  // Execute the query
  db.query(getPatientFirstNames, (err, results) => {
    // If there is an error
    if (err) {
      return res.status(500).send("Failed to retrieve patient names", err)
    }

    // Send the retrieved patient first names as a response
    res.status(200).send(results);
  });
}); 

// QUESTION 4: Creating a GET endpoint that retrieves all providers by their specialty

app.get('', (req, res) => { 
  // SQL query to select all providers' specialties
  const getProviderSpecialties = "SELECT first_name, last_name, provider_specialty FROM providers"
  
  // Execute the query
  db.query(getProviderSpecialties, (err, results) => {
    // If there is an error
    if (err) {
      console.error(err); 
      return res.status(500).send("Failed to retrieve providers' specialties")
    }

    // Send the retrieved provider data as a response
    res.status(200).json(results); 
  });
});


// listen to server port 3300
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
  })
  

