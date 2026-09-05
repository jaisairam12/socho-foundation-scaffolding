import { Project, StudentPreferences, RecommendationResult, ProjectFilterParams } from "@/types/project";
import { supabase, isSupabaseConfigured } from "./supabase";

export const REAL_PROJECTS_DATASET: Project[] = [
  {
    id: "proj-001",
    title: "AI-Powered Early Crop Disease Detection System",
    domain: "AI & Machine Learning",
    difficulty: "Intermediate",
    estimated_cost: 3500,
    estimated_duration: "6 weeks",
    estimated_duration_weeks: 6,
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "React Native"],
    required_skills: ["Python", "Computer Vision", "Deep Learning", "Mobile App Dev"],
    short_description: "Deep learning mobile system for instant leaf disease classification and treatment recommendation for local farmers.",
    description: "An end-to-end edge AI platform utilizing MobileNetV3 architectures trained on PlantVillage datasets to diagnose 38 distinct crop diseases from leaf imagery in under 500ms without relying on cloud bandwidth.",
    problem_statement: "Crop disease outbreaks account for up to 40% annual yield losses for smallholder farmers who lack immediate access to agricultural experts.",
    hardware: ["Raspberry Pi 4 (Optional)", "Smartphone Camera", "ESP32-CAM"],
    core_features: [
      "Real-time offline image inference via TensorFlow Lite",
      "Multilingual UI (English, Hindi, Regional languages)",
      "Geotagged disease outbreak mapping",
      "Severity percentage calculation & organic remedy suggestions"
    ],
    advanced_features: [
      "Weather API integration for predictive risk forecasting",
      "Drone image batch processing pipeline",
      "Automated fertilizer dosage calculator"
    ],
    development_steps: [
      "Dataset acquisition & image augmentation",
      "Model training (Transfer Learning with MobileNetV3)",
      "Model quantization to TFLite format",
      "Cross-platform app development with React Native",
      "Field validation & accuracy benchmarking"
    ],
    future_improvements: [
      "Multispectral satellite image integration",
      "LLM-powered agricultural Q&A voice assistant"
    ],
    suitable_branches: ["Computer Science", "Information Technology", "Agricultural Engineering", "AI & Data Science"],
    min_team_size: 2,
    max_team_size: 4,
    dataset_ai_info: "Trained on 54,305 high-resolution leaf images from PlantVillage with 98.4% top-1 accuracy."
  },
  {
    id: "proj-002",
    title: "Autonomous Indoor Hospital Logistics Rover",
    domain: "Robotics & Hardware",
    difficulty: "Advanced",
    estimated_cost: 12000,
    estimated_duration: "10 weeks",
    estimated_duration_weeks: 10,
    technologies: ["ROS2", "C++", "Python", "LiDAR SLAM", "OpenCV"],
    required_skills: ["ROS2", "C++", "Circuit Design", "Embedded Systems"],
    short_description: "SLAM-guided autonomous mobile robot (AMR) designed for contactless medicine delivery in hospital wards.",
    description: "A dual-differential drive robotic platform employing 2D LiDAR and ROS2 Nav2 navigation stack for obstacle avoidance, dynamic path planning, and secure RFID cabinet access in healthcare environments.",
    problem_statement: "Hospital staff spend over 30% of work shifts performing routine transport of lab samples and pharmaceuticals, increasing biohazard exposure.",
    hardware: ["RPLiDAR A1M8", "Raspberry Pi 4 (4GB)", "Arduino Mega 2560", "NEMA 17 Stepper Motors", "MFRC522 RFID Module", "12V LiFePO4 Battery"],
    core_features: [
      "Cartographer SLAM indoor mapping & navigation",
      "Dynamic obstacle avoidance with ultrasound & optical sensors",
      "RFID authentication for medicine compartment unlock",
      "Web dashboard for station dispatch & live tracking"
    ],
    advanced_features: [
      "Auto-docking wireless charging station",
      "Elevator integration protocol via MQTT"
    ],
    development_steps: [
      "CAD frame design & 3D printing chassis",
      "Motor driver & power distribution circuit assembly",
      "ROS2 workspace setup & URDF robot model definition",
      "LiDAR SLAM calibration & costmap tuning",
      "Web telemetry interface integration"
    ],
    future_improvements: [
      "3D LiDAR upgrade for multi-floor navigation",
      "UV-C sterilization lamp payload"
    ],
    suitable_branches: ["Robotics & Automation", "Electronics & Communication", "Electrical Engineering", "Mechatronics"],
    min_team_size: 3,
    max_team_size: 5,
    dataset_ai_info: "Nav2 costmap parameters tuned for narrow 1.2m hospital corridor environments."
  },
  {
    id: "proj-003",
    title: "Smart Microgrid Solar Energy Monitor & Load Balancer",
    domain: "IoT & Embedded Systems",
    difficulty: "Intermediate",
    estimated_cost: 4500,
    estimated_duration: "6 weeks",
    estimated_duration_weeks: 6,
    technologies: ["Embedded C", "ESP32", "MQTT", "InfluxDB", "Grafana"],
    required_skills: ["Embedded C", "IoT Protocols", "PCB Design", "Data Visualization"],
    short_description: "IoT microgrid controller optimizing solar PV utilization and grid switching based on real-time tariff rates.",
    description: "An intelligent energy management system utilizing ESP32 microcontrollers, ACS712 current sensors, and ZMPT101B voltage transformers to measure power factor, grid frequency, and route clean solar power dynamically.",
    problem_statement: "Commercial solar installations lose 15-22% energy efficiency due to sub-optimal grid synchronization and unmonitored load spikes.",
    hardware: ["ESP32 DevKit V1", "ACS712 30A Current Sensor", "ZMPT101B Voltage Module", "4-Channel 12V Relay Board", "OLED Display 0.96 inch"],
    core_features: [
      "High-frequency AC current & voltage RMS sensing",
      "MQTT telemetry transmission with SSL encryption",
      "Peak-hour automatic grid vs battery relay tripping",
      "Real-time Grafana dashboard for kWh usage analytics"
    ],
    advanced_features: [
      "Machine learning solar generation forecasting",
      "Peer-to-peer microgrid energy trading interface"
    ],
    development_steps: [
      "Circuit schematic design in EasyEDA",
      "Sensor calibration & RMS sampling code in ESP-IDF/Arduino",
      "MQTT broker (Mosquitto) & InfluxDB deployment",
      "Relay hysteresis protection logic implementation",
      "Enclosure fabrication & bench testing"
    ],
    future_improvements: [
      "LoRaWAN integration for remote agricultural microgrids",
      "Battery state-of-health (SoH) prediction model"
    ],
    suitable_branches: ["Electrical Engineering", "Electronics & Communication", "Instrumentation", "Energy Systems"],
    min_team_size: 2,
    max_team_size: 4,
    dataset_ai_info: "Hardware telemetry sampled at 1kHz; averaged to 1s MQTT payloads."
  },
  {
    id: "proj-004",
    title: "Zero-Trust Microservices API Security Gateway",
    domain: "Cybersecurity & Cloud",
    difficulty: "Advanced",
    estimated_cost: 0,
    estimated_duration: "8 weeks",
    estimated_duration_weeks: 8,
    technologies: ["Go", "Docker", "Kubernetes", "Redis", "JWT/mTLS", "Prometheus"],
    required_skills: ["Go", "Distributed Systems", "Network Security", "Docker"],
    short_description: "High-performance API proxy delivering rate-limiting, mTLS authentication, and real-time anomaly detection.",
    description: "A lightweight cloud-native API gateway built in Go that inspects HTTP/gRPC requests, enforces fine-grained RBAC, performs token bucket rate-limiting via Redis, and mitigates OWASP Top 10 API attacks.",
    problem_statement: "Over 75% of modern enterprise security breaches originate from exposed, unauthenticated, or rate-unbounded microservice API endpoints.",
    hardware: ["None (Cloud / Local Server)"],
    core_features: [
      "Sub-millisecond proxy latency in Go (fasthttp engine)",
      "Dynamic rate-limiting via Redis sliding window algorithm",
      "mTLS client certificate verification & JWT token validation",
      "Prometheus metrics exporter & Jaeger distributed tracing"
    ],
    advanced_features: [
      "eBPF packet filtering layer for DDoS protection",
      "Automated OpenAPI schema request validation"
    ],
    development_steps: [
      "Gateway architecture design & proxy pipeline formulation",
      "Go middleware development (Auth, RateLimit, Logging)",
      "Redis cluster integration for state persistence",
      "Docker containerization & Helm chart creation",
      "Load testing with Apache JMeter (10,000 req/sec benchmark)"
    ],
    future_improvements: [
      "Wasm plugin runtime support for custom policy logic",
      "AI payload anomaly detector using Isolation Forests"
    ],
    suitable_branches: ["Computer Science", "Cybersecurity", "Cloud Computing", "Information Technology"],
    min_team_size: 2,
    max_team_size: 3,
    dataset_ai_info: "Tested against 1,000,000 synthetic attack payloads from SecLists."
  },
  {
    id: "proj-005",
    title: "Blockchain-Based Decentralized Academic Credential Verifier",
    domain: "Blockchain & Web3",
    difficulty: "Intermediate",
    estimated_cost: 1500,
    estimated_duration: "6 weeks",
    estimated_duration_weeks: 6,
    technologies: ["Solidity", "Ethereum / Polygon", "Next.js", "Ethers.js", "IPFS"],
    required_skills: ["Solidity", "Smart Contracts", "Web3.js/Ethers.js", "React"],
    short_description: "Tamper-proof academic diploma issuing and verification protocol leveraging IPFS and Polygon smart contracts.",
    description: "A Web3 decentralized application allowing universities to issue cryptographically signed degree certificates stored on IPFS, enabling employers to instantly verify authenticity without third-party intermediaries.",
    problem_statement: "Fake degree certificates cost employers billions annually and require multi-week manual background verification workflows.",
    hardware: ["None"],
    core_features: [
      "ERC-721 non-transferable Soulbound Token (SBT) certificate issuing",
      "IPFS metadata storage via Pinata API",
      "One-click QR code instant verification portal",
      "Role-based Access Control (RBAC) for university registrars"
    ],
    advanced_features: [
      "Zero-Knowledge Proof (ZK-SNARK) privacy-preserving grade verification",
      "Batch certificate minting script for graduating classes"
    ],
    development_steps: [
      "Smart contract development in Hardhat/Foundry",
      "Contract unit testing (100% coverage target)",
      "Deployment to Polygon Amoy Testnet",
      "Next.js frontend development & Metamask wallet connection",
      "Verification page implementation with QR scanner"
    ],
    future_improvements: [
      "W3C Verifiable Credentials (VC) standard compliance",
      "Cross-chain verification bridge"
    ],
    suitable_branches: ["Computer Science", "Information Technology", "Software Engineering"],
    min_team_size: 2,
    max_team_size: 3,
    dataset_ai_info: "Gas optimized smart contract consuming under 85,000 gas per certificate mint."
  },
  {
    id: "proj-006",
    title: "Brain-Computer Interface (BCI) Controlled Assistive Wheelchair",
    domain: "Biomedical & AI",
    difficulty: "Advanced",
    estimated_cost: 15000,
    estimated_duration: "12 weeks",
    estimated_duration_weeks: 12,
    technologies: ["Python", "MNE-Python", "Brainflow", "PyTorch", "Arduino"],
    required_skills: ["Signal Processing", "Machine Learning", "Neuroheadset APIs", "Motor Control"],
    short_description: "Non-invasive EEG-guided motorized wheelchair control for individuals with severe motor disabilities.",
    description: "An assistive technology platform that captures SSVEP (Steady-State Visually Evoked Potentials) or motor imagery EEG signals, filters artifacts, classifies directional intent in PyTorch, and sends motor commands via serial to a motorized wheelchair.",
    problem_statement: "Individuals with Amyotrophic Lateral Sclerosis (ALS) or quadriplegia lack accessible, hands-free mobility solutions.",
    hardware: ["OpenBCI Cyton / Muse 2 EEG Headset", "Arduino Uno", "24V DC Wheelchair Motors", "Cytron SmartDriveDuo Motor Driver", "24V Lead-Acid Batteries"],
    core_features: [
      "Real-time EEG signal acquisition & bandpass filtering (8-30 Hz)",
      "Fast Fourier Transform (FFT) & Filter Bank Common Spatial Pattern (FBCSP)",
      "Directional command classification (Forward, Left, Right, Stop)",
      "Safety override using ultrasonic proximity sensors"
    ],
    advanced_features: [
      "Eye-gaze tracking camera sensor fusion",
      "Emergency SMS alert trigger on abnormal EEG spike"
    ],
    development_steps: [
      "EEG electrode placement & impedance calibration",
      "Signal processing pipeline construction in Python",
      "Machine learning classifier training (SVM / CNN)",
      "Arduino motor driver interface code writing",
      "Closed-loop subject testing & latency optimization"
    ],
    future_improvements: [
      "Embedded Jetson Nano deployment for self-contained processing",
      "Adaptive online classifier retraining"
    ],
    suitable_branches: ["Biomedical Engineering", "Electronics & Communication", "Computer Science", "AI Engineering"],
    min_team_size: 3,
    max_team_size: 5,
    dataset_ai_info: "Tested with PhysioNet EEG Motor Movement/Imagery Dataset and live OpenBCI trials."
  },
  {
    id: "proj-007",
    title: "Full-Stack Agile Project Management Board with Real-Time Collaboration",
    domain: "Web Development",
    difficulty: "Beginner",
    estimated_cost: 0,
    estimated_duration: "4 weeks",
    estimated_duration_weeks: 4,
    technologies: ["React", "TypeScript", "Node.js", "Express", "Socket.io", "PostgreSQL"],
    required_skills: ["React", "JavaScript/TypeScript", "Node.js", "SQL Basics"],
    short_description: "Collaborative Kanban productivity web application featuring drag-and-drop boards, live cursors, and sprint analytics.",
    description: "A modern web application allowing software development teams to create boards, assign tasks, track sprint velocity, and collaborate concurrently with WebSockets and optimistic UI updates.",
    problem_statement: "Student engineering teams struggle to track deliverables efficiently without cumbersome commercial tools.",
    hardware: ["None"],
    core_features: [
      "Drag-and-drop Kanban columns using dnd-kit",
      "Real-time card movements & comments via Socket.io",
      "JWT authentication & workspace member invitations",
      "Sprint burndown chart generation with Recharts"
    ],
    advanced_features: [
      "GitHub webhook integration for automatic issue syncing",
      "Dark mode theme toggling with persistent preferences"
    ],
    development_steps: [
      "Database schema design (Users, Workspaces, Boards, Cards)",
      "Express REST API & WebSocket event handler setup",
      "React state management & UI component development",
      "Socket synchronization logic implementation",
      "Vite production build optimization"
    ],
    future_improvements: [
      "AI task effort estimation helper",
      "Export board to PDF / Markdown report"
    ],
    suitable_branches: ["Computer Science", "Information Technology", "Software Engineering"],
    min_team_size: 1,
    max_team_size: 3,
    dataset_ai_info: "Optimized relational database queries supporting up to 50 concurrent room users."
  },
  {
    id: "proj-008",
    title: "IoT Smart Water Quality Monitoring & Leakage Alert Network",
    domain: "IoT & Embedded Systems",
    difficulty: "Beginner",
    estimated_cost: 2800,
    estimated_duration: "4 weeks",
    estimated_duration_weeks: 4,
    technologies: ["Arduino", "ESP8266", "ThingSpeak", "C++", "HTML/CSS"],
    required_skills: ["Arduino", "Basic Electronics", "C++", "Web Fundamentals"],
    short_description: "Affordable water pH, turbidity, and pipe flow sensor station sending instant SMS alerts upon contamination.",
    description: "An environment monitoring IoT node utilizing ESP8266 Wi-Fi board, pH sensor probe, turbidity sensor, and YF-S201 flow meter to continuously sample tap water quality and upload metrics to ThingSpeak cloud.",
    problem_statement: "Municipal water pipe contamination causes widespread waterborne illnesses in residential neighborhoods before manual sampling detects it.",
    hardware: ["NodeMCU ESP8266", "Analog pH Sensor Kit", "Turbidity Sensor Module", "YF-S201 Water Flow Sensor", "DS18B20 Temp Sensor", "Buzzer"],
    core_features: [
      "Continuous pH, Nephelometric Turbidity Units (NTU), & flow measurement",
      "ThingSpeak live charting dashboard",
      "Local buzzer alert when pH drops below 6.5 or above 8.5",
      "Twilio API SMS notifications for critical events"
    ],
    advanced_features: [
      "Solar panel battery power module for remote installation",
      "Automated solenoid valve cutoff on severe contamination"
    ],
    development_steps: [
      "Sensor wiring & voltage divider setup",
      "Sensor calibration against standard pH buffer solutions",
      "Arduino code writing & Wi-Fi reconnect handling",
      "Cloud channel configuration on ThingSpeak",
      "Enclosure assembly & water-resistance proofing"
    ],
    future_improvements: [
      "TDS (Total Dissolved Solids) sensor integration",
      "Mobile push notifications via Firebase"
    ],
    suitable_branches: ["Electronics & Communication", "Civil Engineering", "Environmental Engineering", "Computer Science"],
    min_team_size: 1,
    max_team_size: 3,
    dataset_ai_info: "Includes standard WHO drinking water safety threshold calibration parameters."
  },
  {
    id: "proj-009",
    title: "Autonomous Drone Vegetation Index (NDVI) Mapping Payload",
    domain: "Robotics & Hardware",
    difficulty: "Advanced",
    estimated_cost: 18000,
    estimated_duration: "10 weeks",
    estimated_duration_weeks: 10,
    technologies: ["Python", "OpenCV", "QGroundControl", "ArduPilot", "GDAL"],
    required_skills: ["Computer Vision", "Python", "Drone Avionics", "GIS Analysis"],
    short_description: "Custom modified dual-camera drone payload capturing Near-Infrared (NIR) imagery to compute crop health indices.",
    description: "An aerial remote sensing payload integrating a modified camera sensor (NIR filter), GPS tagging, and OpenCV post-processing to stitch orthomosaic maps and compute Normalized Difference Vegetation Index (NDVI) values for precision agriculture.",
    problem_statement: "Commercial multispectral survey drones cost upwards of $5,000, placing precision agriculture out of reach for small research farms.",
    hardware: ["Quadcopter Drone Frame (F450)", "Pixhawk 2.4.8 Autopilot", "Raspberry Pi Zero 2W", "Modified Raspberry Pi NoIR Camera", "GPS M8N Module"],
    core_features: [
      "Autonomous waypoint mission flight execution via ArduPilot",
      "Geotagged NIR image capture synchronized with GPS telemetry",
      "OpenCV NDVI map generation script (Red vs NIR channel math)",
      "False-color heatmap rendering of crop vigor"
    ],
    advanced_features: [
      "Real-time companion computer image compression",
      "QGroundControl telemetry overlay plugin"
    ],
    development_steps: [
      "Drone assembly & PID flight tuning",
      "NoIR camera filter modification & spectral response check",
      "Companion computer flight log sync script development",
      "OpenCV orthomosaic stitching & NDVI formula coding",
      "Test flight execution over agricultural test plots"
    ],
    future_improvements: [
      "Thermal camera integration for irrigation leak detection",
      "Cloud orthomosaic generation backend"
    ],
    suitable_branches: ["Aerospace Engineering", "Electronics & Communication", "Computer Science", "Robotics"],
    min_team_size: 3,
    max_team_size: 5,
    dataset_ai_info: "Calculates standard NDVI formula: (NIR - Red) / (NIR + Red)."
  },
  {
    id: "proj-010",
    title: "Edge AI Pedestrian & Vehicle Traffic Density Analytics Camera",
    domain: "AI & Machine Learning",
    difficulty: "Intermediate",
    estimated_cost: 6000,
    estimated_duration: "6 weeks",
    estimated_duration_weeks: 6,
    technologies: ["Python", "YOLOv8", "DeepSORT", "NVIDIA Jetson Nano", "FastAPI"],
    required_skills: ["Python", "PyTorch/YOLO", "Linux/Embedded Edge", "API Development"],
    short_description: "Real-time edge computer vision station monitoring traffic flow, vehicle classification, and pedestrian safety.",
    description: "An intelligent traffic surveillance node running quantized YOLOv8 object detection on NVIDIA Jetson Nano hardware to count vehicles, calculate average speed, identify congestion patterns, and expose a REST API for smart city dashboards.",
    problem_statement: "Traditional traffic light controllers use fixed timers rather than real-time traffic volume data, causing unnecessary gridlock.",
    hardware: ["NVIDIA Jetson Nano (4GB)", "USB Web Camera or IP Camera", "12V 4A DC Power Adapter"],
    core_features: [
      "YOLOv8 nano model detection at 25+ FPS on Jetson TensorRT",
      "DeepSORT multi-object tracking for accurate vehicle counts",
      "Virtual boundary line crossing counter logic",
      "FastAPI web interface for live stream & statistical charts"
    ],
    advanced_features: [
      "Emergency vehicle priority Siren audio detection",
      "License plate recognition (ANPR) module"
    ],
    development_steps: [
      "Jetson Nano JetPack OS setup & PyTorch CUDA compilation",
      "YOLOv8 custom class export & TensorRT engine build",
      "Tracking algorithm implementation in Python",
      "FastAPI backend & WebSocket stream builder",
      "Stress testing under diverse lighting & weather video feeds"
    ],
    future_improvements: [
      "Adaptive traffic signal relay controller",
      "Solar powered weatherproof enclosure"
    ],
    suitable_branches: ["Computer Science", "AI & Data Science", "Electronics & Communication"],
    min_team_size: 2,
    max_team_size: 4,
    dataset_ai_info: "Trained on COCO dataset traffic classes (car, bus, truck, motorbike, person)."
  }
];

export function normalizeProject(raw: any): Project {
  if (!raw) return raw;
  const id = String(raw.id || raw.project_id || raw._id || "");
  const title = String(raw.title || raw.name || raw.project_name || "Untitled Engineering Project");
  const domain = String(raw.domain || raw.category || raw.field || "General Engineering");
  const difficulty = raw.difficulty || "Intermediate";
  const cost =
    typeof raw.estimated_cost === "number"
      ? raw.estimated_cost
      : typeof raw.budget === "number"
      ? raw.budget
      : parseFloat(raw.budget || raw.cost || "0") || 4500;
  const duration =
    raw.estimated_duration ||
    (raw.duration
      ? typeof raw.duration === "number"
        ? `${raw.duration} weeks`
        : String(raw.duration)
      : "8 weeks");

  // Parse technologies
  let technologies: string[] = [];
  const rawTech = raw.technologies || raw.tech_stack || raw.technology;
  if (Array.isArray(rawTech)) {
    technologies = rawTech.map((t: any) => String(t).trim()).filter(Boolean);
  } else if (typeof rawTech === "string" && rawTech.trim()) {
    try {
      const parsed = JSON.parse(rawTech);
      technologies = Array.isArray(parsed)
        ? parsed.map((t: any) => String(t).trim()).filter(Boolean)
        : rawTech.split(",").map((s) => s.trim()).filter(Boolean);
    } catch {
      technologies = rawTech.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  // Parse skills
  let skills: string[] = [];
  const rawSkills = raw.required_skills || raw.skills;
  if (Array.isArray(rawSkills)) {
    skills = rawSkills.map((s: any) => String(s).trim()).filter(Boolean);
  } else if (typeof rawSkills === "string" && rawSkills.trim()) {
    try {
      const parsed = JSON.parse(rawSkills);
      skills = Array.isArray(parsed)
        ? parsed.map((s: any) => String(s).trim()).filter(Boolean)
        : rawSkills.split(",").map((s) => s.trim()).filter(Boolean);
    } catch {
      skills = rawSkills.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  // Parse hardware
  let hardware: string[] = [];
  const rawHw = raw.hardware || raw.hardware_bom || raw.hardware_required;
  if (Array.isArray(rawHw)) {
    hardware = rawHw
      .map((b: any) => (typeof b === "string" ? b.trim() : b.name || JSON.stringify(b)))
      .filter(Boolean);
  } else if (typeof rawHw === "string" && rawHw.trim()) {
    try {
      const parsed = JSON.parse(rawHw);
      hardware = Array.isArray(parsed)
        ? parsed.map((b: any) => (typeof b === "string" ? b.trim() : b.name || JSON.stringify(b))).filter(Boolean)
        : rawHw.split(",").map((s) => s.trim()).filter(Boolean);
    } catch {
      hardware = rawHw.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  // Parse software
  let software: string[] = [];
  const rawSw = raw.software || raw.software_required || raw.tools;
  if (Array.isArray(rawSw)) {
    software = rawSw.map((s: any) => String(s).trim()).filter(Boolean);
  } else if (typeof rawSw === "string" && rawSw.trim()) {
    try {
      const parsed = JSON.parse(rawSw);
      software = Array.isArray(parsed)
        ? parsed.map((s: any) => String(s).trim()).filter(Boolean)
        : rawSw.split(",").map((s) => s.trim()).filter(Boolean);
    } catch {
      software = rawSw.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  const shortDesc =
    raw.short_description ||
    raw.description ||
    raw.abstract ||
    "Comprehensive final-year engineering capstone project blueprint.";
  const fullDesc = raw.description || raw.short_description || raw.abstract;
  const abstract = raw.abstract || raw.description || raw.short_description;

  return {
    id,
    project_id: raw.project_id || id,
    title,
    domain,
    difficulty,
    estimated_cost: cost,
    budget: cost,
    estimated_duration: duration,
    duration,
    estimated_duration_weeks:
      raw.estimated_duration_weeks || parseInt(duration) || 8,
    technologies: technologies.length > 0 ? technologies : ["General Tools"],
    required_skills: skills.length > 0 ? skills : ["Problem Solving", "Engineering Fundamentals"],
    skills: skills.length > 0 ? skills : ["Problem Solving", "Engineering Fundamentals"],
    short_description: shortDesc,
    description: fullDesc,
    abstract: abstract,
    problem_statement: raw.problem_statement,
    hardware: hardware.length > 0 ? hardware : undefined,
    software: software.length > 0 ? software : undefined,
    core_features: raw.core_features || raw.key_features,
    advanced_features: raw.advanced_features,
    development_steps: raw.development_steps,
    future_improvements: raw.future_improvements,
    suitable_branches: Array.isArray(raw.suitable_branches) ? raw.suitable_branches : undefined,
    team_size:
      raw.team_size ||
      (raw.min_team_size ? `${raw.min_team_size}–${raw.max_team_size || 4} members` : "2–4 members"),
    min_team_size: raw.min_team_size || 2,
    max_team_size: raw.max_team_size || 4,
    year: raw.year,
    source: raw.source,
    source_url: raw.source_url,
    quality_score: typeof raw.quality_score === "number" ? raw.quality_score : undefined,
    dataset_source: raw.dataset_source || (isSupabaseConfigured ? "Supabase Database" : "Verified Curated Blueprint"),
    dataset_ai_info: raw.dataset_ai_info,
    created_at: raw.created_at,
  };
}

export async function fetchAllProjectsForMatching(): Promise<Project[]> {
  if (isSupabaseConfigured) {
    // 1. Try 'project' table
    try {
      const { data, error } = await supabase.from("project").select("*").limit(2500);
      if (!error && data && data.length > 0) {
        return data.map(normalizeProject);
      }
    } catch (e) {
      console.warn("Supabase fetch 'project' table failed:", e);
    }

    // 2. Try 'projects' table
    try {
      const { data, error } = await supabase.from("projects").select("*").limit(2500);
      if (!error && data && data.length > 0) {
        return data.map(normalizeProject);
      }
    } catch (e) {
      console.warn("Supabase fetch 'projects' table failed:", e);
    }
  }

  // Fallback to local verified engineering dataset
  return REAL_PROJECTS_DATASET.map(normalizeProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (isSupabaseConfigured) {
    // 1. Try 'project' table
    try {
      const { data, error } = await supabase.from("project").select("*").or(`id.eq.${id},project_id.eq.${id}`).limit(1).maybeSingle();
      if (!error && data) {
        return normalizeProject(data);
      }
    } catch (e) {
      // ignore and try next
    }

    // 2. Try 'projects' table
    try {
      const { data, error } = await supabase.from("projects").select("*").or(`id.eq.${id},project_id.eq.${id}`).limit(1).maybeSingle();
      if (!error && data) {
        return normalizeProject(data);
      }
    } catch (e) {
      console.warn("Supabase single project fetch failed:", e);
    }
  }

  const found = REAL_PROJECTS_DATASET.find((p) => p.id === id || p.project_id === id);
  return found ? normalizeProject(found) : null;
}

// Helper to filter and paginate projects
export async function getProjects(params: ProjectFilterParams = {}): Promise<{ data: Project[]; total: number }> {
  const {
    search,
    domain,
    difficulty,
    maxBudget,
    maxDurationWeeks,
    technology,
    skill,
    branch,
    page = 1,
    pageSize = 9,
  } = params;

  let all = await fetchAllProjectsForMatching();

  if (search) {
    const s = search.toLowerCase();
    all = all.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.short_description.toLowerCase().includes(s) ||
        p.domain.toLowerCase().includes(s) ||
        p.technologies.some((t) => t.toLowerCase().includes(s)) ||
        p.required_skills.some((sk) => sk.toLowerCase().includes(s))
    );
  }

  if (domain && domain !== "All") {
    all = all.filter((p) => p.domain === domain);
  }

  if (difficulty && difficulty !== "All") {
    all = all.filter((p) => p.difficulty === difficulty);
  }

  if (maxBudget !== undefined && maxBudget > 0) {
    all = all.filter((p) => p.estimated_cost <= maxBudget);
  }

  if (maxDurationWeeks !== undefined && maxDurationWeeks > 0) {
    all = all.filter((p) => (p.estimated_duration_weeks || 12) <= maxDurationWeeks);
  }

  if (technology && technology !== "All") {
    all = all.filter((p) =>
      p.technologies.some((t) => t.toLowerCase() === technology.toLowerCase())
    );
  }

  if (skill && skill !== "All") {
    all = all.filter((p) =>
      p.required_skills.some((s) => s.toLowerCase() === skill.toLowerCase())
    );
  }

  if (branch && branch !== "All") {
    all = all.filter((p) =>
      p.suitable_branches?.some((b) => b.toLowerCase().includes(branch.toLowerCase()))
    );
  }

  const total = all.length;
  const start = (page - 1) * pageSize;
  const paginatedData = all.slice(start, start + pageSize);

  return { data: paginatedData, total };
}



/**
 * Deterministic Matching Engine Algorithm (WITHOUT Gemini AI)
 * 
 * Weights specified by user:
 * - Skills: 30%
 * - Interests: 25%
 * - Budget: 15%
 * - Time/Duration: 15%
 * - Difficulty/Experience: 10%
 * - Team Size: 5%
 * 
 * Score Formula:
 * final_score = skills_score * 0.30 + interests_score * 0.25 + budget_score * 0.15 + time_score * 0.15 + difficulty_score * 0.10 + team_score * 0.05
 */
export function calculateMatchScores(
  projects: Project[],
  prefs: StudentPreferences
): RecommendationResult[] {
  const results: RecommendationResult[] = projects.map((project) => {
    // 1. Skills Score (30%)
    let skills_score = 0;
    const matching_skills: string[] = [];
    if (project.required_skills && project.required_skills.length > 0) {
      const reqLower = project.required_skills.map((s) => s.toLowerCase());
      const studentSkillsLower = prefs.skills.map((s) => s.toLowerCase());
      
      let matches = 0;
      project.required_skills.forEach((reqSkill) => {
        if (studentSkillsLower.some((userSkill) => userSkill.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(userSkill))) {
          matches++;
          matching_skills.push(reqSkill);
        }
      });

      // Also check technologies match
      project.technologies.forEach((tech) => {
        if (studentSkillsLower.some((userSkill) => userSkill.includes(tech.toLowerCase()) || tech.toLowerCase().includes(userSkill))) {
          if (!matching_skills.includes(tech)) {
            matching_skills.push(tech);
          }
        }
      });

      skills_score = Math.min(100, Math.round((matches / project.required_skills.length) * 100));
      if (prefs.skills.length > 0 && matching_skills.length > 0 && skills_score < 40) {
        skills_score = Math.max(skills_score, 50); // Bonus for partial stack match
      }
    } else {
      skills_score = 100;
    }

    // 2. Interests Score (25%)
    let interests_score = 0;
    const matching_interests: string[] = [];
    if (prefs.interests && prefs.interests.length > 0) {
      const domainMatch = prefs.interests.some((interest) =>
        project.domain.toLowerCase().includes(interest.toLowerCase()) || interest.toLowerCase().includes(project.domain.toLowerCase())
      );

      if (domainMatch) {
        interests_score = 100;
        matching_interests.push(project.domain);
      } else {
        // Check short description & tech keywords
        const text = (project.short_description + " " + project.technologies.join(" ")).toLowerCase();
        prefs.interests.forEach((interest) => {
          if (text.includes(interest.toLowerCase())) {
            matching_interests.push(interest);
          }
        });

        if (matching_interests.length > 0) {
          interests_score = 70;
        } else {
          interests_score = 20; // Default baseline if student branch aligns
          if (project.suitable_branches?.some((b) => b.toLowerCase().includes(prefs.branch.toLowerCase()))) {
            interests_score = 40;
          }
        }
      }
    } else {
      interests_score = 75;
    }

    // 3. Budget Score (15%)
    let budget_score = 100;
    let budget_fit = "";
    const pCost = project.estimated_cost;
    const sBudget = prefs.budget || 5000;

    if (pCost <= sBudget) {
      budget_score = 100;
      budget_fit = `Fits within budget (Est. ₹${pCost.toLocaleString("en-IN")} vs Max ₹${sBudget.toLocaleString("en-IN")})`;
    } else {
      const ratio = pCost / sBudget;
      if (ratio <= 1.25) {
        budget_score = 65;
        budget_fit = `Slightly exceeds target budget (Est. ₹${pCost.toLocaleString("en-IN")})`;
      } else if (ratio <= 1.5) {
        budget_score = 35;
        budget_fit = `Requires extra budget (Est. ₹${pCost.toLocaleString("en-IN")})`;
      } else {
        budget_score = 0;
        budget_fit = `Significantly above target budget (Est. ₹${pCost.toLocaleString("en-IN")})`;
      }
    }

    // 4. Time/Duration Score (15%)
    let time_score = 100;
    let time_fit = "";
    const pWeeks = project.estimated_duration_weeks || parseInt(project.estimated_duration) || 6;
    const sWeeks = prefs.available_time_weeks || 8;

    if (pWeeks <= sWeeks) {
      time_score = 100;
      time_fit = `Fits timeline (${pWeeks} weeks required vs ${sWeeks} weeks available)`;
    } else {
      const ratio = pWeeks / sWeeks;
      if (ratio <= 1.3) {
        time_score = 60;
        time_fit = `Tight timeline (${pWeeks} weeks required vs ${sWeeks} weeks available)`;
      } else {
        time_score = 20;
        time_fit = `Exceeds available timeline (${pWeeks} weeks required)`;
      }
    }

    // 5. Difficulty/Experience Score (10%)
    let difficulty_score = 100;
    let difficulty_fit = "";
    const levelMap: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    const pLevel = levelMap[project.difficulty] || 2;
    const sLevel = levelMap[prefs.experience_level] || 2;

    if (pLevel === sLevel) {
      difficulty_score = 100;
      difficulty_fit = `Exact match for ${project.difficulty} experience level`;
    } else if (sLevel > pLevel) {
      difficulty_score = 85;
      difficulty_fit = `Suitable for your higher skill level (${project.difficulty} project)`;
    } else if (sLevel === 1 && pLevel === 2) {
      difficulty_score = 60;
      difficulty_fit = `Moderate challenge for beginner level (Intermediate project)`;
    } else if (sLevel === 2 && pLevel === 3) {
      difficulty_score = 65;
      difficulty_fit = `Growth opportunity (Advanced project for Intermediate student)`;
    } else {
      difficulty_score = 25;
      difficulty_fit = `High difficulty gap (${project.difficulty} project for ${prefs.experience_level} student)`;
    }

    // 6. Team Size Score (5%)
    let team_score = 100;
    const minTeam = project.min_team_size || 1;
    const maxTeam = project.max_team_size || 4;
    if (prefs.team_size >= minTeam && prefs.team_size <= maxTeam) {
      team_score = 100;
    } else {
      team_score = 60;
    }

    // Calculate Final Weighted Score (0 - 100)
    const raw_score =
      skills_score * 0.30 +
      interests_score * 0.25 +
      budget_score * 0.15 +
      time_score * 0.15 +
      difficulty_score * 0.10 +
      team_score * 0.05;

    const final_score = Math.min(100, Math.max(0, Math.round(raw_score)));

    // Generate explainable match bullet points
    const why_it_matches: string[] = [];
    if (matching_skills.length > 0) {
      why_it_matches.push(`Matches your skills: ${matching_skills.slice(0, 3).join(", ")}`);
    }
    if (matching_interests.length > 0) {
      why_it_matches.push(`Aligns with domain interest in ${project.domain}`);
    }
    if (budget_score >= 80) {
      why_it_matches.push(`Estimated cost (₹${pCost.toLocaleString("en-IN")}) fits inside your budget`);
    }
    if (time_score >= 80) {
      why_it_matches.push(`Estimated duration (${pWeeks} wks) fits your available time`);
    }
    if (difficulty_score >= 80) {
      why_it_matches.push(`Difficulty (${project.difficulty}) is aligned with your experience`);
    }

    if (why_it_matches.length === 0) {
      why_it_matches.push(`Recommended as an foundational project in ${project.domain}`);
    }

    return {
      project,
      final_score,
      breakdown: {
        skills_score,
        interests_score,
        budget_score,
        time_score,
        difficulty_score,
        team_score,
      },
      matching_skills,
      matching_interests,
      budget_fit,
      time_fit,
      difficulty_fit,
      why_it_matches,
    };
  });

  // Sort by final_score descending
  return results.sort((a, b) => b.final_score - a.final_score);
}
