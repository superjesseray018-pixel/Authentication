import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth-button"
import { Shield, Calendar, Clock, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "The Rise of AI-Powered Cyber Attacks: What You Need to Know",
    excerpt:
      "Artificial intelligence is revolutionizing cybersecurity, but it's also empowering cybercriminals. Learn how to defend against AI-enhanced threats.",
    content:
      "As artificial intelligence becomes more sophisticated, cybercriminals are leveraging these technologies to create more convincing phishing emails, automate vulnerability discovery, and launch targeted attacks at unprecedented scale...",
    author: "Alex Chen",
    publishedAt: "2024-03-15",
    readTime: "8 min read",
    category: "AI Security",
    image: "/placeholder-zw2ns.png",
    tags: ["AI", "Machine Learning", "Threat Detection", "Cybersecurity"],
  },
  {
    id: 2,
    title: "Zero Trust Architecture: Implementation Guide for SMBs",
    excerpt:
      "Small and medium businesses can no longer rely on perimeter security. Here's how to implement Zero Trust principles on any budget.",
    content:
      "Zero Trust security models assume that threats exist both inside and outside the network perimeter. This comprehensive guide walks through practical implementation steps for organizations of all sizes...",
    author: "Sarah Rodriguez",
    publishedAt: "2024-03-10",
    readTime: "12 min read",
    category: "Network Security",
    image: "/placeholder-09o4e.png",
    tags: ["Zero Trust", "Network Security", "SMB", "Implementation"],
  },
  {
    id: 3,
    title: "Ransomware Recovery: Lessons from Recent Attacks",
    excerpt:
      "Analyzing the latest ransomware campaigns and extracting actionable insights for better preparation and response strategies.",
    content:
      "Recent ransomware attacks have shown that preparation is key to minimizing damage and recovery time. This analysis covers the most effective response strategies and prevention measures...",
    author: "Michael Thompson",
    publishedAt: "2024-03-05",
    readTime: "10 min read",
    category: "Incident Response",
    image: "/placeholder-cr7ne.png",
    tags: ["Ransomware", "Incident Response", "Recovery", "Prevention"],
  },
  {
    id: 4,
    title: "Cloud Security Misconfigurations: The Hidden Threat",
    excerpt:
      "95% of cloud security failures are due to customer misconfigurations. Learn how to audit and secure your cloud infrastructure.",
    content:
      "Cloud platforms offer robust security features, but misconfigurations remain the leading cause of data breaches. This guide provides a systematic approach to cloud security auditing...",
    author: "Jennifer Park",
    publishedAt: "2024-02-28",
    readTime: "15 min read",
    category: "Cloud Security",
    image: "/placeholder-7p1lh.png",
    tags: ["Cloud Security", "AWS", "Azure", "Configuration"],
  },
  {
    id: 5,
    title: "Social Engineering in the Remote Work Era",
    excerpt:
      "Remote work has created new attack vectors for social engineers. Discover the latest tactics and how to train your team to recognize them.",
    content:
      "The shift to remote work has fundamentally changed the social engineering landscape. Attackers are exploiting isolation, video call fatigue, and blurred work-life boundaries...",
    author: "David Kim",
    publishedAt: "2024-02-20",
    readTime: "7 min read",
    category: "Human Security",
    image: "/placeholder-mnndj.png",
    tags: ["Social Engineering", "Remote Work", "Training", "Phishing"],
  },
  {
    id: 6,
    title: "Quantum Computing and Cryptography: Preparing for the Future",
    excerpt:
      "Quantum computers will eventually break current encryption methods. Here's how to prepare your organization for the post-quantum era.",
    content:
      "While practical quantum computers are still years away, organizations need to start preparing for post-quantum cryptography now. This article outlines the timeline and preparation steps...",
    author: "Dr. Lisa Wang",
    publishedAt: "2024-02-15",
    readTime: "20 min read",
    category: "Cryptography",
    image: "/placeholder-o096i.png",
    tags: ["Quantum Computing", "Cryptography", "Future Tech", "Encryption"],
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-bold text-foreground">CyberGuard</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="/blog" className="text-foreground font-medium">
                Blog
              </Link>
              <Link href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Cybersecurity Insights & Analysis
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Stay informed about the latest cybersecurity threats, trends, and best practices. Expert analysis and
              actionable insights to keep your organization secure.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              Featured Article
            </Badge>
          </div>

          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-4">
                  <Badge variant="outline">{blogPosts[0].category}</Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-balance">{blogPosts[0].title}</h2>
                  <p className="text-muted-foreground text-pretty">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(blogPosts[0].publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Button className="w-fit bg-blue-600 hover:bg-blue-700">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latest Articles</h2>
            <p className="text-muted-foreground">
              Explore our comprehensive collection of cybersecurity insights and expert analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground text-balance line-clamp-2">{post.title}</h3>

                  <p className="text-muted-foreground text-sm text-pretty line-clamp-3">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-500/10 to-green-500/10">
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Never Miss a Security Update</h2>
              <p className="text-muted-foreground text-pretty">
                Subscribe to our newsletter for weekly cybersecurity insights, threat alerts, and expert analysis.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/#newsletter">Subscribe Now</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-500" />
                <span className="text-lg font-bold text-foreground">CyberGuard</span>
              </div>
              <p className="text-muted-foreground text-pretty">
                Professional cybersecurity services to protect your digital assets and ensure business continuity.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Services</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                    Security Assessments
                  </Link>
                </div>
                <div>
                  <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                    Penetration Testing
                  </Link>
                </div>
                <div>
                  <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                    Threat Monitoring
                  </Link>
                </div>
                <div>
                  <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                    Incident Response
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Resources</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Case Studies
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Whitepapers
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Security Tools
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>security@cyberguard.com</div>
                <div>+1 (555) 123-4567</div>
                <div>Available 24/7 for emergencies</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CyberGuard. All rights reserved. Built with security in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
