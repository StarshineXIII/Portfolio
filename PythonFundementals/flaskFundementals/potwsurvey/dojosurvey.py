from flask import Flask, render_template, redirect, request

app = Flask(__name__, template_folder='../templates/T_dojosurvey')

@app.route('/')

def index():
    return render_template('index.html')

@app.route('/submittedinfo', methods=['POST'])
def submittedinfo():
    
    name = request.form['name']
    loc = request.form['loc']
    lang = request.form['lang']
    comment = request.form['comment']

    return render_template('submittedinfo.html', name=name, loc=loc, lang=lang, comment=comment)

app.run(debug=True)