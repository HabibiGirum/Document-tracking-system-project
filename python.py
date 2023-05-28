import cv2
import pytesseract
import re
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'})

    file = request.files['image']
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Resize the image
    image = cv2.resize(image, None, fx=2, fy=2)  # Adjust the scaling factor as needed

    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply image filters
    filtered_image = cv2.medianBlur(gray, 3)

    extracted_text = pytesseract.image_to_string(filtered_image)

    return jsonify({'text': extracted_text})

if __name__ == '__main__':
    app.run()
