from flask import flaskapp = Flask(__name__)

print __name__
@app.route('/')
def index():
    return "hello world"

app.run(debug=True)