#Jupyter notebook not working hence done on python script
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import pickle

df=pd.read_csv(r"C:\Users\Asus\Desktop\LSOYS\Backend\datasets\Transporter.csv")

features=['cost_per_km_norm','vehicle_type_num' ,'rating_norm'  ,'distance_norm'  ,'availability','delivery_time_norm','capacity_norm']

target = 'score'

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Mean Absolute Error: {mae:.2f}")
print(f"R² Score: {r2:.2f}")

model_path = r"C:\Users\Asus\Desktop\LSOYS\Backend\Model\model.pkl"


with open(model_path, 'wb') as file:
    pickle.dump(model, file)

print(f"Model saved at: {model_path}")