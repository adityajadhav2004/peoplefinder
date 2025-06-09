"use client"

import type React from "react"

import { useState } from "react"
import { Search, User, Briefcase, Mail, MapPin, Globe, Linkedin, Twitter, Facebook, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const [searchType, setSearchType] = useState("name")
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/peoplefinder?type=${searchType}&query=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch results")
      }

      setResults(data.data || [])

      if (data.data && data.data.length === 0) {
        setError("No results found. Try a different search term.")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">People Finder</h1>
          <p className="text-muted-foreground">Search for people by name, email, or company</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search</CardTitle>
            <CardDescription>Enter your search criteria below</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="name" onValueChange={setSearchType}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="name">Name</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Input
                  placeholder={`Enter ${searchType}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? "Searching..." : "Search"}
                  <Search className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map((person, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{person.full_name || "Unknown Name"}</CardTitle>
                      <CardDescription>
                        {person.job_title
                          ? `${person.job_title}${person.company ? ` at ${person.company}` : ""}`
                          : "No job information"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {person.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{person.email}</span>
                      </div>
                    )}
                    {person.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{person.location}</span>
                      </div>
                    )}
                    {person.company && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{person.company}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                {(person.linkedin_url || person.twitter_url || person.facebook_url || person.github_url) && (
                  <CardFooter className="border-t pt-4">
                    <div className="flex gap-3">
                      {person.linkedin_url && (
                        <a
                          href={person.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {person.twitter_url && (
                        <a
                          href={person.twitter_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {person.facebook_url && (
                        <a
                          href={person.facebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {person.github_url && (
                        <a
                          href={person.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {person.website && (
                        <a
                          href={person.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

