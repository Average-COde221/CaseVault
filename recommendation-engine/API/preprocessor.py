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
import sys

nltk.download('wordnet')
nltk.download('punkt')

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

lemmatizer = WordNetLemmatizer()

def clean_text(text):
    try:
        if not isinstance(text, str):
            logging.warning("Received non-string input for text cleaning.")
            return ""
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'[^\w\s]', '', text)
        return text.lower()
    except Exception as e:
        logging.error(f"Error in clean_text: {e}")
        return ""

def lemmatize_text(text):
    try:
        tokens = word_tokenize(text)
        lemmatized_tokens = [lemmatizer.lemmatize(token) for token in tokens]
        return " ".join(lemmatized_tokens)
    except Exception as e:
        logging.error(f"Error in lemmatize_text: {e}")
        return text

def remove_unwanted_content(text):
    try:
        logging.info("Removing unwanted content from text.")
        text = re.sub(r'Generated PDF', '', text, flags=re.IGNORECASE)
        text = re.sub(r'case_id:\s*\S+', '', text, flags=re.IGNORECASE)
        text = re.sub(r'case_no:\s*\S+', '', text, flags=re.IGNORECASE)
        return text.strip()
    except Exception as e:
        logging.error(f"Error in remove_unwanted_content: {e}")
        return text

def extract_text_from_pdf(pdf_path):
    try:
        logging.info(f"Extracting text from PDF: {pdf_path}")
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        text = remove_unwanted_content(text)
        return clean_text(text)
    except Exception as e:
        logging.error(f"Error in extract_text_from_pdf: {e}")
        return ""

def process_json_data(json_data):
    try:
        logging.info("Processing JSON data.")
        return pd.DataFrame([json_data])  
    except Exception as e:
        logging.error(f"Error in process_json_data: {e}")
        return pd.DataFrame()

def load_data(input_source, source_type):
    try:
        logging.info(f"Loading data from {input_source} of type {source_type}")
        if source_type == "pdf":
            text = extract_text_from_pdf(input_source)
            return pd.DataFrame({"text": [text]})
        elif source_type == "json":
            with open(input_source, 'r') as file:
                json_data = json.load(file)
            return process_json_data(json_data)
        elif source_type == "csv":
            return pd.read_csv(input_source)
        else:
            raise ValueError("Unsupported source type. Use 'pdf', 'json', or 'csv'.")
    except Exception as e:
        logging.error(f"Error in load_data: {e}")
        return pd.DataFrame()

def preprocess_data(df, content_type=None):
    try:
        logging.info(f"Starting data preprocessing for content type: {content_type}.")
        
        if "facts" in df.columns:
            df['facts'] = df['facts'].apply(clean_text).apply(lemmatize_text)
        if "title" in df.columns:
            df['title'] = df['title'].apply(clean_text).apply(lemmatize_text)

        if content_type == "pdf":
            logging.info("Additional processing for PDF data.")
        elif content_type == "json":
            logging.info("Additional processing for JSON data.")
        
        logging.info("Preprocessing completed successfully.")
        return df
    except Exception as e:
        logging.error(f"Error in preprocess_data: {e}")
        return None

def main(input_source, source_type):
    try:
        if source_type not in ["pdf", "csv", "json"]:
            logging.error(f"Invalid content type: {source_type}. Supported types are 'pdf', 'csv', and 'json'.")
            return None
        
        logging.info(f"Starting main pipeline with input source: {input_source} and source type: {source_type}.")
        
        df = load_data(input_source, source_type)
        if df.empty:
            logging.warning("No data loaded from the provided source. Terminating process.")
            return None
        
        preprocessed_df = preprocess_data(df)
        
        if preprocessed_df is None or preprocessed_df.empty:
            logging.warning("Preprocessing returned no data. Terminating process.")
            return None

        logging.info("Preprocessing complete. Data is ready for further steps.")
        return preprocessed_df
    
    except Exception as e:
        logging.critical(f"Critical error in main pipeline: {e}")
        return None


if __name__ == "__main__":
    if len(sys.argv) < 2:
        logging.error("No input source provided. Please specify the input file path.")
        sys.exit(1)

    input_source = sys.argv[1]

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

        preprocessed_data = main(input_source, source_type)

        if preprocessed_data is not None:
            logging.info("Preprocessed data returned successfully.")
            
        else:
            logging.error("Preprocessing failed. No data returned.")

    except Exception as e:
        logging.critical(f"Error in file type detection: {e}")
        sys.exit(1)
