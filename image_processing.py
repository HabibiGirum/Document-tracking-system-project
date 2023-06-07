import cv2
import pytesseract
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'})

    file = request.files['image']
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Preprocess the image
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    filtered_image = cv2.medianBlur(gray, 3)

    # Perform OCR using pytesseract
    extracted_text = pytesseract.image_to_string(filtered_image)

    return jsonify({'text': extracted_text})

if __name__ == '__main__':
    app.run(port=5001)
