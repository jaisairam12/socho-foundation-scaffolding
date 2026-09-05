# SochoYhaPe — Dataset Documentation

## Overview

The SochoYhaPe dataset powers the project discovery, deterministic matching engine, and Gemini AI personalization. It contains curated, high-quality final-year engineering project blueprints across key technology domains.

---

## Database Table: `projects`

Each entry in the `projects` table represents a verified final-year project blueprint containing technical specifications, hardware bill of materials (BOM), difficulty ratings, cost estimates, target engineering branches, and prerequisites.

### Table Schema

```sql
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  domain TEXT NOT NULL, -- 'Artificial Intelligence', 'IoT & Embedded Systems', 'Cloud & Web Engineering', 'Cybersecurity', 'Mobile App Development', 'Data Engineering'
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  estimated_cost_inr NUMERIC NOT NULL,
  estimated_duration_weeks INTEGER NOT NULL,
  suitable_branches TEXT[] NOT NULL, -- e.g., ['Computer Science', 'Information Technology', 'Electronics & Communication']
  required_skills TEXT[] NOT NULL,
  technologies TEXT[] NOT NULL,
  hardware_bom JSONB DEFAULT '[]'::jsonb, -- Array of { name: string, estimatedCostInr: number, required: boolean }
  key_features TEXT[] NOT NULL,
  architectural_summary TEXT NOT NULL,
  learning_outcomes TEXT[] NOT NULL,
  viva_questions JSONB DEFAULT '[]'::jsonb, -- Array of { question: string, sampleAnswer: string, category: string }
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## Domain Coverage

The dataset spans 6 core engineering branches and technology domains:

| Domain | Target Engineering Branches | Typical Tech Stack | Example Project |
| :--- | :--- | :--- | :--- |
| **Artificial Intelligence** | CSE, IT, Data Science | Python, PyTorch, FastAPI, OpenCV, Docker | Edge-AI Autonomous Drone Navigation |
| **IoT & Embedded Systems** | ECE, EEE, Robotics, Mechatronics | ESP32, C++, FreeRTOS, MQTT, Node-RED | Smart Agricultural Soil Monitoring Network |
| **Cloud & Web Engineering** | CSE, IT | React, Node.js, PostgreSQL, Kubernetes, AWS | Distributed Microservices E-Commerce Core |
| **Cybersecurity** | CSE, Cybersecurity, IT | Python, Wireshark API, Rust, ELK Stack | Zero-Trust Network Anomaly Detector |
| **Mobile App Development** | CSE, Software Engineering | Flutter, Dart, Firebase, SQLite | Offline-First Disaster Emergency Mesh App |
| **Data Engineering** | Data Science, CSE, IT | PySpark, Apache Kafka, Snowflake, dbt | Real-Time Financial Fraud Pipeline |

---

## Sample Record Structure

```json
{
  "id": "c1f7a0e2-8b41-4e92-9842-1a2b3c4d5e6f",
  "title": "Smart Agricultural Soil & Microclimate Monitoring Network",
  "tagline": "Real-time IoT telemetry node network for precision farming and yield forecasting.",
  "description": "An end-to-end IoT platform deploying ESP32 nodes with soil moisture, pH, and ambient microclimate sensors to optimize irrigation and crop nutrition.",
  "domain": "IoT & Embedded Systems",
  "difficulty": "Intermediate",
  "estimated_cost_inr": 4500,
  "estimated_duration_weeks": 12,
  "suitable_branches": ["Electronics & Communication", "Electrical Engineering", "Computer Science"],
  "required_skills": ["C++ Programming", "Circuit Design", "MQTT Protocol", "Basic PCB Design"],
  "technologies": ["ESP32", "FreeRTOS", "MQTT", "Node-RED", "Grafana", "InfluxDB"],
  "hardware_bom": [
    { "name": "ESP32 Development Board", "estimatedCostInr": 650, "required": true },
    { "name": "Capacitive Soil Moisture Sensor v1.2", "estimatedCostInr": 180, "required": true },
    { "name": "DHT22 Temperature & Humidity Sensor", "estimatedCostInr": 320, "required": true },
    { "name": "Solar Panel 5V/2W + TP4056 Charger", "estimatedCostInr": 550, "required": false }
  ],
  "key_features": [
    "Ultra-low power deep sleep telemetry loop",
    "MQTT over TLS wireless data transmission",
    "Real-time Grafana dashboard visualizing field moisture heatmaps",
    "Automated solenoid valve pump trigger via threshold relays"
  ],
  "architectural_summary": "ESP32 sensors sample soil metrics every 15 minutes, transition to deep sleep, and transmit payload over MQTT to a local gateway hosting InfluxDB and Grafana.",
  "learning_outcomes": [
    "Master embedded C++ and RTOS task scheduling",
    "Implement low-power wireless protocols",
    "Build time-series visualization pipelines"
  ],
  "viva_questions": [
    {
      "question": "Why use capacitive soil moisture sensors over resistive ones?",
      "sampleAnswer": "Capacitive sensors measure soil dielectric permittivity without exposed electrodes, preventing rapid corrosion caused by electrolysis in moist soil.",
      "category": "Hardware Design"
    }
  ]
}
```

---

## Dataset Integrity Guidelines

1. **Zero Fake Records**: Fallback mock data in `src/data/mock-projects.ts` mirror exact database schemas to guarantee seamless operation if offline or during local testing.
2. **Realistic Costing**: Hardware BOM items use real Indian Rupee (INR) component pricing sourced from standard distributor rates (Robu.in, ElectronicsComp).
3. **Branch Mapping**: Every project is tagged with at least 2 suitable undergraduate engineering disciplines.
