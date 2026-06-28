export interface CareerInfo {
  name: string;
  description: string;
  requiredSkills: string[];
  learningPath: string[];
  suggestedProjects: string[];
  interestRelevance: string[];
  quizQuestionWeights: number[];
  salary: { min: number; max: number; currency: string };
  growthRate: string;
  marketDemand: string;
  strengths: string[];
  weaknesses: string[];
}

export const careerDataset: CareerInfo[] = [
  {
    name: 'Frontend Developer',
    description:
      'Mengembangkan antarmuka pengguna website yang responsif, interaktif, dan menarik menggunakan teknologi web modern.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    learningPath: [
      'HTML & CSS Fundamentals – Semantic HTML, Flexbox, Grid, Animasi',
      'JavaScript (ES6+) Mastery – DOM, Async/Await, Module System',
      'Responsive Design – Mobile-first, Cross-browser, Accessibility',
      'Frontend Framework (React/Vue) – Component, Hooks, State Management',
      'Build Tools & Testing – Vite, Webpack, Jest, Cypress',
      'Deployment & Performance – Vercel, Netlify, Lighthouse, SEO',
    ],
    suggestedProjects: [
      'Membangun portfolio website interaktif dengan animasi',
      'Membuat dashboard admin dengan React dan Chart.js',
      'Mengembangkan e-commerce frontend dengan filter dan keranjang',
      'Membantu komponen UI reusable dan dokumentasinya',
    ],
    interestRelevance: ['Frontend Development', 'Web Design', 'UI UX Design'],
    quizQuestionWeights: [5, 1, 1, 1, 1, 1, 3, 1, 5, 1, 1, 1, 1, 1, 3],
    salary: { min: 8000000, max: 18000000, currency: 'IDR' },
    growthRate: 'Sangat Tinggi – 25% per tahun (digital transformation)',
    marketDemand:
      'Tinggi – Hampir semua perusahaan membutuhkan frontend developer untuk platform digital mereka.',
    strengths: [
      'Hasil kerja langsung terlihat secara visual',
      'Banyak lowongan di berbagai skala perusahaan',
      'Tools dan framework terus berkembang',
      'Komunitas developer sangat besar dan aktif',
      'Bisa bekerja freelance dengan mudah',
    ],
    weaknesses: [
      'Perubahan framework sangat cepat',
      'Harus menjaga kompatibilitas antar browser',
      'Tuntutan performa dan SEO yang ketat',
      'Persaingan entry-level cukup tinggi',
      'Kurang di eksposur ke logika backend',
    ],
  },
  {
    name: 'Backend Developer',
    description:
      'Mengembangkan logika server, API, database, dan arsitektur backend yang scalable dan aman.',
    requiredSkills: ['Node.js', 'Express', 'Python', 'SQL', 'PostgreSQL', 'MongoDB', 'Git'],
    learningPath: [
      'Node.js & Express.js – Routing, Middleware, RESTful API',
      'Database Design & SQL – PostgreSQL, Indexing, Query Optimization',
      'Authentication & Authorization – JWT, OAuth2, RBAC',
      'Caching & Performance – Redis, CDN, Load Balancing',
      'Microservices & Message Queue – RabbitMQ, Kafka, gRPC',
      'Testing & Deployment – Jest, Docker, CI/CD',
    ],
    suggestedProjects: [
      'Membangun REST API untuk aplikasi to-do dengan auth',
      'Membuat sistem authentication JWT lengkap',
      'Mengembangkan CMS backend dengan role management',
      'Membangun real-time chat server dengan WebSocket',
    ],
    interestRelevance: ['Backend Development', 'Software Engineering', 'System Design'],
    quizQuestionWeights: [1, 3, 3, 2, 2, 5, 1, 5, 1, 3, 3, 5, 1, 5, 3],
    salary: { min: 10000000, max: 22000000, currency: 'IDR' },
    growthRate: 'Tinggi – 20% per tahun (ekonomi digital)',
    marketDemand:
      'Sangat Tinggi – Tulang punggung setiap aplikasi, kritis untuk scalability.',
    strengths: [
      'Logika dan arsitektur yang terstruktur',
      'Kritis untuk performa dan keamanan aplikasi',
      'Jenjang karir jelas hingga arsitek sistem',
      'Remote-friendly dengan banyak kesempatan',
      'Skill yang jarang berubah drastis',
    ],
    weaknesses: [
      'Hasil kerja tidak terlihat langsung secara visual',
      'Tanggung jawab keamanan data sangat besar',
      'Debugging bisa sangat kompleks',
      'On-call duty untuk production issue',
      'Perlu pemahaman infrastruktur juga',
    ],
  },
  {
    name: 'Full Stack Developer',
    description:
      'Mengembangkan aplikasi web secara menyeluruh dari antarmuka hingga server dan database.',
    requiredSkills: [
      'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React',
      'Node.js', 'Express', 'SQL', 'PostgreSQL', 'Git',
    ],
    learningPath: [
      'HTML, CSS, JavaScript & TypeScript – Fondasi web modern',
      'Frontend Framework (React) – Component, State Management',
      'Backend (Node.js/Express) – REST API, Middleware',
      'Database (SQL & NoSQL) – Prisma ORM, Query Optimization',
      'DevOps & Deployment – Docker, Cloud, CI/CD',
      'Full Stack Project – Integrasi frontend-backend end-to-end',
    ],
    suggestedProjects: [
      'Membangun aplikasi CRUD lengkap dengan auth',
      'Membuat platform blog dengan fitur komentar real-time',
      'Mengembangkan aplikasi manajemen tugas dengan drag-drop',
      'Membangun real-time dashboard dengan grafik interaktif',
    ],
    interestRelevance: ['Fullstack Development', 'Full Stack', 'Web Development'],
    quizQuestionWeights: [3, 3, 3, 2, 2, 3, 2, 3, 3, 3, 2, 3, 2, 3, 3],
    salary: { min: 12000000, max: 25000000, currency: 'IDR' },
    growthRate: 'Tinggi – 22% per tahun',
    marketDemand:
      'Tinggi – Startup dan perusahaan kecil lebih suka full stack developer.',
    strengths: [
      'Memahami keseluruhan sistem aplikasi',
      'Sangat fleksibel dan bisa cover banyak role',
      'Cocok untuk startup dan tim kecil',
      'Lebih mudah berkarir sebagai tech lead',
      'Dapat mengerjakan proyek secara mandiri',
    ],
    weaknesses: [
      'Sulit mendalami semua area sekaligus',
      'Beban kerja mental lebih besar',
      'Update teknologi di kedua sisi sangat banyak',
      'Bisa terjebak di "jack of all trades"',
      'Kode mungkin kurang optimal di area spesifik',
    ],
  },
  {
    name: 'Mobile Developer',
    description:
      'Mengembangkan aplikasi mobile cross-platform atau native yang responsif, cepat, dan user-friendly.',
    requiredSkills: ['JavaScript', 'TypeScript', 'React', 'Git'],
    learningPath: [
      'JavaScript/TypeScript Fundamentals – Dasar pemrograman mobile',
      'React Native / Flutter – Component, Navigation, State',
      'Mobile UI/UX Design – Material Design, HIG, Gesture',
      'API Integration – REST, GraphQL, Offline-first',
      'App Store Deployment – Google Play, App Store, CI/CD',
      'Advanced Features – Push Notification, Maps, Camera, Payment',
    ],
    suggestedProjects: [
      'Membangun aplikasi kalkulator dengan sejarah perhitungan',
      'Membuat aplikasi cuaca real-time dengan API',
      'Mengembangkan aplikasi catatan dengan cloud sync',
      'Membangun social media app sederhana dengan feed',
    ],
    interestRelevance: ['Mobile Development', 'App Development'],
    quizQuestionWeights: [3, 2, 2, 1, 1, 2, 4, 1, 3, 2, 2, 2, 3, 1, 2],
    salary: { min: 10000000, max: 22000000, currency: 'IDR' },
    growthRate: 'Tinggi – 18% per tahun (mobile-first)',
    marketDemand:
      'Tinggi – Semakin banyak bisnis mengutamakan aplikasi mobile.',
    strengths: [
      'Permintaan tinggi di pasar aplikasi mobile',
      'Hasil kerja langsung dipegang pengguna',
      'Bisa publish aplikasi sendiri ke store',
      'Tools matang (React Native, Flutter)',
      'Komunitas developer mobile sangat kuat',
    ],
    weaknesses: [
      'Approval store bisa lama dan ketat',
      'Fragmen perangkat dan OS sangat banyak',
      'Harus update dengan OS version terbaru',
      'Debugging device-specific merepotkan',
      'Persaingan dengan developer native',
    ],
  },
  {
    name: 'AI Engineer',
    description:
      'Membangun dan mengimplementasikan model AI serta sistem machine learning untuk solusi cerdas dan otomatisasi.',
    requiredSkills: ['Python', 'SQL', 'Git', 'Linux'],
    learningPath: [
      'Python & Data Science – NumPy, Pandas, Matplotlib',
      'Statistics & Probability – Distribusi, Hipotesis, Bayesian',
      'Machine Learning Algorithms – Supervised, Unsupervised, Ensemble',
      'Deep Learning & Neural Networks – TensorFlow, PyTorch, CNN, RNN',
      'NLP & Computer Vision – LLM, Transformers, YOLO, GAN',
      'MLOps & Model Deployment – Docker, FastAPI, Monitoring',
    ],
    suggestedProjects: [
      'Membangun model klasifikasi gambar dengan CNN',
      'Membuat chatbot dengan RAG dan LLM',
      'Mengembangkan sistem rekomendasi konten',
      'Membangun model prediksi time series untuk saham',
    ],
    interestRelevance: ['AI', 'Artificial Intelligence', 'Machine Learning'],
    quizQuestionWeights: [1, 5, 5, 1, 3, 3, 2, 1, 1, 1, 5, 3, 1, 1, 1],
    salary: { min: 15000000, max: 35000000, currency: 'IDR' },
    growthRate: 'Sangat Tinggi – 35% per tahun (AI boom)',
    marketDemand:
      'Sangat Tinggi – Revolusi AI membuka banyak posisi baru di berbagai industri.',
    strengths: [
      'Bidang paling panas dengan pertumbuhan eksponensial',
      'Gaji tertinggi di industri teknologi',
      'Dampak pekerjaan sangat luas dan strategis',
      'Inovasi dan riset terus berkembang',
      'Remote-friendly dan banyak riset grant',
    ],
    weaknesses: [
      'Butuh fundamental matematika yang kuat',
      'Data berkualitas sulit didapatkan',
      'Komputasi mahal (GPU/TPU)',
      'Model AI cepat usang',
      'Etika dan bias AI menjadi tantangan',
    ],
  },
  {
    name: 'Data Scientist',
    description:
      'Menganalisis data besar untuk menemukan insight, pola, dan mendukung pengambilan keputusan bisnis berbasis data.',
    requiredSkills: ['Python', 'SQL', 'Git', 'Linux'],
    learningPath: [
      'Python & Data Analysis – Pandas, NumPy, ETL Pipeline',
      'Statistics & Mathematics – Hipotesis, Regresi, Bayesian',
      'Machine Learning – Scikit-learn, Feature Engineering',
      'Data Visualization – Tableau, Power BI, Matplotlib, Seaborn',
      'Big Data Technologies – Spark, Hadoop, Airflow',
      'Business Intelligence & Storytelling – Insight, Dashboard',
    ],
    suggestedProjects: [
      'Menganalisis dataset publik dan membuat dashboard visualisasi',
      'Membangun model prediksi churn pelanggan',
      'Membuat pipeline ETL otomatis dari API ke database',
      'Mengembangkan A/B testing framework untuk bisnis',
    ],
    interestRelevance: ['Data Science', 'Data Analysis', 'Data Analytics', 'Statistics'],
    quizQuestionWeights: [1, 4, 5, 1, 2, 3, 2, 1, 1, 1, 5, 3, 1, 1, 1],
    salary: { min: 12000000, max: 30000000, currency: 'IDR' },
    growthRate: 'Sangat Tinggi – 30% per tahun (data-driven)',
    marketDemand:
      'Tinggi – Perusahaan berlomba-lomba memanfaatkan data untuk keputusan bisnis.',
    strengths: [
      'Keputusan bisnis berbada data sangat dihargai',
      'Bisa bekerja di berbagai industri',
      'Jenjang karir hingga Chief Data Officer',
      'Skill yang sangat transferable',
      'Komunitas data science sangat aktif',
    ],
    weaknesses: [
      'Sering salah kaprah dengan AI Engineer',
      'Data kotor dan tidak terstruktur menyita waktu',
      'Harus paham bisnis juga',
      'Tools big data kompleks',
      'Interpretasi hasil bisa subjektif',
    ],
  },
  {
    name: 'Cyber Security Analyst',
    description:
      'Melindungi sistem, jaringan, dan data organisasi dari ancaman siber serta merespon insiden keamanan.',
    requiredSkills: ['Linux', 'Git', 'Python', 'SQL'],
    learningPath: [
      'Network Fundamentals – TCP/IP, DNS, Firewall, VPN',
      'Operating System Security – Linux Hardening, Windows Security',
      'Ethical Hacking & Penetration Testing – Kali Linux, Metasploit',
      'Cryptography & Security Protocols – SSL/TLS, PKI, Hashing',
      'Security Compliance & Standards – ISO 27001, PCI DSS, GDPR',
      'Incident Response & Forensics – SIEM, SOC, Digital Forensics',
    ],
    suggestedProjects: [
      'Membangun network monitoring tool dengan alert',
      'Membuat sistem deteksi intrusi berbasis log',
      'Mengembangkan security audit tool otomatis',
      'Membuat CTF challenge platform untuk training',
    ],
    interestRelevance: ['Cyber Security', 'Network Security'],
    quizQuestionWeights: [1, 1, 1, 5, 5, 4, 1, 3, 1, 1, 1, 3, 5, 4, 4],
    salary: { min: 10000000, max: 28000000, currency: 'IDR' },
    growthRate: 'Sangat Tinggi – 28% per tahun (ancaman siber meningkat)',
    marketDemand:
      'Sangat Tinggi – Kebutuhan keamanan siber di semua sektor meningkat drastis.',
    strengths: [
      'Krisis keamanan siber membuat profesi ini kritis',
      'Gaji kompetitif dengan pengalaman',
      'Sertifikasi diakui secara global',
      'Kerja defensive dan offensive equally menarik',
      'Lowongan lebih banyak dari kandidat',
    ],
    weaknesses: [
      'Stress tinggi karena tanggung jawab keamanan',
      'Harus selalu update dengan ancaman baru',
      'Sertifikasi mahal dan harus diperbarui',
      'On-call 24/7 untuk insiden',
      'Bekerja di luar jam kerja sering dibutuhkan',
    ],
  },
  {
    name: 'Cloud Engineer',
    description:
      'Merancang, mengimplementasikan, dan mengelola infrastruktur cloud yang scalable, handal, dan cost-effective.',
    requiredSkills: ['Linux', 'Docker', 'Git'],
    learningPath: [
      'Linux Administration – Command line, Shell Scripting, Systemd',
      'Docker & Containerization – Image, Compose, Registry',
      'Cloud Providers (AWS/Azure/GCP) – EC2, S3, Lambda, VPC',
      'Infrastructure as Code – Terraform, CloudFormation, Ansible',
      'Kubernetes & Orchestration – Pod, Service, Ingress, Helm',
      'Monitoring & Cost Optimization – Prometheus, Grafana, FinOps',
    ],
    suggestedProjects: [
      'Mendeploy aplikasi monolith ke Docker dengan CI/CD',
      'Membangun infrastruktur AWS dengan Terraform',
      'Membuat auto-scaling group untuk web app',
      'Mengembangkan monitoring stack dengan Prometheus dan Grafana',
    ],
    interestRelevance: ['Cloud Computing', 'DevOps', 'Infrastructure'],
    quizQuestionWeights: [1, 1, 1, 3, 4, 5, 5, 4, 1, 1, 1, 1, 4, 5, 5],
    salary: { min: 12000000, max: 30000000, currency: 'IDR' },
    growthRate: 'Sangat Tinggi – 28% per tahun (cloud adoption)',
    marketDemand:
      'Sangat Tinggi – Semua perusahaan migrasi ke cloud, kebutuhan ahli cloud sangat besar.',
    strengths: [
      'Cloud adoption di Indonesia masih tumbuh pesat',
      'Sertifikasi cloud sangat berharga di pasar',
      'Remote-friendly dan banyak kesempatan global',
      'Infrastruktur cloud terus berkembang',
      'Peran strategis dalam transformasi digital',
    ],
    weaknesses: [
      'Biaya cloud bisa membengkak jika tidak dioptimasi',
      'Setiap cloud provider punya layanan berbeda',
      'Sertifikasi perlu diperbarui berkala',
      'Incident response bisa sangat menegangkan',
      'Dokumentasi layanan cloud sangat luas',
    ],
  },
  {
    name: 'DevOps Engineer',
    description:
      'Menjembatani pengembangan dan operasi dengan otomatisasi, CI/CD, dan infrastruktur yang efisien.',
    requiredSkills: ['Linux', 'Docker', 'Git'],
    learningPath: [
      'Linux & Scripting – Bash, Python, System Administration',
      'Version Control & Collaboration – Git, Branching Strategy, Code Review',
      'CI/CD Pipeline – GitHub Actions, Jenkins, GitLab CI',
      'Container & Orchestration – Docker, Kubernetes, Helm',
      'Infrastructure as Code – Terraform, Ansible, Pulumi',
      'Monitoring & Logging – Prometheus, ELK Stack, Datadog',
    ],
    suggestedProjects: [
      'Membangun CI/CD pipeline untuk aplikasi full stack',
      'Membuat infrastructure automation dengan Ansible',
      'Mengimplementasikan blue-green deployment',
      'Membangun centralized logging dengan ELK Stack',
    ],
    interestRelevance: ['DevOps', 'Cloud Computing', 'Infrastructure'],
    quizQuestionWeights: [1, 1, 1, 3, 5, 4, 5, 3, 1, 1, 1, 1, 5, 5, 4],
    salary: { min: 12000000, max: 28000000, currency: 'IDR' },
    growthRate: 'Sangat Tinggi – 25% per tahun (agile & automation)',
    marketDemand:
      'Tinggi – Perusahaan mengadopsi DevOps untuk mempercepat rilis dan meningkatkan kualitas.',
    strengths: [
      'Otomatisasi membuat pekerjaan lebih efisien',
      'Peran kunci dalam siklus pengembangan',
      'Tools open source berkembang pesat',
      'Budaya DevOps diadopsi di mana-mana',
      'Skill infrastruktur + coding = langka',
    ],
    weaknesses: [
      'On-call duty untuk production incident',
      'Tools berganti sangat cepat',
      'Harus paham development dan operations',
      'Debugging distributed system sulit',
      'Burnout karena tekanan availability',
    ],
  },
  {
    name: 'UI UX Designer',
    description:
      'Merancang antarmuka dan pengalaman pengguna yang intuitif, estetis, mudah digunakan, dan memenuhi kebutuhan pengguna.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript'],
    learningPath: [
      'Design Thinking & User Research – Empathy, Define, Ideate',
      'Visual Design Principles – Typography, Color Theory, Layout',
      'Figma & Design Tools – Component, Auto Layout, Prototype',
      'Prototyping & Wireframing – Lo-fi, Hi-fi, Interactive',
      'Usability Testing – User Testing, A/B Testing, Heatmap',
      'Design Systems & Accessibility – Atomic Design, WCAG, Inclusive Design',
    ],
    suggestedProjects: [
      'Mendesain ulang tampilan aplikasi existing dengan Figma',
      'Membuat design system lengkap dengan komponen reusable',
      'Mengembangkan prototipe interaktif aplikasi mobile',
      'Membuat case study UX research dari awal hingga akhir',
    ],
    interestRelevance: ['UI UX Design', 'Web Design', 'Product Design'],
    quizQuestionWeights: [5, 1, 1, 1, 1, 1, 3, 1, 5, 1, 1, 1, 1, 1, 4],
    salary: { min: 8000000, max: 18000000, currency: 'IDR' },
    growthRate: 'Tinggi – 20% per tahun (user-centric)',
    marketDemand:
      'Tinggi – Produk digital membutuhkan desain yang baik untuk bersaing di pasar.',
    strengths: [
      'Kreativitas diekspresikan langsung dalam karya',
      'User research memberikan dampak nyata',
      'Pekerjaan bervariasi tidak monoton',
      'Kolaborasi erat dengan tim produk',
      'Portofolio visual sangat powerful',
    ],
    weaknesses: [
      'Subjektif – selera orang berbeda-beda',
      'Sering diremehkan dibanding developer',
      'Harus presentasi dan mempertahankan desain',
      'Tools desain berbayar cukup mahal',
      'Persaingan di entry-level sangat ketat',
    ],
  },
];
