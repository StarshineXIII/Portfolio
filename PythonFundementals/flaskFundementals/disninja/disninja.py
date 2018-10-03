from flask import Flask, session, render_template, request, redirect

app = Flask(__name__, template_folder='../templates/T_disninja')
app.secret_key = "nuggets"

ninjas = {
    'blue' : 'S_disninja/leonardo.jpg',
    'red' : 'S_disninja/raphael.jpg',
    'orange' : 'S_disninja/michelangelo.jpg',
    'purple' : 'S_disninja/donatello.jpg',
    'notapril' : 'S_disninja/notapril.jpg',
    'tmnt' : 'S_disninja/tmnt.png'
}

@app.route('/')
def nindex():
    session['img'] = ninjas['tmnt']
    return render_template('nindex.html')

@app.route('/ninja/<ninja>')
def ninja(ninja):
    if ninja == 'blue':
        session['img'] = ninjas[ninja]
    elif ninja == 'red':
        session['img'] = ninjas[ninja]
    elif ninja == 'orange':
        session['img'] = ninjas[ninja]
    elif ninja == 'purple':
        session['img'] = ninjas[ninja]
    else:
        session['img'] = ninjas['notapril']
    return render_template('nindex.html')


app.run(debug=True)