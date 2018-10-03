from flask import Flask, render_template, session, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('rps.html')



app.run(debug=True)
