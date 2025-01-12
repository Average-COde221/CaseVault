#######################
# Python Unit Tests  #
#######################

import pytest
import pandas as pd
import numpy as np
from unittest.mock import patch, MagicMock
from  preprocessor import (  
    clean_text,
    lemmatize_text,
    extract_text_from_pdf,
    process_json_data,
    load_data,
    preprocess_data
)

@pytest.mark.parametrize("input_text, expected_output", [
    ("Hello, World!", "hello world"),
    ("123  Test!", "123 test"),
    (None, "")
])
def test_clean_text(input_text, expected_output):
    assert clean_text(input_text) == expected_output

@pytest.mark.parametrize("input_text, expected_output", [
    ("running walked", "running walked"),  
    ("", ""),
    (None, "")
])
def test_lemmatize_text(input_text, expected_output):
    assert lemmatize_text(input_text) == expected_output

@patch("your_preprocessor_script.PdfReader")
def test_extract_text_from_pdf(mock_pdf_reader):
    mock_pdf_reader.return_value.pages = [MagicMock(extract_text=lambda: "Sample PDF text.")]
    output = extract_text_from_pdf("sample.pdf")
    assert output == "sample pdf text"

@patch("builtins.open", new_callable=MagicMock)
def test_process_json_data(mock_open):
    mock_open.return_value.read.return_value = '{"key": "value"}'
    output = process_json_data({"key": "value"})
    assert isinstance(output, pd.DataFrame)
    assert not output.empty

@patch("pandas.read_csv")
def test_load_data_csv(mock_read_csv):
    mock_read_csv.return_value = pd.DataFrame({"col1": [1, 2], "col2": [3, 4]})
    df = load_data("sample.csv", "csv")
    assert not df.empty
    assert "col1" in df.columns


