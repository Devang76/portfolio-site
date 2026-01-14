
import re
import sys

def extract_text_from_pdf_safe(pdf_path):
    try:
        with open(pdf_path, 'rb') as f:
            content = f.read()
        
        # Decode binary as latin-1 to avoid errors, then finding string patterns
        # Identify text blocks between () or just long alphanumeric sequences
        text_content = content.decode('latin-1', errors='ignore')
        
        # Simple extraction of long strings which might represent sentences
        # This regex looks for sequences of 5 or more printable characters
        # It's a heuristic for uncompressed text or just metadata keys
        strings = re.findall(r"[\w\d\s\.,:;\-\(\)%]{5,}", text_content)
        
        for s in strings:
            # clean up
            clean_s = s.strip()
            if len(clean_s) > 10:
                # Print using sys.stdout.buffer to avoid encoding issues
                try:
                    print(clean_s)
                except:
                    pass
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_text_from_pdf_safe('static/Resume.pdf')
