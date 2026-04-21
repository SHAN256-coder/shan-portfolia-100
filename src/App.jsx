import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ExternalLink, Mail, Phone, Cpu, Briefcase, GraduationCap, Award, Wrench, Zap, Globe, Send, MapPin, Clock, MessageCircle, Sparkles, ArrowDown, Star, Code, Palette, Bot } from 'lucide-react'
import './App.css'

const portfolioData = {
  name: "Shanavas Sulaiman",
  initials: "SS",
  title: "Electronics & Communication Engineer",
  tagline: "Innovating at the intersection of hardware & software",
  contact: {
    email: "shandace18@gmail.com",
    phone: "+91 8148774546",
    location: "Chennai, India",
    linkedin: "https://www.linkedin.com/in/s-shanavas-b51336322",
    github: "https://github.com/shanavas",
    twitter: "@shanavas_s"
  },
  careerObjective: "To build a successful career in Electronics and Communication Engineering by applying my technical knowledge, creative problem solving skills, and passion for innovation.",
  experience: {
    title: "Electronics Engineering Internship",
    company: "Infinion, Virtual",
    period: "Jun 2025 - Jul 2025",
    description: "Designs, develops, and tests electronic systems, components, and devices. Responsible for creating circuit designs, building prototypes, and ensuring products meet quality and safety standards."
  },
  education: {
    degree: "BE, Electronics and Communication",
    institution: "Dhaanish Ahmed College of Engineering",
    period: "2024 - 2028"
  },
  certifications: [
    { name: "AutoCAD", issuer: "Bim Cadd Technical Solution", period: "Jul 2025" },
    { name: "Embedded Systems", issuer: "IEEE", period: "2025" }
  ],
  projects: [
    {
      name: "Dhaanish Transport Management System (DTMS)",
      period: "Mar 2026 - Present",
      description: "A smart digital platform to modernize college transportation with real-time bus tracking, route management, and seamless communication between students, drivers, and administration.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "GPS Tracking", "Socket.io"],
      github: "#",
      live: "#"
    },
    {
      name: "River Waste Collector Robot",
      period: "Jul 2022 - Oct 2022",
      description: "Bluetooth-controlled mini robot for river waste collection with motorized elevator mechanism, buoyant chassis, and mobile app control for eco-friendly water cleaning.",
      tech: ["Arduino/ESP32", "Bluetooth", "DC Motors", "Mobile App"],
      github: "#",
      live: "#"
    },
    {
      name: "Smart Energy Meter",
      period: "Jan 2024 - Mar 2024",
      description: "IoT-based energy monitoring system with real-time power consumption tracking, automated billing, and anomaly detection for residential and commercial use.",
      tech: ["ESP32", "IoT", "MongoDB", "React Dashboard"],
      github: "#",
      live: "#"
    },
    {
      name: "AI-Powered College Assistant",
      period: "Nov 2025 - Present",
      description: "Intelligent chatbot for college automation handling student queries, timetable management, attendance tracking, and event notifications using natural language processing.",
      tech: ["Claude API", "React", "Node.js", "PostgreSQL"],
      github: "#",
      live: "#"
    },
    {
      name: "Automated Parking System",
      period: "Aug 2023 - Nov 2023",
      description: "Computer vision-based parking management solution with real-time slot detection, OCR for vehicle identification, and mobile payment integration.",
      tech: ["OpenCV", "Python", "Flask", "MySQL"],
      github: "#",
      live: "#"
    }
  ],
  skills: {
    technical: ["Digital Electronics", "C Programming", "C++ Programming", "Frontend Development", "MongoDB", "PostgreSQL", "Microsoft Visual Studio", "Advanced Excel"],
    creative: ["Social Media Marketing", "AI Video Generation", "AI Image Generation", "Canva", "Figma"],
    emerging: ["Claude (AI)", "Perplexity (AI)", "ChatGPT", "Gemini"]
  },
  services: [
    { icon: <Code size={28} />, title: "Web Development", description: "Full-stack MERN applications with modern UI/UX" },
    { icon: <Bot size={28} />, title: "AI Integration", description: "Custom AI solutions using Claude, GPT, and computer vision" },
    { icon: <Palette size={28} />, title: "Design & Media", description: "Creative posters, presentations, and video content" },
    { icon: <Cpu size={28} />, title: "Electronics", description: "Circuit design, PCB layouts, and embedded systems" }
  ],
  achievements: [
    { title: "2nd Prize - Tamil Nadu District Level", event: "River Waste Cleaner", awardedBy: "ISRO Scientist", description: "Awarded for innovation in environmental technology at Peri Engineering College." },
    { title: "Smart India Hackathon (SIH) 2025 Finalist", event: "National Level Competition", description: "Finalist in India's largest hackathon for innovative project development." },
    { title: "Best Innovation Award", event: "College Tech Symposium", awardedBy: "Principal", description: "Recognized for outstanding project presentation and innovation." }
  ],
  testimonials: [
    { name: "Dr. Ramesh Kumar", role: "Professor & HOD", institution: "Dhaanish Ahmed College", text: "Shanavas has shown exceptional problem-solving skills and creativity in electronics projects." },
    { name: "Priya Sharma", role: "Team Lead", institution: "Infinion", text: "A dedicated intern with strong technical foundation and excellent learning attitude." }
  ]
}

// Apple-style text reveal animation
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
}

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
}

// Word reveal for hero
const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
}

function AnimatedText({ text, className, delay = 0 }) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      custom={delay}
      variants={textVariants}
    >
      {text}
    </motion.span>
  )
}

function LetterByLetter({ text, className }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial="hidden"
          animate="visible"
          custom={i}
          variants={letterVariants}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['About', 'Experience', 'Skills', 'Projects', 'Achievements', 'Contact']

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="nav-logo-box"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="logo-text">{portfolioData.initials}</span>
      </motion.div>
      <div className="nav-links-desktop">
        {navItems.map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="nav-link"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            whileHover={{ color: '#FFD700' }}
          >
            {item}
          </motion.a>
        ))}
      </div>
      <motion.button
        className="menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X /> : <Menu />}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="mobile-link"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 300])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.8])

  const titleWords = portfolioData.name.split(' ')
  const subtitleWords = portfolioData.title.split(' ')

  return (
    <section className="hero">
      <div className="hero-bg-effects">
        <div className="glow-orb orb1"></div>
        <div className="glow-orb orb2"></div>
        <div className="glow-orb orb3"></div>
        <div className="grid-pattern"></div>
        <div className="noise-overlay"></div>
      </div>
      <motion.div className="hero-content" style={{ y, opacity, scale }}>
        <motion.div
          className="hero-badge"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles size={16} />
          <span>Available for Opportunities</span>
        </motion.div>

        <h1 className="hero-title">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="word-wrapper"
              initial="hidden"
              animate="visible"
              custom={i}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="hero-subtitle"
          initial="hidden"
          animate="visible"
        >
          {subtitleWords.map((word, i) => (
            <motion.span
              key={i}
              className="word-wrapper"
              custom={i + titleWords.length}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="tagline-text">{portfolioData.tagline}</span>
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.a
            href="#projects"
            className="btn btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
            <ArrowDown size={18} />
          </motion.a>
          <motion.a
            href="#contact"
            className="btn btn-secondary"
            whileHover={{ scale: 1.05, borderColor: '#FFD700' }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
            <Send size={18} />
          </motion.a>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function SectionWrapper({ children, id, title, subtitle }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section id={id} className="section" ref={ref}>
      <motion.div
        className="section-content"
        style={{ y, opacity }}
      >
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="title-accent">{title.charAt(0)}</span>
            {title.slice(1)}
          </h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </motion.div>
        {children}
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <SectionWrapper id="about" title="About Me" subtitle="Passionate about creating innovative solutions">
      <div className="about-grid">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="about-description">{portfolioData.careerObjective}</p>

          <motion.div
            className="about-cards"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {portfolioData.services.map((service, i) => (
              <motion.div
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -10, borderColor: '#FFD700' }}
              >
                <div className="service-icon">{service.icon}</div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="about-stats">
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="stat-number">5+</span>
              <span className="stat-label">Projects Completed</span>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="stat-number">15+</span>
              <span className="stat-label">Skills Mastered</span>
            </motion.div>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="stat-number">3+</span>
              <span className="stat-label">Awards Won</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="about-visual"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="code-block">
            <div className="code-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="code-title">profile.json</span>
            </div>
            <pre className="code-content">
              <code>
                <span className="bracket">{'{'}</span><br />
                <span className="tab"></span><span className="key">"name"</span>: <span className="string">"Shanavas Sulaiman"</span>,<br />
                <span className="tab"></span><span className="key">"role"</span>: <span className="string">"ECE Engineer"</span>,<br />
                <span className="tab"></span><span className="key">"passion"</span>: <span className="string">"Innovation"</span>,<br />
                <span className="tab"></span><span className="key">"skills"</span>: [<br />
                <span className="tab"></span><span className="tab"></span><span className="string">"Electronics"</span>,<br />
                <span className="tab"></span><span className="tab"></span><span className="string">"MERN Stack"</span>,<br />
                <span className="tab"></span><span className="tab"></span><span className="string">"AI/ML"</span>,<br />
                <span className="tab"></span><span className="tab"></span><span className="string">"Design"</span><br />
                <span className="tab"></span>],<br />
                <span className="tab"></span><span className="key">"status"</span>: <span className="string">"Open to Work"</span><br />
                <span className="bracket">{'}'}</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

function Experience() {
  return (
    <SectionWrapper id="experience" title="Experience" subtitle="Professional journey in electronics & development">
      <motion.div
        className="experience-card"
        initial={{ opacity: 0, y: 100, rotateX: 20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="timeline-dot"></div>
        <div className="experience-content">
          <div className="experience-header">
            <motion.div
              className="experience-icon"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Briefcase size={28} />
            </motion.div>
            <div>
              <h3 className="experience-title">{portfolioData.experience.title}</h3>
              <p className="experience-company">{portfolioData.experience.company}</p>
            </div>
          </div>
          <motion.div
            className="experience-period"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Clock size={14} />
            <span>{portfolioData.experience.period}</span>
          </motion.div>
          <p className="experience-description">{portfolioData.experience.description}</p>
        </div>
      </motion.div>

      <motion.div
        className="certifications-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h4 className="cert-title">Certifications</h4>
        <div className="cert-grid">
          {portfolioData.certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              className="cert-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: '#FFD700' }}
            >
              <Award size={20} className="cert-icon" />
              <div>
                <h5>{cert.name}</h5>
                <p>{cert.issuer}</p>
                <span>{cert.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

function Skills() {
  return (
    <SectionWrapper id="skills" title="Skills" subtitle="Technologies and tools I work with">
      <div className="skills-container">
        {Object.entries(portfolioData.skills).map(([category, skills], catIndex) => (
          <motion.div
            key={category}
            className="skill-category"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.2, duration: 0.8 }}
          >
            <div className="skill-category-header">
              {category === 'technical' && <Cpu size={28} />}
              {category === 'creative' && <Palette size={28} />}
              {category === 'emerging' && <Bot size={28} />}
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            </div>
            <div className="skill-tags">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.2 + i * 0.05 }}
                  whileHover={{
                    scale: 1.15,
                    rotate: [-3, 3],
                    boxShadow: '0 0 25px rgba(255, 215, 0, 0.4)'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

function Projects() {
  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Innovative solutions I've built">
      <div className="projects-grid">
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={project.name}
            className="project-card"
            initial={{ opacity: 0, y: 100, rotateY: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.8 }}
            whileHover={{
              y: -15,
              rotateY: 0,
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="project-header">
              <h3 className="project-title">{project.name}</h3>
              <span className="project-period">
                <Clock size={14} />
                {project.period}
              </span>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
            <div className="project-links">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Code size={16} />
                <span>Source</span>
              </motion.a>
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

function Achievements() {
  return (
    <SectionWrapper id="achievements" title="Achievements" subtitle="Recognition and accomplishments">
      <div className="achievements-container">
        <motion.div
          className="achievements-list"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {portfolioData.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="achievement-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ x: 20, borderColor: '#FFD700' }}
            >
              <motion.div
                className="achievement-icon"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star size={28} />
              </motion.div>
              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p className="achievement-event">{achievement.event}</p>
                {achievement.awardedBy && (
                  <p className="achievement-awarded">Awarded by {achievement.awardedBy}</p>
                )}
                <p className="achievement-description">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="testimonials"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h4>What People Say</h4>
          {portfolioData.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.15 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <span className="author-name">{testimonial.name}</span>
                  <span className="author-role">{testimonial.role}</span>
                  <span className="author-institution">{testimonial.institution}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

function Education() {
  return (
    <SectionWrapper id="education" title="Education" subtitle="Academic background">
      <motion.div
        className="education-card"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          className="education-icon"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <GraduationCap size={40} />
        </motion.div>
        <div className="education-content">
          <h3>{portfolioData.education.degree}</h3>
          <p className="education-institution">{portfolioData.education.institution}</p>
          <div className="education-details">
            <span className="education-period">
              <Clock size={16} />
              {portfolioData.education.period}
            </span>
            <span className="education-location">
              <MapPin size={16} />
              Chennai, India
            </span>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <SectionWrapper id="contact" title="Contact" subtitle="Let's build something amazing together">
      <div className="contact-container">
        <motion.div
          className="contact-main"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-intro">
            <h3>Get in Touch</h3>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of something incredible.</p>
          </div>

          <div className="contact-methods">
            <motion.a
              href={`mailto:${portfolioData.contact.email}`}
              className="contact-method"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ x: 10, borderColor: '#FFD700' }}
            >
              <div className="method-icon">
                <Mail size={24} />
              </div>
              <div className="method-info">
                <span className="method-label">Email</span>
                <span className="method-value">{portfolioData.contact.email}</span>
              </div>
            </motion.a>

            <motion.a
              href={`tel:${portfolioData.contact.phone}`}
              className="contact-method"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: 10, borderColor: '#FFD700' }}
            >
              <div className="method-icon">
                <Phone size={24} />
              </div>
              <div className="method-info">
                <span className="method-label">Phone</span>
                <span className="method-value">{portfolioData.contact.phone}</span>
              </div>
            </motion.a>

            <motion.a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-method"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ x: 10, borderColor: '#FFD700' }}
            >
              <div className="method-icon">
                <Globe size={24} />
              </div>
              <div className="method-info">
                <span className="method-label">LinkedIn</span>
                <span className="method-value">s-shanavas-b51336322</span>
              </div>
            </motion.a>

            <motion.div
              className="contact-method"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ x: 10, borderColor: '#FFD700' }}
            >
              <div className="method-icon">
                <MapPin size={24} />
              </div>
              <div className="method-info">
                <span className="method-label">Location</span>
                <span className="method-value">{portfolioData.contact.location}</span>
              </div>
            </motion.div>
          </div>

          <div className="social-links">
            <h4>Connect With Me</h4>
            <div className="social-icons">
              <motion.a
                href={portfolioData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#FFD700' }}
                whileTap={{ scale: 0.9 }}
              >
                <Globe size={24} />
              </motion.a>
              <motion.a
                href={`mailto:${portfolioData.contact.email}`}
                whileHover={{ scale: 1.2, color: '#FFD700' }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={24} />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#FFD700' }}
                whileTap={{ scale: 0.9 }}
              >
                <Code size={24} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, color: '#FFD700' }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageCircle size={24} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="contact-form-wrapper">
            <div className="form-header">
              <h4>Send a Message</h4>
              <p>I'll get back to you within 24 hours</p>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Your Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={18} />
                    <span>Send Message</span>
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="success-message"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <div className="success-icon">
                    <Send size={40} />
                  </div>
                  <h4>Message Sent!</h4>
                  <p>Thank you for reaching out. I'll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="availability-badge">
            <div className="pulse"></div>
            <span>Available for freelance projects</span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-logo-box">
          <span className="logo-text">{portfolioData.initials}</span>
        </div>
        <p className="footer-text">Designed & Built by {portfolioData.name}</p>
        <p className="footer-tagline">Turning ideas into reality, one line of code at a time.</p>
        <p className="footer-copyright">© 2026 All Rights Reserved | Made with passion</p>
      </motion.div>
    </footer>
  )
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
