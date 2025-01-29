from flask import Flask, render_template, request
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)

# Diabetes Model
diabetes_dataset = pd.read_csv('diabetes.csv')
X_diabetes = diabetes_dataset.drop(columns='Outcome', axis=1)
Y_diabetes = diabetes_dataset['Outcome']

scaler_diabetes = StandardScaler()
X_diabetes = scaler_diabetes.fit_transform(X_diabetes)

X_train_diabetes, X_test_diabetes, Y_train_diabetes, Y_test_diabetes = train_test_split(
    X_diabetes, Y_diabetes, test_size=0.2, stratify=Y_diabetes, random_state=2
)

classifier_diabetes = svm.SVC(kernel='linear')
classifier_diabetes.fit(X_train_diabetes, Y_train_diabetes)

# Heart Disease Model
heart_data = pd.read_csv('heart_dataset.csv')
X_heart = heart_data.drop(columns='target', axis=1)
Y_heart = heart_data['target']

X_train_heart, X_test_heart, Y_train_heart, Y_test_heart = train_test_split(
    X_heart, Y_heart, test_size=0.2, stratify=Y_heart, random_state=2
)

model_heart = LogisticRegression()
model_heart.fit(X_train_heart, Y_train_heart)

# Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/diabetes')
def diabetes_page():
    return render_template('diabetes.html')

@app.route('/heart')
def heart_page():
    return render_template('heart.html')

@app.route('/predict_diabetes', methods=['POST'])
def predict_diabetes():
    try:
    
        input_data = [
            float(request.form['pregnancies']),
            float(request.form['glucose']),
            float(request.form['blood_pressure']),
            float(request.form['skin_thickness']),
            float(request.form['insulin']),
            float(request.form['bmi']),
            float(request.form['diabetes_pedigree_function']),
            float(request.form['age']),
        ]
    
        input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)
        std_data = scaler_diabetes.transform(input_data_as_numpy_array)
        prediction = classifier_diabetes.predict(std_data)
        
    
        result = "The person is diabetic." if prediction[0] == 1 else "The person is not diabetic."
    
    except ValueError as e:
    
        result = f"Invalid input data: {e}"
    except Exception as e:
    
        result = f"Error in processing: {e}"
    
    
    return render_template('diabetes.html', prediction_text=result)

@app.route('/predict_heart', methods=['POST'])
def predict_heart():
    try:
    
        input_data = [
            float(request.form['age']),
            int(request.form['sex']),
            int(request.form['cp']),
            float(request.form['trestbps']),
            float(request.form['chol']),
            int(request.form['fbs']),
            int(request.form['restecg']),
            float(request.form['thalach']),
            int(request.form['exang']),
            float(request.form['oldpeak']),
            int(request.form['slope']),
            int(request.form['ca']),
            int(request.form['thal']),
        ]
    
        input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)
        
        prediction = model_heart.predict(input_data_as_numpy_array)
        
        result = "The person has heart disease." if prediction[0] == 1 else "The person does not have heart disease."
    
    except ValueError as e:
    
        result = f"Invalid input data: {e}"
    except Exception as e:
    
        result = f"Error in processing: {e}"
    

    return render_template('heart.html', prediction_text=result)

if __name__ == '__main__':
    app.run(debug=True)
