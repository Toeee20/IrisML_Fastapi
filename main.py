from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import os

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "model.pkl"

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        "File model.pkl tidak ditemukan. Jalankan 'generate_model.py' terlebih dahulu untuk membuat model."
    )

model = joblib.load(MODEL_PATH)

class IrisInput(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float

class PredictionOut(BaseModel):
    class_label: int

@app.post("/predict", response_model=PredictionOut)
def predict(input: IrisInput):
    X_new = np.array([[
        input.sepal_length,
        input.sepal_width,
        input.petal_length,
        input.petal_width
    ]])
    pred = model.predict(X_new)[0]
    return {"class_label": int(pred)}
