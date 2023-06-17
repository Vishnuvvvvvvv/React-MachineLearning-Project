from flask import Flask, request, jsonify
from flask_cors import CORS

import pickle
from sklearn.metrics.pairwise import cosine_similarity

# Load the serialized model and data
new = pickle.load(open('movies.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))

# Create an instance of Flask
app = Flask(__name__)
CORS(app)

# Define API routes and functions
@app.route('/home', methods=['GET'])
def index():
    return jsonify({'message': 'helloo'})

@app.route('/recommend', methods=['POST'])
def movie_recommendation():
    name = request.json['name']
    emp = []
    lis = []
    index = new[new['original_title'] == name].index[0]
    names = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    for element in names[1:9]:
        lis.append(new.iloc[element[0]].original_title)
    return jsonify({'recommendations': lis})

# Run the Flask server
if __name__ == '__main__':
    app.run(host='localhost', port=8001)
