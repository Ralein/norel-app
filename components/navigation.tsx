"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  User,
  Share2,
  Monitor,
  FileText,
  Settings,
  Upload,
  ChevronDown,
  Wand2,
  Brain,
  Shield,
  Plus,
  Sparkles,
  LogOut,
  Menu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

function UserNav() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  }

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.photoURL || ''} />
            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.photoURL || ''} />
            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.displayName || 'User'}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="w-4 h-4 mr-2" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export function Navigation() {
  const pathname = usePathname()

  if (pathname === '/') {
    return null;
  }

  const mainNavItems = [
    {
      href: "/dashboard",
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

  const quickActions = [
    { label: "Create Profile", icon: Plus, href: "/profiles/create" },
    { label: "Generate QR", icon: Share2, href: "/share" },
    { label: "New Form", icon: Wand2, href: "/form-craft" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity mr-8">
          <div className="relative flex items-center justify-center">
            <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold text-lg leading-tight">NOREL</span>
            <span className="text-[10px] text-muted-foreground leading-tight">Identity System</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 h-9 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 h-4">
                    {item.badge}
                  </Badge>
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
                  "flex items-center gap-2 px-3 h-9 text-sm font-medium",
                  pathname?.startsWith("/form-craft") || pathname?.startsWith("/ai-forms")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                )}
              >
                <Sparkles className="w-4 h-4" />
                Form-Craft
                <ChevronDown className="w-3 h-3" />
                <Badge variant="secondary" className="text-[10px] px-1.5 h-4">
                  Pro
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56">
              {formCraftItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-start gap-3 cursor-pointer",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="w-4 h-4 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 h-4">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-2 px-3 py-2 h-9 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
              pathname === "/settings"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 ml-auto">
          <ModeToggle />
          <UserNav />

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="px-2 py-1.5 text-sm font-semibold">Navigation</div>
              {mainNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 cursor-pointer",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 h-4">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-sm font-semibold">Form-Craft</div>
              {formCraftItems.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-3 cursor-pointer">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5 text-sm font-semibold">Quick Actions</div>
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <DropdownMenuItem key={action.href} asChild>
                    <Link href={action.href} className="flex items-center gap-3 cursor-pointer">
                      <Icon className="w-4 h-4" />
                      <span>{action.label}</span>
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}