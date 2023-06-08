from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pickle
import uvicorn
import pandas as pd
from pydantic import BaseModel

# Create a Pydantic model for the request payload
class movieInput(BaseModel):
    latest_dir:str
    writer:str
    editor:str
    main_lead:str
    co_lead1:str
    prd_cmpny1:str
    prd_cmpny2:str
    genre:str
    
# Load the serialized model and data
merged = pickle.load(open('FwinrMerged.pkl', 'rb'))
randomforest_model= pickle.load(open('FwinrRfmodel.pkl', 'rb'))



#we'll manage second table for exporting director:
top1 = merged.groupby('DirectorName')['recovery_rate'].max().loc[lambda x: x >= 1300]
top1dir = top1.index.tolist()
top2 = merged.groupby('DirectorName')['recovery_rate'].max().loc[(merged.groupby('DirectorName')['recovery_rate'].max() >= 900) & (merged.groupby('DirectorName')['recovery_rate'].max() < 1300)]
top2dir = top2.index.tolist()
top3 = merged.groupby('DirectorName')['recovery_rate'].max().loc[(merged.groupby('DirectorName')['recovery_rate'].max() >= 500) & (merged.groupby('DirectorName')['recovery_rate'].max() < 900)]
top3dir = top3.index.tolist()
top4 = merged.groupby('DirectorName')['recovery_rate'].max().loc[(merged.groupby('DirectorName')['recovery_rate'].max() >= 250) & (merged.groupby('DirectorName')['recovery_rate'].max() < 500)]
top4dir = top4.index.tolist()
top5 = merged.groupby('DirectorName')['recovery_rate'].max().loc[(merged.groupby('DirectorName')['recovery_rate'].max() >= 130) & (merged.groupby('DirectorName')['recovery_rate'].max() < 250)]
top5dir = top5.index.tolist()
other  = merged.groupby('DirectorName')['recovery_rate'].max().loc[lambda x:x<130]
otherdir =other.index.tolist()
checker = 0
def convertDir(row):
    if row == 'newdirector':
        return 2
    elif row == 'newdirector':
        return 0
    elif row in top1dir:
        return 6
    elif row in top2dir:
        return 5
    elif row in top3dir:
        return 4
    elif row in top4dir:
        return 3
    elif row in top5dir:
        return 2
   # elif row in other:
   #     return 1
    else:
        return 0

merged['latestDir'] = merged['DirectorName'].apply(convertDir)

#writer
#writer

merged = merged[merged['WriterName']!='']


top1w = merged.groupby('WriterName')['recovery_rate'].max().loc[lambda x: x >= 1300]

top1w = top1w.index.tolist()

top2w = merged.groupby('WriterName')['recovery_rate'].max().loc[(merged.groupby('WriterName')['recovery_rate'].max() >= 900) & (merged.groupby('WriterName')['recovery_rate'].max() < 1300)]
top2w = top2w.index.tolist()

top3w = merged.groupby('WriterName')['recovery_rate'].max().loc[(merged.groupby('WriterName')['recovery_rate'].max() >= 500) & (merged.groupby('WriterName')['recovery_rate'].max() < 900)]
top3w = top3w.index.tolist()
top4w = merged.groupby('WriterName')['recovery_rate'].max().loc[(merged.groupby('WriterName')['recovery_rate'].max() >= 250) & (merged.groupby('WriterName')['recovery_rate'].max() < 500)]
top4w = top4w.index.tolist()
top5w = merged.groupby('WriterName')['recovery_rate'].max().loc[(merged.groupby('WriterName')['recovery_rate'].max() >= 130) & (merged.groupby('WriterName')['recovery_rate'].max() < 250)]
top5w = top5w.index.tolist()
otherw  = merged.groupby('WriterName')['recovery_rate'].max().loc[lambda x:x<130]
otherw =otherw.index.tolist()




def convertWritr(row):
    #if row == 'newwriter':
    #    return 2
    if row in top1w:
        return 6
    elif row in top2w:
        return 5
    elif row in top3w:
        return 4
    elif row in top4w:
        return 3
    elif row in top5w:
        return 2
    #elif row in otherw:
    #    return 1
    else:
        return 0
    
    

merged['grp_writer'] = merged['WriterName'].apply(convertWritr)

#Editor
#Editor


top1E = merged.groupby('EditorName')['recovery_rate'].max().loc[lambda x: x >= 1300]
top1E = top1E.index.tolist()
top2E = merged.groupby('EditorName')['recovery_rate'].max().loc[(merged.groupby('EditorName')['recovery_rate'].max() >= 900) & (merged.groupby('EditorName')['recovery_rate'].max() < 1300)]
top2E = top2E.index.tolist()
top3E = merged.groupby('EditorName')['recovery_rate'].max().loc[(merged.groupby('EditorName')['recovery_rate'].max() >= 500) & (merged.groupby('EditorName')['recovery_rate'].max() < 900)]
top3E = top3E.index.tolist()
top4E = merged.groupby('EditorName')['recovery_rate'].max().loc[(merged.groupby('EditorName')['recovery_rate'].max() >= 250) & (merged.groupby('EditorName')['recovery_rate'].max() < 500)]
top4E = top4E.index.tolist()
top5E = merged.groupby('EditorName')['recovery_rate'].max().loc[(merged.groupby('EditorName')['recovery_rate'].max() >= 110) & (merged.groupby('EditorName')['recovery_rate'].max() < 250)]
top5E = top5E.index.tolist()
otherE  = merged.groupby('EditorName')['recovery_rate'].max().loc[lambda x:x<110]
otherE =otherE.index.tolist()
def convertEdtr(row):
    if row=='':
        return 0
    elif row in top1E:
        return 6
    elif row in top2E:
        return 5
    elif row in top3E:
        return 4
    elif row in top4E:
        return 3
    #elif row in top5E:
    #    return 2
   # elif row in otherE:
   #     return 1
    else:
        return 0

merged['grp_Editor'] = merged['EditorName'].apply(convertEdtr)

#producer
#Producer

top1p  =merged.groupby('proCm1')['recovery_rate'].max().loc[lambda x: x >= 1300]
top1p = top1p.index.tolist()
top2p = merged.groupby('proCm1')['recovery_rate'].max().loc[(merged.groupby('proCm1')['recovery_rate'].max() >= 900) & (merged.groupby('proCm1')['recovery_rate'].max() < 1300)]
top2p = top2p.index.tolist()
top3p = merged.groupby('proCm1')['recovery_rate'].max().loc[(merged.groupby('proCm1')['recovery_rate'].max() >= 500) & (merged.groupby('proCm1')['recovery_rate'].max() < 900)]
top3p = top3p.index.tolist()
top4p = merged.groupby('proCm1')['recovery_rate'].max().loc[(merged.groupby('proCm1')['recovery_rate'].max() >= 250) & (merged.groupby('proCm1')['recovery_rate'].max() < 500)]
top4p = top4p.index.tolist()
top5p = merged.groupby('proCm1')['recovery_rate'].max().loc[(merged.groupby('proCm1')['recovery_rate'].max() >= 200) & (merged.groupby('proCm1')['recovery_rate'].max() < 250)]
top5p = top5p.index.tolist()
otherp  = merged.groupby('proCm1')['recovery_rate'].max().loc[lambda x:x<200]
otherp =otherp.index.tolist()
def convertP1(row):
    if row in top1p:
        return 6
    elif row in top2p:
        return 5
    elif row in top3p:
        return 4
    elif row in top4p:
        return 3
    elif row in top5p:
        return 2
    #elif row in otherp:
    #    return 1
    else:
        return 0
    

merged['grp_proCm1'] = merged['proCm1'].apply(convertP1)
merged['grp_proCm2'] = merged['proCm2'].apply(convertP1)

#Actor
#Actor
#mergedn2[['main_lead','co_lead1','co_lead2','co_lead3']] = mergedn2['Actors'].str.split(',' ,expand=True)
mergedn2 = merged[merged['recovery_rate']!=0]

top1a = mergedn2.groupby('main_lead')['recovery_rate'].max().loc[lambda x: x >= 1300]
top1ac = top1a.index.tolist()
top2a = mergedn2.groupby('main_lead')['recovery_rate'].max().loc[(mergedn2.groupby('main_lead')['recovery_rate'].max() >= 900) & (mergedn2.groupby('main_lead')['recovery_rate'].max() < 1300)]
top2ac = top2a.index.tolist()
top3a = mergedn2.groupby('main_lead')['recovery_rate'].max().loc[(mergedn2.groupby('main_lead')['recovery_rate'].max() >= 500) & (mergedn2.groupby('main_lead')['recovery_rate'].max() < 900)]
top3ac = top3a.index.tolist()
top4a = mergedn2.groupby('main_lead')['recovery_rate'].max().loc[(mergedn2.groupby('main_lead')['recovery_rate'].max() >= 250) & (mergedn2.groupby('main_lead')['recovery_rate'].max() < 500)]
top4ac = top4a.index.tolist()
top5a = mergedn2.groupby('main_lead')['recovery_rate'].max().loc[(mergedn2.groupby('main_lead')['recovery_rate'].max() >= 130) & (mergedn2.groupby('main_lead')['recovery_rate'].max() < 250)]
top5ac = top5a.index.tolist()
othera  = mergedn2.groupby('main_lead')['recovery_rate'].max().loc[lambda x:x<130]
otherac =othera.index.tolist()

def convertMainLead(row):
    if row in top1ac:
        return 6
    elif row in top2ac:
        return 5
    elif row in top3ac:
        return 4
    elif row in top4ac:
        return 3
    elif row in top5ac:
        return 2
    #elif row in otherac:
    #    return 1
    else:
        return 0

merged['2ndgrp_mainLead'] = mergedn2['main_lead'].apply(convertMainLead)
merged['2ndgrp_co_lead1'] = mergedn2['co_lead1'].apply(convertMainLead)


# Create an instance of FastAPI
app = FastAPI()




#To prevent  CORS error


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Define API route and function
@app.get('/home')
def index():
    
    return {'message':'helloo'}  

def prepare_inputt(input:movieInput):
    # Convert director name to integer using convertDir function
    #convertDir,convertMainLead,convertWritr,convertEdtr,
   
    latest_dir_encoded = convertDir(input.latest_dir)

    # Convert writer name to integer using convertWrit function
    grp_writer_encoded = convertWritr(input.writer)

    # Convert editor name to integer using convertEdtr function
    grp_editor_encoded = convertEdtr(input.editor)

    # Convert main lead name to integer using convertMainLead function
    grp_main_lead_encoded = convertMainLead(input.main_lead)

    # Convert co_lead1 name to integer using convertCoLead1 function
    grp_co_lead1_encoded = convertMainLead(input.co_lead1)

    # Convert production company names to integers using getCmpny function
    grp_pro_cm1_encoded = convertP1(input.prd_cmpny1)
    grp_pro_cm2_encoded = convertP1(input.prd_cmpny2)
  
    
    # Create a DataFrame with the input values
    input_data1 = pd.DataFrame({
        #'budget': [budget],
        #'runtime': [runtime],
        #'no:maleCast': [no_male_cast],
        #'release_month': [release_month],
        #'no:Cast': [no_cast],
        #'no:Crew': [no_crew],
        #'no:keywords':[no_of_keyword_encoded],
        'latestDir': [latest_dir_encoded],
        'grp_writer':[grp_writer_encoded],
        'grp_Editor':[grp_editor_encoded],
        'grp_proCm1':[grp_pro_cm1_encoded],
        'grp_proCm2':[grp_pro_cm2_encoded],
        '2ndgrp_mainLead':[grp_main_lead_encoded],
        '2ndgrp_co_lead1':[grp_co_lead1_encoded]
        
       
    })
   

    # Split the genre string into a list of individual genres
    genres = input.genre.split(',')

    # Create genre columns and set their values based on the input genres
    genre_columns = ['Action', 'Adventure',
       'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family',
       'Fantasy', 'Foreign', 'History', 'Horror', 'Music', 'Mystery',
       'Romance', 'Science Fiction', 'Thriller', 'War', 'Western']
    #row
    
    
    genre_values = [1 if genre in genres else 0 for genre in genre_columns]#column
    
    input_data1[genre_columns] = pd.DataFrame([genre_values])
   
    val = randomforest_model.predict(input_data1)[0]
    
    return input_data1

@app.post('/predict')
def moviePredictor(input:movieInput):
    print("input",input)
    
    result = prepare_inputt(input)
    val = int(randomforest_model.predict(result)[0])
    print("res",val)
    
    return {'message':val}  



# Run the FastAPI server
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=7000)

