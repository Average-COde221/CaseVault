import os
import json

from fpdf import FPDF
from fpdf.enums import XPos, YPos

font_path = r"D:\dejavu-fonts-ttf-2.37\ttf\DejaVuSans.ttf"
bold_font_path = r"D:\dejavu-fonts-ttf-2.37\ttf\DejaVuSans-Bold.ttf"

if not os.path.exists(font_path) or not os.path.exists(bold_font_path):
    raise FileNotFoundError("Ensure DejaVuSans.ttf and DejaVuSans-Bold.ttf exist at the specified paths.")

jsonl_files = [r"D:\hackathons\CaseVault\recommendation-engine\Data\raw\dev.jsonl", r"D:\hackathons\CaseVault\recommendation-engine\Data\raw\test.jsonl", r"D:\hackathons\CaseVault\recommendation-engine\Data\raw\train.jsonl"]  # Replace with actual paths
combined_output_dir = r"D:\dataset\combined_jsons"
pdf_output_dir = r"D:\dataset\pdfs"

os.makedirs(combined_output_dir, exist_ok=True)
os.makedirs(pdf_output_dir, exist_ok=True)

combined_data = []
for jsonl_file in jsonl_files:
    with open(jsonl_file, "r", encoding="utf-8") as file:
        for line in file:
            combined_data.append(json.loads(line))

print(f"Combined {len(combined_data)} records from {len(jsonl_files)} JSONL files.")

for i, record in enumerate(combined_data, start=1):
    output_json_path = os.path.join(combined_output_dir, f"record_{i}.json")
    with open(output_json_path, "w", encoding="utf-8") as json_file:
        json.dump(record, json_file, indent=4, ensure_ascii=False)

print(f"Saved {len(combined_data)} JSON files to {combined_output_dir}.")

class PDF(FPDF):
    def header(self):
        self.set_font("DejaVu", "B", 12)
        self.cell(0, 10, "Generated PDF", align="C", new_x=XPos.LMARGIN, new_y=YPos.NEXT)

def create_pdf(json_path, pdf_path):
    with open(json_path, "r", encoding="utf-8") as file:
        data = json.load(file)
    
    pdf = PDF()
    pdf.add_font("DejaVu", "", font_path)
    pdf.add_font("DejaVu", "B", bold_font_path)  
    pdf.add_page()
    pdf.set_font("DejaVu", size=12)

    for key, value in data.items():
        if isinstance(value, dict):  
            pdf.cell(0, 10, text=f"{key}:", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            for sub_key, sub_value in value.items():
                pdf.cell(0, 10, text=f"  {sub_key}: {sub_value}", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        else:
            pdf.cell(0, 10, text=f"{key}: {value}", new_x=XPos.LMARGIN, new_y=YPos.NEXT)
    
    pdf.output(pdf_path)
    print(f"Generated PDF: {pdf_path}")


for filename in os.listdir(combined_output_dir):
    if filename.endswith(".json"):
        json_path = os.path.join(combined_output_dir, filename)
        pdf_path = os.path.join(pdf_output_dir, f"{os.path.splitext(filename)[0]}.pdf")
        
        try:
            create_pdf(json_path, pdf_path)
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print("PDF generation completed.")
