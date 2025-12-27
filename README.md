# IrisML_Fastapi
Iris Machine Learning Web App (FastAPI)   A simple end-to-end Machine Learning web application using Scikit-learn, FastAPI, and vanilla JavaScript.   This project demonstrates training a model locally, serving it via API, and consuming it from a web frontend.  

## Project Structure

* backend/

  * main.py           : FastAPI backend (API)
  * generate_model.py : Script to generate `model.pkl`
  * model.pkl         : Trained model file (auto-generated)
  * requirements.txt  : Python dependencies
* frontend/

  * index.html        : Frontend web page
  * script.js         : Frontend JavaScript logic

## How to Run (in VS Code / terminal)

### 1. Generate the machine learning model (REQUIRED!)

cd backend
python generate_model.py

The 'model.pkl` file will be created.

### 2. Run the backend (API)

pip install -r requirements.txt
uvicorn main:app --reload

The backend will run at 'http://localhost:8000`

### 3. Run the frontend

Open 'frontend/index.html` in a browser (double-click the file, or use Live Server in VS Code).

### 4. Try Iris prediction

Fill in the form on the web page, click Predict.
The prediction result (Setosa / Versicolor / Virginica) will appear below the form.
