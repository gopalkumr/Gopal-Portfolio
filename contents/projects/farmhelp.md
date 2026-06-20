---
title: Farmhelp
date: 2023-11-01
image: /assets/images/dynamic/farmhelp/logo.png
description: A cross-platform mobile application built with Flutter that leverages optimized neural networks to detect plant diseases.
tags:
  - Flutter
  - Dart
  - Material Design
  - Microsoft Azure
  - Appwrite
  - Flask
  - Neural Networks
---

<post-aside type="info">

This project is a community-service initiative built during my third year at Kalasalingam University for an IoT module and further expanded for the Accenture Hackathon.

</post-aside>

## About the Project

### The Problem
Small-scale farmers often struggle to identify crop and plant diseases early. Misdiagnosing plant illnesses leads to improper pesticide application, reduced crop yields, and substantial financial losses.

### The Solution
**Farmhelp** is a Flutter-based mobile application that helps farmers scan their crops, instantly identify plant diseases using edge computer vision models, and retrieve actionable organic/chemical treatment guidelines.

![Farmhelp Signup](/assets/images/dynamic/farmhelp/signup.png)

### Key Features
- **Instant Leaf Scanning:** Take a photo of a diseased leaf to begin analysis.
- **Offline ML Inference:** Runs a compressed image classification model directly on the device.
- **Actionable Insights:** Provides localized treatment steps and medicine/supplement purchase recommendations.

---

## Technical Architecture

### The AI Model
We trained a Convolutional Neural Network (CNN) model for multi-class plant disease classification. To deploy the model efficiently on mobile hardware:
1. We converted the trained TensorFlow model into the **TensorFlow Lite (TFLite)** format.
2. We applied weights quantization, compressing the model size from **2MB to 200KB** without any noticeable loss in classification accuracy.
3. The model runs locally on the device, allowing farmers to diagnose crop diseases in remote areas without an active internet connection.

### High-Level System Design

![Farmhelp HLD](/assets/images/dynamic/farmhelp/HLD.png)

---

## Getting Started & Local Setup

### Prerequisites

Create a `.env` file inside your `assets/` folder and add the following keys:
```env
FLASK_API_URL="your_flask_api_endpoint"
SENTRY_DSN="your_sentry_dsn"
OPEN_WEATHER_API_KEY="your_openweather_api_key"
APPWRITE_PROJECT_ID="your_appwrite_project_id"
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gopalkumr/farmhelp.git
   ```
2. Navigate to the project root and install Flutter dependencies:
   ```bash
   flutter pub get
   ```
3. Run the application:
   ```bash
   flutter run
   ```

---

## Engineering Challenges

### TFLite Integration in Flutter
During development, we faced compatibility issues with obsolete Flutter dependencies for TensorFlow Lite (such as the deprecated `tflite` package). We overcame this by shifting to the updated `tflite_flutter` package and building custom method channel bindings where necessary to interface directly with native Android/iOS TensorFlow Lite libraries.

---

## Project Roadmap

- [x] Design user authentication using Appwrite
- [x] Train and quantize the CNN classification model
- [x] Integrate local SQLite database for offline disease insights
- [x] Implement the mobile UI in Flutter
- [ ] Add multi-language support (Hindi, Tamil, Telugu) for local farming communities

---

## Team & Contributors

- **Gopal Kumar** — Mobile & ML Developer
- **Swetha PR** — Frontend & UI Designer
- **Sachin Singh** — Backend API Developer
