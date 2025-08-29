"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Home,
  User,
  Share2,
  Monitor,
  FileText,
  Settings,
  Upload,
  Zap,
  ChevronDown,
  Wand2,
  Brain,
  Shield,
  Plus,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()
  const [hasNotifications, setHasNotifications] = useState(true)

  const mainNavItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: Home,
      description: "Overview and stats",
    },
    {
      href: "/profiles",
      label: "Profiles",
      icon: User,
      description: "Manage identities",

    },
    {
      href: "/share",
      label: "Share",
      icon: Share2,
      description: "QR & NFC sharing",
    },
    {
      href: "/kiosk",
      label: "Kiosk",
      icon: Monitor,
      description: "Receive profiles",
    },
    {
      href: "/documents",
      label: "Documents",
      icon: FileText,
      description: "Generate forms",
    },
    {
      href: "/upload",
      label: "Upload",
      icon: Upload,
      description: "AI document processing",
      badge: "New",
    },
  ]

  const formCraftItems = [
    {
      href: "/form-craft",
      label: "Form Builder",
      icon: Wand2,
      description: "Drag & drop forms",
    },
    {
      href: "/ai-forms",
      label: "AI Generator",
      icon: Brain,
      description: "AI-powered forms",
      badge: "AI",
    },
  ]

  const systemItems = [
    {
      href: "/integrations",
      label: "Integrations",
      icon: Zap,
      description: "Connect services",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      description: "App preferences",
    },
  ]

  const quickActions = [
    { label: "Create Profile", icon: Plus, href: "/profile/create" },
    { label: "Generate QR", icon: Share2, href: "/share" },
    { label: "New Form", icon: Wand2, href: "/form-craft" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                NOREL
              </span>
              <div className="text-xs text-muted-foreground -mt-1">Identity System</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-accent/50 group",
                    isActive ? "text-primary bg-primary/10 shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive && "text-primary")}
                  />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant={item.badge === "New" ? "default" : "secondary"}
                      className="ml-1 text-xs px-1.5 py-0.5 h-5 min-w-fit"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              )
            })}

            {/* Form-Craft Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-accent/50 group",
                    pathname?.startsWith("/form-craft") || pathname?.startsWith("/ai-forms")
                      ? "text-primary bg-primary/10 shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Sparkles className="w-4 h-4 transition-transform group-hover:scale-110" />
                  Form-Craft
                  <ChevronDown className="w-3 h-3 transition-transform group-data-[state=open]:rotate-180" />
                  <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0.5 h-5 min-w-fit">
                    Pro
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56 p-2">
                {formCraftItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <DropdownMenuItem key={item.href} asChild className="p-0">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors w-full",
                          isActive && "bg-primary/10 text-primary",
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 h-4 min-w-fit">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {systemItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-accent/50 group",
                    isActive ? "text-primary bg-primary/10 shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn("w-4 h-4 transition-transform group-hover:scale-110", isActive && "text-primary")}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            {/* Quick Access Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <div className="flex flex-col items-center justify-center w-5 h-5">
                    <div className="w-4 h-0.5 bg-current mb-1 rounded-full"></div>
                    <div className="w-4 h-0.5 bg-current mb-1 rounded-full"></div>
                    <div className="w-4 h-0.5 bg-current rounded-full"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2">
                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Quick Access</div>
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <DropdownMenuItem key={action.href} asChild className="p-0">
                      <Link
                        href={action.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors w-full"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="font-medium">{action.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
                <div className="h-px bg-border my-2" />
                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Navigation</div>
                {mainNavItems.slice(0, 4).map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <DropdownMenuItem key={item.href} asChild className="p-0">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors w-full",
                          isActive && "bg-primary/10 text-primary",
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <Badge
                                variant={item.badge === "New" ? "default" : "secondary"}
                                className="text-xs px-1.5 py-0.5 h-4 min-w-fit"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
