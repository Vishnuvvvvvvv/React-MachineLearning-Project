from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pickle
from sklearn.metrics.pairwise import cosine_similarity
from pydantic import BaseModel

# Create a Pydantic model for the request payload
class MovieRecommendationRequest(BaseModel):
    name: str

# Load the serialized model and data
new = pickle.load(open('movies.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))

# Create an instance of FastAPI
app = FastAPI()

#To prevent  CORS error


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
# Define API route and function
@app.get('/home')
def index():
    
    return {'message':'helloo'}  
  
@app.post('/recommend')
def movie_recommendation(request: MovieRecommendationRequest):
    name = request.name
    print("name:",name)
    emp =[]
    lis = []
    index = new[new['original_title'] == name].index[0]
    names = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    for element in names[1:9]:
        lis.append(new.iloc[element[0]].original_title)
    return {'recommendations':lis}
    


# Run the FastAPI server
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8001)



