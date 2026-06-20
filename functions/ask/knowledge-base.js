/**
 * GOPAL KUMAR — KNOWLEDGE BASE
 * ─────────────────────────────────────────────────────────────────────────────
 * This file is the single source of truth used by the AI chatbot.
 * Edit this file to keep the chatbot up to date with your latest info.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const KNOWLEDGE_BASE = `
================================================================
  GOPAL KUMAR — COMPLETE PROFESSIONAL KNOWLEDGE BASE
================================================================

## IDENTITY & CONTACT
- Full name: Gopal Kumar
- Email: gopalkumargupta337@gmail.com
- Portfolio: https://gopal.codes
- GitHub: https://github.com/gopalkumr
- LinkedIn: https://www.linkedin.com/in/gopalkumar0/
- Hugging Face: https://huggingface.co/gopalkumr
- Medium: https://gopalkumr.medium.com/
- Twitter/X: https://twitter.com/gopalkumar4
- Devpost: https://devpost.com/gopalkumr

================================================================
  CURRENT ROLE
================================================================
- Title: Software Development Engineer 1 (SDE-1)
- Company: Amazon
- Team: WW Returns & ReComm Tech & Innovation
- Location: Hyderabad, Telangana, India (On-site)
- Employment type: Full-time
- Start date: September 2025
- Duration: ~10 months (as of mid 2026)
- Tech used: Java, Spring Boot

================================================================
  PROFESSIONAL EXPERIENCE (CHRONOLOGICAL — LATEST FIRST)
================================================================

### 1. SDE-1 at Amazon (Sep 2025 – Present)
Location: Hyderabad, India · Full-time · On-site
Team: WW Returns & ReComm Tech & Innovation
- Building and shipping high-impact software for Amazon's worldwide returns
  and recommerce platform
- Working with Java and Spring Boot at massive scale
- Collaborating with cross-functional teams across engineering and product

### 2. R&D Intern at IHFC — TIH of IIT Delhi (Jul 2024 – Aug 2025)
Duration: 1 year 2 months
Location: Hauz Khas, Delhi, India · On-site · Internship
Project: visionml.tech — Real-time crowd surveillance for public safety
Key contributions:
- Architected a real-time crowd surveillance system targeting stampede
  prevention in high-density areas (concerts, public events)
- Used YOLOv8 for real-time object detection and Azure Vision for face
  counting, monitoring 500+ individuals per frame
- Identified 90% of suspicious activities using color-coded visual feedback
- Built a responsive monitoring dashboard in React (v18.3.1) + TypeScript,
  bundled with Vite (v5.4.1), cutting dashboard load time by 40%
- Integrated CSRNet (Congested Scene Recognition Network) to cut inference
  time by 25% and boost surveillance accuracy by 32%
- Deployed and demonstrated the system at 10+ real-world events
Skills used: Machine Learning, Python, YOLOv8, CSRNet, Azure Vision, React,
TypeScript, Vite

### 3. Research Intern at MulticoreWare Inc (Aug 2023 – Jan 2024)
Duration: 6 months
Location: Chennai, Tamil Nadu, India · Hybrid · Internship
Focus: Autonomous vehicle perception — sensor fusion
Key contributions:
- Researched and built the most efficient camera + radar fusion framework
  over the BevFusion architecture
- Developed a mid-fusion neural network that extracts the most important
  features from LiDAR and Camera for autonomous vehicles
- Improved the data loader for LiDAR and camera in the HvDetFusion
  open-source repository
Skills used: Machine Learning, Computer Vision, BevFusion, LiDAR, Radar,
Camera fusion, PyTorch

================================================================
  EDUCATION
================================================================
- Degree: Bachelor of Technology (BTech) in Information Technology
- University: Kalasalingam University (Kalasalingam Academy of Research
  and Education)
- Duration: May 2021 – May 2025
- Grade: 8.37 / 10
- Distinction: First Class with Distinction
- Key subjects: Data Structures, .NET Framework, Algorithms, Machine Learning

================================================================
  TECHNICAL SKILLS
================================================================

Programming Languages:
- Python (primary for ML/AI, scripting, Flask APIs)
- Java (used at Amazon — Spring Boot backend)
- C++ (computer vision, systems programming)
- JavaScript / TypeScript (React, Node.js, Nuxt.js frontends)
- Dart (Flutter mobile apps)

Machine Learning & AI:
- TensorFlow, PyTorch (deep learning frameworks)
- YOLOv8 (real-time object detection)
- CSRNet (crowd density estimation)
- BevFusion / HvDetFusion (autonomous vehicle sensor fusion)
- Kalman Filters (multi-sensor data integration)
- Convolutional Neural Networks (CNNs)
- Computer Vision
- Sensor Fusion (LiDAR + Radar + Camera)
- Azure Vision (face counting, crowd detection)
- Hugging Face models

Web & Mobile Development:
- React (v18+), TypeScript, Vite — frontend dashboards
- Nuxt.js (Vue-based SSR/static site framework)
- Node.js, Express — backend APIs
- Flutter / Dart — cross-platform mobile apps
- Flask (Python) — ML model serving APIs
- Spring Boot / Java — enterprise backend (Amazon)

Cloud Platforms:
- AWS (Amazon Web Services) — used at Amazon
- Microsoft Azure (Azure Vision, Azure AI Fundamentals certified)
- Google Cloud Platform (GCP — Google Cloud Digital Leader certified)

Tools & DevOps:
- Git, GitHub, Bitbucket (version control)
- Docker (containerization)
- Linux / Unix command line
- Appwrite (BaaS for Flutter apps)

================================================================
  PROJECTS
================================================================

### Project 1: Farmhelp — Plant Disease Detection App
Type: Cross-platform mobile app (Flutter + Dart)
Status: Under development (part of Accenture Hack & community service)
Description:
  A Flutter app that helps farmers identify plant diseases by scanning
  their plants and providing disease insights and treatment suggestions.
Tech stack: Flutter, Dart, TensorFlow Lite, Flask, Microsoft Azure,
  Appwrite, Material Design
AI Model: CNN image classification model converted and optimized to
  TensorFlow Lite format (compressed from 2MB to 200KB without accuracy loss)
GitHub: https://github.com/gopalkumr/farmhelp
Team: Gopal Kumar, Swetha PR, Sachin Singh (Accenture Hack team)

### Project 2: Plant Disease Detection API (Flask)
Type: Backend REST API + ML model
Status: Live demo available
Description:
  Flask-based API that analyzes plant images using a CNN model, detects
  diseases, and returns treatment recommendations + medicine purchase links.
Tech stack: Flask, Python, CNN, PIL/OpenCV
Live demo: https://plant-dd-co9k.onrender.com/
Repo: https://bitbucket.org/flutter-flask/plant-dd/src/master/
API: POST /predict — accepts image, returns disease name, description,
  treatment steps, and supplement purchase link

### Project 3: VisionML — Real-time Crowd Surveillance (IHFC / IIT Delhi)
Type: Full-stack ML system + monitoring dashboard
Status: Deployed and demonstrated at real-world events
Description:
  Real-time crowd surveillance system for stampede prevention at high-
  density public events. Uses YOLOv8 + Azure Vision for detection,
  CSRNet for density estimation, and a live React dashboard.
Live: https://visionml.tech
Tech stack: Python, YOLOv8, CSRNet, Azure Vision, React, TypeScript, Vite

### Project 4: Portfolio Website (gopal.codes)
Type: Personal portfolio website
Tech stack: Nuxt.js, Vue.js, SCSS, Netlify Functions, Netlify Identity
URL: https://gopal.codes

### Project 5: Camera + Radar Fusion (MulticoreWare / BevFusion)
Type: Research project — autonomous vehicle perception
Description:
  Most efficient camera + radar fusion framework over the BevFusion
  architecture for autonomous vehicle object detection.
Contributed to: HvDetFusion open-source repository
Tech: PyTorch, LiDAR, Radar, Camera, BevFusion, Kalman Filters

================================================================
  CERTIFICATIONS
================================================================
- Microsoft Certified: Azure AI Fundamentals (Jan 2023)
- Microsoft Certified: Azure Fundamentals (Jan 2023)
- Google Cloud Digital Leader (Aug 2023)
- NDG Linux Unhatched — Cisco Networking Academy
- Python Programming — University of Michigan via Coursera (Nov 2023)

================================================================
  INTERESTS & PERSONALITY
================================================================
- Passionate about ML/AI research and its real-world applications
- Enjoys solving hard engineering problems at scale
- Open-source contributor and knowledge-sharing advocate
- Interested in autonomous systems, computer vision, and edge ML
- Active on Hugging Face, publishing and experimenting with models
- Blogs on Medium about technology and personal projects
- Participated in hackathons (Accenture Hack, etc.)
- Believes in building technology that directly helps people (farmers,
  public safety, etc.)

================================================================
  FREQUENTLY ASKED QUESTIONS
================================================================

Q: Where does Gopal work?
A: Amazon, Hyderabad, India. SDE-1 on the WW Returns & ReComm team.

Q: What is Gopal's tech stack?
A: Java & Spring Boot (Amazon), Python (ML/AI), React/TypeScript (frontend),
   Flutter (mobile), PyTorch/TensorFlow (deep learning).

Q: Is Gopal open to opportunities?
A: He is currently employed at Amazon. You can reach out via LinkedIn or
   email (gopalkumargupta337@gmail.com) for collaborations.

Q: What projects has Gopal built?
A: Farmhelp (plant disease Flutter app), VisionML (crowd surveillance),
   Plant Disease Detection API (Flask/CNN), and the BevFusion camera+radar
   fusion research at MulticoreWare.

Q: What is Gopal's education background?
A: BTech in Information Technology from Kalasalingam University,
   graduated May 2025 with 8.37 GPA, First Class with Distinction.

Q: How can I contact Gopal?
A: Email: gopalkumargupta337@gmail.com
   LinkedIn: https://www.linkedin.com/in/gopalkumar0/
   GitHub: https://github.com/gopalkumr

================================================================
`

module.exports = { KNOWLEDGE_BASE }
