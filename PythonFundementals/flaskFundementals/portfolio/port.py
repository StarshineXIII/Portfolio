from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')

def homepage():
    return render_template('PORT.html')

@app.route('/project')
def project():
    return render_template('project.html')

@app.route('/bio')
def bio():
    return render_template('bio.html')

app.run(debug=True)