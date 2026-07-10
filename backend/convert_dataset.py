import pandas as pd
import json

# Read CSV
df = pd.read_csv("../data/Crop_recommendation.csv")

dataset = []

for _, row in df.iterrows():
    dataset.append({
        "instruction": "Recommend a crop based on soil and weather conditions.",
        "input": f"N={row['N']}, P={row['P']}, K={row['K']}, Temperature={row['temperature']}, Humidity={row['humidity']}, pH={row['ph']}, Rainfall={row['rainfall']}",
        "output": row["label"]
    })

# Save JSON
with open("../data/agriculture_dataset.json", "w") as f:
    json.dump(dataset, f, indent=4)

print("✅ Dataset converted successfully!")