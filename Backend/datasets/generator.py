import pandas as pd
import numpy as np
from faker import Faker
import os

fake = Faker()


num_transporters = 1000


weights = {
    'cost': 0.25,        
    'vehicle_type': 0.20,
    'rating': 0.15,
    'distance': 0.10,
    'availability': 0.30,
    'delivery_time': 0.07,
    'capacity': 0.20     
}


data = {
    'transporter_id': [fake.uuid4() for _ in range(num_transporters)],
    'vehicle_type': np.random.choice(['Truck', 'Van', 'Bike'], num_transporters),
    'cost_per_km': np.random.randint(50, 200, num_transporters),
    'rating': np.random.uniform(3, 5, num_transporters),
    'distance': np.random.randint(10, 100, num_transporters),
    'availability': np.random.choice([1, 0], num_transporters),
    'delivery_time': np.random.randint(1, 6, num_transporters),
    'capacity': np.random.randint(50, 500, num_transporters),  # Transporter capacity (tons)
}


df = pd.DataFrame(data)

# Normalize numerical features
df['cost_per_km_norm'] = (df['cost_per_km'] - df['cost_per_km'].min()) / (df['cost_per_km'].max() - df['cost_per_km'].min())
df['rating_norm'] = (df['rating'] - df['rating'].min()) / (df['rating'].max() - df['rating'].min())
df['distance_norm'] = (df['distance'] - df['distance'].min()) / (df['distance'].max() - df['distance'].min())
df['delivery_time_norm'] = (df['delivery_time'] - df['delivery_time'].min()) / (df['delivery_time'].max() - df['delivery_time'].min())
df['capacity_norm'] = (df['capacity'] - df['capacity'].min()) / (df['capacity'].max() - df['capacity'].min())


df['vehicle_type_num'] = df['vehicle_type'].map({'Truck': 2, 'Van': 1, 'Bike': 0})






df['score'] = (
    df['cost_per_km_norm'] * weights['cost'] +
    df['vehicle_type_num'] * weights['vehicle_type'] +
    df['rating_norm'] * weights['rating'] +
    df['distance_norm'] * weights['distance'] +
    df['availability'] * weights['availability'] +
    df['delivery_time_norm'] * weights['delivery_time'] +
    df['capacity_norm'] * weights['capacity']  # Higher capacity gives higher priority
)
file_path=r"C:\Users\Asus\Desktop\Transporter.csv"
df.to_csv(file_path, mode='a', index=False, header=not os.path.exists(file_path))
print(f"Data appended successfully to {file_path}")



