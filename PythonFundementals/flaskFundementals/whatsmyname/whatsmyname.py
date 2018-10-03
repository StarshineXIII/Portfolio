from flask import Flask, render_template, request, redirect

app = Flask(__name__, template_folder='../templates/T_whatsmyname')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def create_user():
    name = request.form['name']
    print name
    return render_template('index.html', name='name')

app.run(debug=True)
