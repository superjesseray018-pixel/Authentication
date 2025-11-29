import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import {
  Shield,
  Lock,
  Terminal,
  Network,
  FileSearch,
  AlertTriangle,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Brain,
  Code,
} from "lucide-react"
import Link from "next/link"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

export default async function HomePage() {
  // Check if user is admin
  const user = await currentUser()
  const isAdmin = user?.emailAddresses?.[0]?.emailAddress === 'superjesseray018@gmail.com'

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Shield className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
              <span className="text-lg font-semibold text-foreground">JRL</span>
            </Link>

            {/* Navigation Links & Auth */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-6">
              {/* Nav Links */}
              <Link
                href="#about"
                className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                About
              </Link>
              <Link
                href="#experience"
                className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                Experience
              </Link>
              <Link
                href="#projects"
                className="hidden lg:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                Projects
              </Link>
              
              {/* Admin-only links */}
              {isAdmin && (
                <>
                  <Link
                    href="/security-plan"
                    className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
                  >
                    Security
                  </Link>
                  <Link
                    href="/testing"
                    className="hidden lg:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
                  >
                    Testing
                  </Link>
                  <Link
                    href="/monitor"
                    className="hidden lg:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
                  >
                    Monitor
                  </Link>
                </>
              )}
              
              <Link
                href="#contact"
                className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-accent"
              >
                Contact Me
              </Link>

              {/* Theme Toggle */}
              <div className="px-2">
                <ThemeToggle />
              </div>

              {/* Auth Buttons */}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Sign in
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:via-transparent dark:to-secondary/10" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-primary font-mono">Hi, my name is</p>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">Jesse Ray S. Lasam</h1>
                <h2 className="text-2xl lg:text-4xl font-bold text-muted-foreground text-balance">
                  IT Student | AI Enthusiast | Cybersecurity Focused | AI Protector Workshop Intern
                </h2>
              </div>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                3rd year Bachelor of Science in Information Technology student at St. Paul University Philippines with a
                major in Artificial Intelligence. Passionate about cybersecurity, ethical hacking, and building
                intelligent secure systems. Currently exploring the intersection of AI and cybersecurity.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <Link href="#contact">Get In Touch</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#projects">View My Work</Link>
                </Button>
              </div>
            </div>
            
            {/* Profile Image Circle */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl ring-2 ring-primary/10">
                <Image
                  src="/images/profile.jpg"
                  alt="Jesse Ray S. Lasam"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">About Me</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm Jesse, a 3rd year Information Technology student at{" "}
                  <span className="text-primary">St. Paul University Philippines</span> with a major in Artificial
                  Intelligence. I'm fascinated by the convergence of AI and cybersecurity, and I'm actively developing
                  skills in both domains.
                </p>
                <p>
                  My academic journey has equipped me with solid foundations in programming, networks, and security
                  fundamentals. I'm particularly interested in how AI can be leveraged for threat detection,
                  vulnerability assessment, and building more intelligent security systems.
                </p>
                <p>
                  Beyond the classroom, I work on personal projects combining AI/ML with security concepts, contribute
                  to open-source initiatives, and stay updated with the latest developments in both cybersecurity and
                  artificial intelligence.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Skills & Technologies</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Python",
                    "JavaScript",
                    "SQL",
                    "Machine Learning",
                    "Network Basics",
                    "Linux",
                    "Git",
                    "REST APIs",
                    "Data Analysis",
                    "Cybersecurity Fundamentals",
                  ].map((tech) => (
                    <div key={tech} className="flex items-center space-x-2">
                      <Code className="h-3 w-3 text-primary" />
                      <span className="text-sm text-muted-foreground font-mono">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">Achievements & Recognition</h3>
                <div className="space-y-4">
                  {[
                    { name: "Dean's List Scholar", org: "St. Paul University Philippines", year: "2024" },
                    { name: "Python Fundamentals Certification", org: "Coursera", year: "2023" },
                    { name: "Google Cloud Skills Badge", org: "Google Cloud", year: "2024" },
                    {
                      name: "Active in Security Clubs",
                      org: "SPUP IT Department",
                      year: "2023 - Present",
                    },
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                      <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.org} • {achievement.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">Academic & Project Experience</h2>
          <div className="space-y-12">
            {[
              {
                title: "AI-Powered Security Analysis",
                company: "Capstone Project (In Progress)",
                period: "2024 - Present",
                description:
                  "Developing an intelligent system for network intrusion detection using machine learning. Combines Python, TensorFlow, and network analysis concepts learned in cybersecurity courses.",
                achievements: [
                  "Implemented ML model with 85%+ accuracy for anomaly detection",
                  "Built network packet analysis module using Python libraries",
                  "Created dashboard for real-time threat visualization",
                ],
              },
              {
                title: "Web Application Security Research",
                company: "Cybersecurity Course Project",
                period: "2024",
                description:
                  "Comprehensive study and demonstration of OWASP Top 10 vulnerabilities. Built vulnerable and secure versions of web applications for educational purposes.",
                achievements: [
                  "Created proof-of-concept applications demonstrating SQL injection, XSS, and CSRF attacks",
                  "Implemented security fixes and best practices",
                  "Prepared detailed technical documentation and remediation strategies",
                ],
              },
              {
                title: "Network Protocol Analysis",
                company: "Networking Course Project",
                period: "2023",
                description:
                  "Deep dive into network protocols and packet analysis using Wireshark. Learned fundamentals of network security and traffic monitoring.",
                achievements: [
                  "Analyzed real network traffic and identified protocol patterns",
                  "Created visualizations of network communication flows",
                  "Documented findings in technical reports",
                ],
              },
            ].map((job, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <p className="text-primary">{job.company}</p>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {job.period}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Terminal className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Brain,
                title: "Intrusion Detection System (ML)",
                description:
                  "Machine learning model for network intrusion detection. Uses TensorFlow to classify network traffic patterns and identify potential security threats.",
                tech: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
                link: "#",
              },
              {
                icon: Lock,
                title: "Password Security Analyzer",
                description:
                  "Educational tool demonstrating password strength evaluation. Checks entropy, common patterns, and dictionary attacks with recommendations for improvement.",
                tech: ["Python", "FastAPI", "React", "Regular Expressions"],
                link: "#",
              },
              {
                icon: Network,
                title: "Network Packet Analyzer",
                description:
                  "Network traffic analysis tool built with Python. Captures and analyzes packets, identifies protocols, and provides insights into network communication patterns.",
                tech: ["Python", "Scapy", "Wireshark", "Socket Programming"],
                link: "#",
              },
              {
                icon: FileSearch,
                title: "Web Vulnerability Scanner",
                description:
                  "Educational web security scanner demonstrating vulnerability detection. Identifies common web application security issues and provides remediation guidance.",
                tech: ["Python", "BeautifulSoup", "Requests", "OWASP"],
                link: "#",
              },
              {
                icon: Terminal,
                title: "System Log Analyzer",
                description:
                  "Analyzes system and application logs to identify suspicious patterns and potential security incidents. Demonstrates log analysis and anomaly detection concepts.",
                tech: ["Python", "Regex", "Data Analysis", "Pandas"],
                link: "#",
              },
              {
                icon: AlertTriangle,
                title: "Security Awareness Platform",
                description:
                  "Interactive educational platform for learning cybersecurity concepts. Features quizzes, scenarios, and practical exercises for security awareness training.",
                tech: ["React", "Node.js", "MongoDB", "Express"],
                link: "#",
              },
            ].map((project, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all group">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <project.icon className="h-10 w-10 text-primary" />
                    <Link href={project.link} className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">Education</h2>
          <Card className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-foreground">
                  Bachelor of Science in Information Technology
                </h3>
                <p className="text-lg text-primary">St. Paul University Philippines</p>
                <p className="text-muted-foreground">Major: Artificial Intelligence | Current Year: 3rd Year</p>
              </div>
              <Badge variant="secondary" className="w-fit text-base px-4 py-2">
                2021 - 2025
              </Badge>
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Relevant Coursework & Skills</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  "Network Security",
                  "Cybersecurity Fundamentals",
                  "Machine Learning",
                  "Data Structures & Algorithms",
                  "Database Systems",
                  "Web Application Development",
                  "Software Engineering",
                  "Systems Administration",
                  "Ethical Hacking Basics",
                  "Artificial Intelligence",
                  "Data Science",
                  "Operating Systems",
                ].map((course) => (
                  <div key={course} className="flex items-center space-x-2">
                    <Code className="h-3 w-3 text-primary" />
                    <span className="text-sm text-muted-foreground">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">Get In Touch</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                I'm currently open to new opportunities and interesting projects. Whether you have a question, want to
                discuss security consulting, or just want to say hi, feel free to reach out!
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="grid gap-4 max-w-md mx-auto text-left">
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">Jesse Ray S. Lasam</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">0927 263 4940</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">superjesseray018@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">Natappian West Solana Cagayan</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="mailto:superjesseray018@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Link>
              </Button>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Built by Jesse Ray S. Lasam</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
