from flask import Flask, render_template
from whitenoise import WhiteNoise

app = Flask(__name__)
app.wsgi_app = WhiteNoise(app.wsgi_app, root='static/')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/skills.html')
def skills():
    return render_template('skills.html')

@app.route('/experience.html')
def experience():
    return render_template('experience.html')

@app.route('/projects.html')
def projects():
    return render_template('projects.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/activities.html')
def activities():
    return render_template('activities.html')

@app.route('/roadmap.html')
def roadmap():
    return render_template('roadmap.html')

if __name__ == '__main__':
    app.run(debug=True)
