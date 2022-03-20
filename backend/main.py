from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from starlette.responses import FileResponse

app = FastAPI()

origin = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origin,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*'],
)

def fichier(question1, reponse1,question2, reponse2,question3, reponse3) :
    f = """
-------------

1. ### {}
    _{}_
2. ### {}
    _{}_
3. ### {}
    _{}_ 

-------------
    """.format(question1, reponse1,question2, reponse2,question3, reponse3)
    return f

def save_to_text(content, filename):
    fileName = '../frontend/src/saves/{}.md'.format(filename)
    with open(fileName, 'w') as f:
        for c in content:
            f.write(c)
    return fileName

    
@app.post("/submit")
async def open_fichier(fichier: UploadFile =File(...)):
    content = await fichier.read()
    # print(content)
    return content
    
@app.post("/submitForm")
async def handleForm(
    question1: str = Form(...), 
    reponse1: str = Form(...),
    question2: str = Form(...),
    reponse2: str = Form(...),
    question3: str = Form(...),
    reponse3: str = Form(...),
    nomFichier: str = Form(...)
    ):
    
    formulaire = fichier(question1, reponse1,question2, reponse2,question3, reponse3)
    filepath = save_to_text(formulaire, nomFichier)
    
    return FileResponse(filepath, media_type='text/plain', filename='{}.md'.format(nomFichier))
    

