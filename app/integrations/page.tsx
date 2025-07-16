"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Cloud,
  Database,
  Shield,
  Eye,
  Brain,
  Lock,
  Globe,
  Smartphone,
  CreditCard,
  Mail,
  Bell,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  category: "storage" | "ai" | "security" | "communication" | "payment" | "analytics"
  icon: React.ReactNode
  status: "connected" | "available" | "premium"
  features: string[]
  pricing: string
  setupComplexity: "easy" | "medium" | "complex"
  documentation: string
}

export default function IntegrationsPage() {
  const { toast } = useToast()
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([])

  const integrations: Integration[] = [
    // Storage & Database
    {
      id: "supabase",
      name: "Supabase",
      description: "Open source Firebase alternative with PostgreSQL database",
      category: "storage",
      icon: <Database className="w-5 h-5" />,
      status: "available",
      features: ["Real-time database", "Authentication", "Storage", "Edge functions"],
      pricing: "Free tier available, $25/month pro",
      setupComplexity: "easy",
      documentation: "https://supabase.com/docs",
    },
    {
      id: "vercel-blob",
      name: "Vercel Blob",
      description: "Fast, global file storage for your applications",
      category: "storage",
      icon: <Cloud className="w-5 h-5" />,
      status: "available",
      features: ["Global CDN", "Automatic optimization", "Secure uploads", "API integration"],
      pricing: "Pay per usage, $0.15/GB",
      setupComplexity: "easy",
      documentation: "https://vercel.com/docs/storage/vercel-blob",
    },
    {
      id: "neon",
      name: "Neon",
      description: "Serverless PostgreSQL with branching and autoscaling",
      category: "storage",
      icon: <Database className="w-5 h-5" />,
      status: "available",
      features: ["Serverless PostgreSQL", "Database branching", "Autoscaling", "Point-in-time recovery"],
      pricing: "Free tier, $19/month pro",
      setupComplexity: "medium",
      documentation: "https://neon.tech/docs",
    },

    // AI & Processing
    {
      id: "openai",
      name: "OpenAI GPT",
      description: "Advanced language models for text processing and generation",
      category: "ai",
      icon: <Brain className="w-5 h-5" />,
      status: "available",
      features: ["Text generation", "Document analysis", "Form extraction", "Data validation"],
      pricing: "$0.002/1K tokens",
      setupComplexity: "easy",
      documentation: "https://platform.openai.com/docs",
    },
    {
      id: "tesseract",
      name: "Tesseract OCR",
      description: "Open source optical character recognition engine",
      category: "ai",
      icon: <Eye className="w-5 h-5" />,
      status: "available",
      features: ["Text extraction", "Multi-language support", "Image preprocessing", "Confidence scoring"],
      pricing: "Free (self-hosted)",
      setupComplexity: "medium",
      documentation: "https://tesseract-ocr.github.io/",
    },
    {
      id: "anthropic",
      name: "Anthropic Claude",
      description: "AI assistant for document analysis and form processing",
      category: "ai",
      icon: <Brain className="w-5 h-5" />,
      status: "premium",
      features: ["Document understanding", "Form field extraction", "Data validation", "Structured output"],
      pricing: "$0.008/1K tokens",
      setupComplexity: "easy",
      documentation: "https://docs.anthropic.com/",
    },

    // Security & Authentication
    {
      id: "auth0",
      name: "Auth0",
      description: "Universal authentication & authorization platform",
      category: "security",
      icon: <Shield className="w-5 h-5" />,
      status: "available",
      features: ["Multi-factor auth", "Social login", "SSO", "User management"],
      pricing: "Free tier, $23/month pro",
      setupComplexity: "medium",
      documentation: "https://auth0.com/docs",
    },
    {
      id: "clerk",
      name: "Clerk",
      description: "Complete user management and authentication",
      category: "security",
      icon: <Lock className="w-5 h-5" />,
      status: "available",
      features: ["Pre-built UI", "Session management", "Organizations", "Webhooks"],
      pricing: "Free tier, $25/month pro",
      setupComplexity: "easy",
      documentation: "https://clerk.com/docs",
    },
    {
      id: "biometric",
      name: "WebAuthn/FIDO2",
      description: "Passwordless authentication with biometrics",
      category: "security",
      icon: <Smartphone className="w-5 h-5" />,
      status: "available",
      features: ["Fingerprint auth", "Face recognition", "Hardware keys", "Passwordless login"],
      pricing: "Free (browser native)",
      setupComplexity: "complex",
      documentation: "https://webauthn.guide/",
    },

    // Communication
    {
      id: "twilio",
      name: "Twilio",
      description: "SMS, voice, and communication APIs",
      category: "communication",
      icon: <Mail className="w-5 h-5" />,
      status: "available",
      features: ["SMS notifications", "Voice calls", "WhatsApp", "Email"],
      pricing: "$0.0075 per SMS",
      setupComplexity: "easy",
      documentation: "https://www.twilio.com/docs",
    },
    {
      id: "sendgrid",
      name: "SendGrid",
      description: "Email delivery and marketing platform",
      category: "communication",
      icon: <Mail className="w-5 h-5" />,
      status: "available",
      features: ["Transactional email", "Templates", "Analytics", "Deliverability"],
      pricing: "Free tier, $19.95/month",
      setupComplexity: "easy",
      documentation: "https://docs.sendgrid.com/",
    },
    {
      id: "pusher",
      name: "Pusher",
      description: "Real-time messaging and notifications",
      category: "communication",
      icon: <Bell className="w-5 h-5" />,
      status: "available",
      features: ["Real-time updates", "Push notifications", "Presence", "Chat"],
      pricing: "Free tier, $49/month",
      setupComplexity: "medium",
      documentation: "https://pusher.com/docs",
    },

    // Payment Processing
    {
      id: "stripe",
      name: "Stripe",
      description: "Complete payment processing platform",
      category: "payment",
      icon: <CreditCard className="w-5 h-5" />,
      status: "available",
      features: ["Payment processing", "Subscriptions", "Invoicing", "Connect"],
      pricing: "2.9% + 30¢ per transaction",
      setupComplexity: "medium",
      documentation: "https://stripe.com/docs",
    },
    {
      id: "razorpay",
      name: "Razorpay",
      description: "Payment gateway for Indian businesses",
      category: "payment",
      icon: <CreditCard className="w-5 h-5" />,
      status: "available",
      features: ["UPI payments", "Net banking", "Cards", "Wallets"],
      pricing: "2% per transaction",
      setupComplexity: "easy",
      documentation: "https://razorpay.com/docs/",
    },

    // Analytics & Monitoring
    {
      id: "vercel-analytics",
      name: "Vercel Analytics",
      description: "Privacy-friendly web analytics",
      category: "analytics",
      icon: <Globe className="w-5 h-5" />,
      status: "available",
      features: ["Page views", "User sessions", "Performance", "Privacy-first"],
      pricing: "Free tier, $10/month pro",
      setupComplexity: "easy",
      documentation: "https://vercel.com/docs/analytics",
    },
    {
      id: "sentry",
      name: "Sentry",
      description: "Error tracking and performance monitoring",
      category: "analytics",
      icon: <AlertCircle className="w-5 h-5" />,
      status: "available",
      features: ["Error tracking", "Performance monitoring", "Release tracking", "Alerts"],
      pricing: "Free tier, $26/month",
      setupComplexity: "easy",
      documentation: "https://docs.sentry.io/",
    },
  ]

  const toggleIntegration = (integrationId: string) => {
    setConnectedIntegrations((prev) => {
      const isConnected = prev.includes(integrationId)
      const newConnections = isConnected ? prev.filter((id) => id !== integrationId) : [...prev, integrationId]

      toast({
        title: isConnected ? "Integration Disconnected" : "Integration Connected",
        description: `${integrations.find((i) => i.id === integrationId)?.name} has been ${
          isConnected ? "disconnected" : "connected"
        }.`,
      })

      return newConnections
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "storage":
        return <Database className="w-4 h-4" />
      case "ai":
        return <Brain className="w-4 h-4" />
      case "security":
        return <Shield className="w-4 h-4" />
      case "communication":
        return <Mail className="w-4 h-4" />
      case "payment":
        return <CreditCard className="w-4 h-4" />
      case "analytics":
        return <Globe className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "storage":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300"
      case "ai":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300"
      case "security":
        return "bg-green-500/10 text-green-700 dark:text-green-300"
      case "communication":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-300"
      case "payment":
        return "bg-red-500/10 text-red-700 dark:text-red-300"
      case "analytics":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-300"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-300"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "easy":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "complex":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const categories = [
    { id: "storage", name: "Storage & Database", count: integrations.filter((i) => i.category === "storage").length },
    { id: "ai", name: "AI & Processing", count: integrations.filter((i) => i.category === "ai").length },
    { id: "security", name: "Security & Auth", count: integrations.filter((i) => i.category === "security").length },
    {
      id: "communication",
      name: "Communication",
      count: integrations.filter((i) => i.category === "communication").length,
    },
    { id: "payment", name: "Payment", count: integrations.filter((i) => i.category === "payment").length },
    { id: "analytics", name: "Analytics", count: integrations.filter((i) => i.category === "analytics").length },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Integrations</h1>
            <p className="text-muted-foreground">
              Connect NOREL with essential services to enhance functionality and performance
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${getCategoryColor(category.id)}`}
                  >
                    {getCategoryIcon(category.id)}
                  </div>
                  <div className="text-2xl font-bold">{category.count}</div>
                  <div className="text-xs text-muted-foreground">{category.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Integration Categories */}
          {categories.map((category) => {
            const categoryIntegrations = integrations.filter((i) => i.category === category.id)
            return (
              <div key={category.id} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(category.id)}`}
                  >
                    {getCategoryIcon(category.id)}
                  </div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <Badge variant="secondary">{category.count} available</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryIntegrations.map((integration) => {
                    const isConnected = connectedIntegrations.includes(integration.id)
                    return (
                      <Card key={integration.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                                {integration.icon}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{integration.name}</CardTitle>
                                <CardDescription className="text-sm">{integration.description}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {integration.status === "premium" && <Badge variant="secondary">Premium</Badge>}
                              {isConnected && <CheckCircle className="w-4 h-4 text-green-500" />}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Features */}
                          <div>
                            <h4 className="font-medium text-sm mb-2">Features</h4>
                            <div className="flex flex-wrap gap-1">
                              {integration.features.slice(0, 3).map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                              {integration.features.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{integration.features.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Pricing & Complexity */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Pricing:</span>
                              <p className="text-muted-foreground">{integration.pricing}</p>
                            </div>
                            <div>
                              <span className="font-medium">Setup:</span>
                              <p className={getComplexityColor(integration.setupComplexity)}>
                                {integration.setupComplexity}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={isConnected}
                                onCheckedChange={() => toggleIntegration(integration.id)}
                                disabled={integration.status === "premium"}
                              />
                              <span className="text-sm">{isConnected ? "Connected" : "Connect"}</span>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={integration.documentation} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Setup Guide */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Integration Setup Guide
              </CardTitle>
              <CardDescription>Essential integrations for a production-ready NOREL application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Phase 1: Core Infrastructure</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Database (Supabase or Neon)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>File Storage (Vercel Blob)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Authentication (Clerk or Auth0)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Phase 2: AI & Processing</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span>OCR Engine (Tesseract)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span>AI Processing (OpenAI or Claude)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span>Document Analysis</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Phase 3: Communication</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                      <span>Email Service (SendGrid)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                      <span>SMS Notifications (Twilio)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                      <span>Real-time Updates (Pusher)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Phase 4: Production</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-purple-500" />
                      <span>Error Tracking (Sentry)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-purple-500" />
                      <span>Analytics (Vercel Analytics)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-purple-500" />
                      <span>Payment Processing (Stripe)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">💡 Pro Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Start with free tiers to test integrations before committing to paid plans</li>
                  <li>• Use environment variables to manage API keys securely</li>
                  <li>• Implement proper error handling and fallbacks for each integration</li>
                  <li>• Monitor usage and costs regularly to avoid unexpected charges</li>
                  <li>• Keep integration documentation bookmarked for quick reference</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
