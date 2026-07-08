export const skills = [
  {
    category: "Languages",
    items: ["Java", "JavaScript", "TypeScript", "C++", "Python", "SQL"]
  },
  {
    category: "Frontend",
    items: ["React", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"]
  },
  {
    category: "Backend & Database",
    items: ["Node.js", "Spring Boot", "Flask", "MySQL", "Firebase", "REST APIs"]
  },
  {
    category: "Tools & Cloud",
    items: ["Git/GitHub", "Render", "VS Code", "IntelliJ IDEA", "Google Cloud", "Vercel", "LLM APIs"]
  }
]

To add these images as low-transparency background banners, you will need to update your data file to include the new image paths and modify the Experience component to render them as background layers behind your text.

First, ensure you move the images (awsback.jpeg, gssocback.png, mpvm.jpg, mujback.jpg) into your public/photos/ directory.

1. Update src/data/portfolioData.js
Add the banner property to your education and experience arrays so the component knows which image belongs to which card.

JavaScript
// src/data/portfolioData.js

export const education = [
  {
    title: 'Manipal University Jaipur',
    location: 'Jaipur, Rajasthan',
    desc: 'Bachelor of Technology in Computer Science Engineering (2025 - 2029)',
    image: '/photos/manipallogo.png',
    banner: '/photos/mujback.jpg', // Added Banner
  },
  {
    title: 'Maharshi Patanjali Vidya Mandir',
    location: 'Prayagraj, Uttar Pradesh',
    desc: 'Intermediate Education (2018 - 2025)',
    image: '/photos/mpvmlogo.png',
    banner: '/photos/mpvm.jpg', // Added Banner
  },
]

export const experience = [
  {
    title: 'GirlScript Summer of Code 2026',
    role: 'Open Source Contributor',
    image: '/photos/gssoc.png',
    banner: '/photos/gssocback.png', // Added Banner
  },
  {
    title: 'AWS Cloud Clubs MUJ',
    role: 'Technical Team Member',
    image: '/photos/awstech.png',
    banner: '/photos/awsback.jpeg', // Added Banner
  },
]

export const projects = [
  {
    title: 'Manipal UniNav',
    image: '/photos/uninav.png',
    link: 'https://manipalmap.vercel.app',
    desc: 'Interactive university navigation platform for Manipal University Jaipur with smart route discovery and location assistance.',
    stack: ['React', 'Maps', 'JavaScript'],
  },
  {
    title: 'Veritas',
    image: '/photos/s4.png',
    link: 'https://veritas-healthbot.vercel.app/',
    desc: 'AI-powered clinical chatbot designed to assist users before professional medical consultation.',
    stack: ['AI', 'React', 'Healthcare'],
  },
  {
    title: 'Verdian',
    image: '/photos/vx.png',
    link: 'https://verdian-wastesystem.vercel.app/',
    desc: 'Smart waste management system focused on sustainability, tracking, and optimized waste collection.',
    stack: ['React', 'Sustainability', 'Dashboard'],
  },
  {
    title: 'Personal Portfolio',
    image: '/photos/s3.png',
    link: 'https://anmolsrivastava073.github.io/',
    desc: 'A modern developer portfolio showcasing my projects, technical skills, certifications, experience, and achievements through an interactive, responsive interface with smooth animations and optimized performance.',
    stack: ['React', 'Tailwind CSS', 'Vite'],
  },
  
]
