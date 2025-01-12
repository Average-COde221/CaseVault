import os
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from datetime import datetime
import re
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from PyPDF2 import PdfReader
import json
import logging

nltk.download('wordnet')
nltk.download('punkt')

# Set up logging configuration
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Initialization
lemmatizer = WordNetLemmatizer()

# Text cleaning function
def clean_text(text):
    try:
        if not isinstance(text, str):
            logging.warning("Received non-string input for text cleaning.")
            return ""
        text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
        text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
        return text.lower()
    except Exception as e:
        logging.error(f"Error in clean_text: {e}")
        return ""

# Lemmatization
def lemmatize_text(text):
    try:
        tokens = word_tokenize(text)
        lemmatized_tokens = [lemmatizer.lemmatize(token) for token in tokens]
        return " ".join(lemmatized_tokens)
    except Exception as e:
        logging.error(f"Error in lemmatize_text: {e}")
        return text

# Process uploaded PDF
def extract_text_from_pdf(pdf_path):
    try:
        logging.info(f"Extracting text from PDF: {pdf_path}")
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return clean_text(text)
    except Exception as e:
        logging.error(f"Error in extract_text_from_pdf: {e}")
        return ""

# Process JSON data
def process_json_data(json_data):
    try:
        logging.info("Processing JSON data.")
        return pd.DataFrame([json_data])  # Convert JSON object to DataFrame
    except Exception as e:
        logging.error(f"Error in process_json_data: {e}")
        return pd.DataFrame()

# Dynamic input handler
def load_data(input_source, source_type):
    try:
        logging.info(f"Loading data from {input_source} of type {source_type}")
        if source_type == "pdf":
            text = extract_text_from_pdf(input_source)
            return pd.DataFrame({"text": [text]})  # Wrap in DataFrame
        elif source_type == "json":
            with open(input_source, 'r') as file:
                json_data = json.load(file)
            return process_json_data(json_data)  # JSON data to DataFrame
        elif source_type == "csv":
            return pd.read_csv(input_source)  # For backward compatibility with CSV files
        else:
            raise ValueError("Unsupported source type. Use 'pdf', 'json', or 'csv'.")
    except Exception as e:
        logging.error(f"Error in load_data: {e}")
        return pd.DataFrame()

# Feature Engineering
def preprocess_data(df):
    try:
        logging.info("Starting data preprocessing.")
        # Clean textual data
        if "facts" in df.columns:
            df['facts'] = df['facts'].apply(clean_text).apply(lemmatize_text)
        if "title" in df.columns:
            df['title'] = df['title'].apply(clean_text).apply(lemmatize_text)

        # Encode categorical columns
        categorical_cols = [col for col in df.columns if df[col].dtype == 'object' and col not in ['title', 'facts']]
        df = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

        # Reduce dimensionality
        svd = TruncatedSVD(n_components=100)
        reduced_data = svd.fit_transform(df.select_dtypes(include=[np.number]))
        reduced_df = pd.DataFrame(reduced_data, columns=[f'component_{i+1}' for i in range(reduced_data.shape[1])])

        # Handle dates
        if "judgment_date" in df.columns:
            df['judgment_date'] = pd.to_datetime(df['judgment_date'], errors='coerce')
            today = datetime.today()
            df['recency_days'] = (today - df['judgment_date']).dt.days

        # Vectorize text
        if "facts" in df.columns:
            df['combined_text'] = (df['facts'].fillna('') + " " + df.get('title', '').fillna(''))
            tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
            tfidf_matrix = tfidf.fit_transform(df['combined_text'])
            tfidf_df = pd.DataFrame(tfidf_matrix.toarray(), columns=tfidf.get_feature_names_out())
            df = pd.concat([df.reset_index(drop=True), tfidf_df.reset_index(drop=True)], axis=1)

        logging.info("Data preprocessing completed successfully.")
        return df
    except Exception as e:
        logging.error(f"Error in preprocess_data: {e}")
        return df

# Main pipeline
def main(input_source, source_type):
    try:
        logging.info(f"Starting main pipeline with {input_source} and source type {source_type}.")
        # Load data
        df = load_data(input_source, source_type)
        if df.empty:
            logging.warning("No data loaded, terminating process.")
            return

        # Preprocess data
        preprocessed_df = preprocess_data(df)

        # Save preprocessed data
        preprocessed_df.to_csv("preprocessed_data.csv", index=False)
        logging.info("Preprocessing complete. Saved to 'preprocessed_data.csv'.")
    except Exception as e:
        logging.critical(f"Error in main pipeline: {e}")

if __name__ == "__main__":
    # Specify the input file path
    input_source = "path_to_your_file_here"  # Replace with your file path

    # Automatically detect the source type based on the file extension
    try:
        file_extension = os.path.splitext(input_source)[-1].lower()
        if file_extension == ".pdf":
            source_type = "pdf"
        elif file_extension == ".csv":
            source_type = "csv"
        elif file_extension == ".json":
            source_type = "json"
        else:
            raise ValueError(f"Unsupported file extension: {file_extension}. Please use '.pdf', '.csv', or '.json'.")

        # Call the main function with detected source type
        main(input_source, source_type)
    except Exception as e:
        logging.critical(f"Error in file type detection: {e}")
