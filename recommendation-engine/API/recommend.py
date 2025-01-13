from flask import Flask, request, jsonify
import onnxruntime as ort
import numpy as np
from preprocessor import preprocess_data  
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

try:
    kmeans_session = ort.InferenceSession('kmeans.onnx')
    knn_session = ort.InferenceSession('knn.onnx')
    logging.info("ONNX models loaded successfully.")
except Exception as e:
    logging.error(f"Error loading ONNX models: {e}")
    raise

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        content_type = request.content_type

        if content_type == 'application/json':
            input_data = request.json
        elif content_type == 'text/csv':
            input_data = request.data.decode('utf-8')
        elif content_type == 'application/pdf':
            input_data = request.data  
        else:
            logging.warning("Unsupported content type")
            return jsonify({"error": "Unsupported content type"}), 400

        try:
            preprocessed_data = preprocess_data(input_data, content_type=content_type)
            if not isinstance(preprocessed_data, np.ndarray):
                logging.error("Preprocessing returned invalid format")
                return jsonify({"error": "Preprocessing failed, invalid data format"}), 400
        except Exception as e:
            logging.error(f"Error during preprocessing: {e}")
            return jsonify({"error": "Preprocessing error", "details": str(e)}), 500

        preprocessed_data = preprocessed_data.astype(np.float32)
        if preprocessed_data.ndim == 1:
            preprocessed_data = np.expand_dims(preprocessed_data, axis=0)

        try:
            kmeans_input = {kmeans_session.get_inputs()[0].name: preprocessed_data}
            kmeans_output = kmeans_session.run(None, kmeans_input)
            cluster_id = np.argmax(kmeans_output[0], axis=1)[0]
        except Exception as e:
            logging.error(f"Error during KMeans inference: {e}")
            return jsonify({"error": "KMeans model inference error", "details": str(e)}), 500

        try:
            knn_input = {knn_session.get_inputs()[0].name: np.array([[cluster_id]], dtype=np.float32)}
            knn_output = knn_session.run(None, knn_input)
            recommendations = knn_output[0].tolist()
        except Exception as e:
            logging.error(f"Error during KNN inference: {e}")
            return jsonify({"error": "KNN model inference error", "details": str(e)}), 500

        return jsonify({"cluster_id": int(cluster_id), "recommendations": recommendations})

    except Exception as e:
        logging.error(f"Unhandled error: {e}")
        return jsonify({"error": "An unexpected error occurred", "details": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
