# pip install spacy==2.3.5

# pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-2.3.1/en_core_web_sm-2.3.1.tar.gz

from pyresparser import ResumeParser
import spacy
from pdfminer.high_level import extract_text
import docx2txt
import nltk
import re
from flask import Flask, jsonify, request
import uuid
from werkzeug.utils import secure_filename
import os


app = Flask(__name__)


nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('maxent_ne_chunker')
nltk.download('words')
spacy.load("en_core_web_sm")

data = ResumeParser('C://Users//dell//Desktop//Achref//cv.pdf').get_extracted_data()

#print(data)
UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS




EMAIL_REG = re.compile(r'[a-z0-9\.\-+_]+@[a-z0-9\.\-+_]+\.[a-z]+')




def extract_text_from_docx(docx_path):
    txt = docx2txt.process(docx_path)
    if txt:
        return txt.replace('\t', ' ')
    return None

def extract_names(txt):
    person_names = []

    for sent in nltk.sent_tokenize(txt):
        for chunk in nltk.ne_chunk(nltk.pos_tag(nltk.word_tokenize(sent))):
            if hasattr(chunk, 'label') and chunk.label() == 'PERSON':
                person_names.append(
                    ' '.join(chunk_leave[0] for chunk_leave in chunk.leaves())
                )

    return person_names


def extract_text_from_pdf(pdf_path):
    return extract_text(pdf_path)

def extract_emails(resume_text):
    return re.findall(EMAIL_REG, resume_text)

@app.route('/upload-cv', methods=["POST"])
def index():
    if 'file' not in request.files:
        return jsonify({"status": 403, "message": "No file part"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"status": 403, "message": "No selected file"})
    if file and allowed_file(file.filename):
        filename = str(uuid.uuid4())+".pdf"
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        user = {}
        text = extract_text_from_pdf('./uploads/'+filename)
        names = extract_names(text)
        emails = extract_emails(text)
        if emails:
            user["emails"] = emails
            user["name"] = "Achref othmani"
            user["skills"] = data["skills"]
        return jsonify(user)


if __name__ == '__main__':
    app.run(debug=True)
    

    print(user)

