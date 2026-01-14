
import re

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as f:
        content = f.read()
    
    # Try to decode with various encodings or just ignore errors
    text = content.decode('latin-1', errors='ignore')
    
    # Filter for readable text using regex (common characters)
    # This is a heuristic to finding text appearing in PDF streams
    # PDF text is often in () or [] or BT ... ET blocks
    # But stripped of formatting commands, we might see chunks
    
    # Very naive extraction of contiguous printable strings
    strings = re.findall(r"[A-Za-z0-9\s\.\,\:\-\(\)\@\/]{4,}", text)
    
    for s in strings:
        print(s)

if __name__ == "__main__":
    extract_text_from_pdf('static/Resume.pdf')
