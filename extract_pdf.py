import pymupdf
import os

pdf_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Website Transformation & Architecture Prompt.pdf")
doc = pymupdf.open(pdf_path)
text = ""
for page in doc:
    text += page.get_text()

output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pdf_content.txt")
with open(output_path, "w", encoding="utf-8") as f:
    f.write(text)

print("PDF extracted successfully. Length:", len(text))
print("Output saved to:", output_path)
