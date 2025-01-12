const express = require('express');
const multer = require('multer');
const { PythonShell } = require('python-shell');
const ort = require('onnxruntime-node');
const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Configure Winston logging
const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    // Log to console
    new winston.transports.Console({ format: winston.format.simple() }),
    // Log to a file
    new winston.transports.File({ filename: 'app.log' }),
  ],
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  dest: 'uploads/'
}).single('data');

app.post('/recommend', (req, res) => {
  upload(req, res, async (err) => {
    // Handle file upload errors
    if (err) {
      logger.error(`Error uploading file: ${err.message}`);
      return res.status(400).send('File upload failed. Please check the file and try again.');
    }

    if (!req.file) {
      logger.warn('No file uploaded.');
      return res.status(400).send('No file uploaded.');
    }

    try {
      const filePath = path.join(__dirname, req.file.path);
      logger.info(`Received file: ${req.file.originalname}, processing started.`);

      // Run the preprocessing Python script
      const pyshell = new PythonShell('preprocessor.py', {
        args: [filePath],
      });

      pyshell.on('message', async (message) => {
        try {
          // Parse the processed data from the Python script
          const processedData = JSON.parse(message);

          // Validate the structure and shape of the data
          if (!processedData.features || processedData.features.length === 0 || !Array.isArray(processedData.features[0])) {
            logger.warn('Invalid feature format or empty feature set received.');
            return res.status(400).send('Invalid feature format or no valid features extracted from the data.');
          }

          // Log the shape of the features (for debugging purposes)
          logger.info(`Received features with shape: ${processedData.features.length} samples, ${processedData.features[0].length} features`);

          // Load ONNX models for K-means and KNN
          const kmeansModel = await ort.InferenceSession.create('recommendation-engine/Model/kmeans_model.onnx');
          const knnModel = await ort.InferenceSession.create('recommendation-engine/Model/knn_model.onnx');

          // Prepare inputs for ONNX models
          const kmeansInputs = new ort.Tensor('float32', processedData.features, [processedData.features.length, processedData.features[0].length]);
          const knnInputs = new ort.Tensor('float32', processedData.features, [processedData.features.length, processedData.features[0].length]);

          // Run the K-means and KNN models
          const kmeansResult = await kmeansModel.run({ input: kmeansInputs });
          const knnResult = await knnModel.run({ input: knnInputs });

          // Process recommendation results
          const kmeansRecommendations = kmeansResult.output.data;
          const knnRecommendations = knnResult.output.data;

          // Log the recommendations and return them
          logger.info('Recommendations generated successfully.');
          res.json({
            kmeansRecommendations,
            knnRecommendations,
          });

        } catch (modelError) {
          logger.error(`Error running ONNX models: ${modelError.message}`);
          return res.status(500).send('Error running recommendation models.');
        }
      });

      pyshell.on('error', (pythonError) => {
        logger.error(`Error in Python script execution: ${pythonError.message}`);
        return res.status(500).send('Error processing data in the Python script.');
      });

      pyshell.on('close', (code) => {
        if (code !== 0) {
          logger.error(`Python script failed with exit code ${code}`);
          return res.status(500).send('Error processing data in the Python script.');
        }
        logger.info('Python script finished successfully.');
      });

    } catch (error) {
      logger.error(`Error processing the request: ${error.message}`);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
