<div align="center">

# 🌾 Agriculture Assistant SLM

### AI-Powered Agriculture Assistant using Qwen2.5-3B with LoRA Fine-Tuning

An intelligent agriculture-focused chatbot built with **FastAPI**, **React**, **Ollama**, and **Qwen2.5-3B**, designed to provide accurate, domain-specific agricultural guidance through efficient Small Language Model (SLM) fine-tuning.

<img width="991" height="519" alt="Screenshot (48)" src="https://github.com/user-attachments/assets/fbe31ecb-24f2-4424-94d4-50b5b1cfde67" />


</div>

---

# 📖 About The Project

Agriculture Assistant SLM is a domain-specific AI chatbot developed to provide accurate, context-aware responses to agriculture-related queries. The application leverages the **Qwen2.5-3B Small Language Model**, fine-tuned using **LoRA (Low-Rank Adaptation)**, enabling efficient customization while minimizing computational resources.

Unlike general-purpose AI assistants, this system is designed exclusively for agriculture, ensuring reliable recommendations related to crop selection, soil analysis, irrigation, fertilizers, pest management, and farming practices.

The model runs locally using **Ollama**, making the solution privacy-focused, cost-effective, and independent of cloud-based API services.

---

# ✨ Features

- 🌱 Domain-specific Agriculture AI Assistant
- 🤖 Fine-Tuned Qwen2.5-3B Small Language Model
- 🧠 LoRA (Low-Rank Adaptation) Fine-Tuning
- ⚡ FastAPI REST Backend
- 💻 Modern React Frontend
- 🌍 Multi-language Support
- 🎙 Voice Input
- 🌙 Dark Mode Interface
- 🔒 Agriculture Domain Validation
- 🚫 Rejects Non-Agriculture Queries
- 🏠 Local Inference using Ollama
- 💰 Zero Cloud API Cost

---

# 🏗️ System Architecture

```text
                User
                  │
                  ▼
         React Frontend
                  │
          HTTP POST Request
                  │
                  ▼
          FastAPI Backend
                  │
    Agriculture Query Validation
                  │
        Language Detection
                  │
      Prompt Engineering
                  │
                  ▼
            Ollama Server
                  │
                  ▼
     Qwen2.5-3B + LoRA Adapter
                  │
                  ▼
         AI Generated Response
                  │
                  ▼
             React Frontend
```

---

# ⚙️ Workflow

1. User submits an agriculture-related query.
2. React frontend sends the request to the FastAPI backend.
3. Backend validates whether the query belongs to the agriculture domain.
4. Language detection is performed.
5. A structured system prompt is generated.
6. The request is forwarded to Ollama.
7. Ollama loads the fine-tuned Qwen2.5-3B model with the LoRA adapter.
8. The model generates a context-aware response.
9. FastAPI returns the response as JSON.
10. The frontend displays the generated answer.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- HTML5
- CSS3
- JavaScript

## Backend

- FastAPI
- Python
- Uvicorn

## AI Technologies

- Qwen2.5-3B
- LoRA Fine-Tuning
- Ollama
- Unsloth

## Dataset & Training

- Crop Recommendation Dataset
- JSON Instruction Dataset
- Pandas
- Google Colab
- Tesla T4 GPU

---

# 📂 Project Structure

```bash
Agriculture-Assistant-SLM/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── dataset/
│
├── lora_adapter/
│
├── screenshots/
│
└── README.md
```

---

# 🧠 AI Model

| Model | Qwen2.5-3B-Instruct |
|--------|---------------------|
| Fine-Tuning | LoRA |
| Training Environment | Google Colab |
| GPU | Tesla T4 |
| Inference | Ollama |

---

# 📊 Dataset

The model was fine-tuned using an agriculture crop recommendation dataset containing over **2200 records**.

### Features

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature
- Humidity
- Soil pH
- Rainfall
- Crop Label

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Aruna45-star/Agriculture-Assistant-SLM.git

cd Agriculture-Assistant-SLM
```

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app:app --reload
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

## Start Ollama

```bash
ollama serve
```

Load the fine-tuned model and start interacting with the Agriculture Assistant.

---

# 💬 Sample Queries

### Supported

- Recommend a crop for black soil.
- How to cultivate rice?
- Which fertilizer is suitable for cotton?
- Suggest a crop using NPK values.

### Unsupported

- Who is Virat Kohli?
- What is the capital of France?

The assistant politely rejects questions outside the agriculture domain.

---

---

# 🚀 Future Enhancements

- 🌿 Plant Disease Detection
- 📷 Image-Based Crop Diagnosis
- 🌦 Weather API Integration
- 💊 Fertilizer Recommendation System
- 📍 GPS-Based Farming Assistance
- 📱 Mobile Application
- 🌐 Additional Regional Languages
- ☁ Cloud Deployment

---

# 🤝 Contributing

Contributions are always welcome.

If you have suggestions for improving the project, feel free to fork the repository, create a feature branch, and submit a pull request.

---

# 📜 License

This project is intended for educational, research, and learning purposes.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star.

**Building AI solutions that empower smarter agriculture through Small Language Models.**

</div>
