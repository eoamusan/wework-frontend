"use client";

import { BriefcaseBusiness, Flag, Plus } from "lucide-react";

import { JobApplicationModal } from "@wew/components/job-application-modal";
import { Badge } from "@wew/components/ui/badge";
import { Button } from "@wew/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@wew/components/ui/card";
import { Input } from "@wew/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@wew/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@wew/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@wew/components/ui/tabs";

const departments = [
  "All Department",
  "Engineering",
  "Design",
  "Marketing",
  "Support",
  "Public Relations",
  "Sales",
] as const;

export function RecruitmentShowcase() {
  return (
      <main className="min-h-screen bg-main-bg px-2 py-10 text-dark-soft sm:px-3 md:px-4">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <section className="flex flex-col gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-blue">
              Shadcn + Radix foundation
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                  Components tailored to your hiring flow
                </h1>
                <p className="text-lg leading-8 text-secondary/80">
                  The references are now translated into reusable UI primitives, with
                  a validated form workflow ready for production screens.
                </p>
              </div>
              <JobApplicationModal />
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Button size="lg" variant="primary">
            Get started
          </Button>
          <Button size="lg" variant="outline">
            Login
          </Button>
          <Button size="lg" variant="success">
            <Plus className="size-6" />
            Add More
          </Button>
          <Button size="lg" variant="danger">
            <Flag className="size-5" />
            Report this post
          </Button>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardHeader>
              <CardTitle>Input styling</CardTitle>
              <CardDescription>
                Large rounded fields, gentle outlines, and soft placeholder
                contrast based on your samples.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-soft" htmlFor="showcase-email">
                  Email Address
                </label>
                <Input
                  id="showcase-email"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-soft" htmlFor="showcase-phone">
                  Phone number
                </label>
                <div className="flex h-16 items-center rounded-2xl border border-[#ddd9ef] bg-white px-4 shadow-[0_16px_38px_rgba(6,2,18,0.05)]">
                  <div className="mr-4 flex items-center gap-3 pr-4 [border-right:1px_solid_#ddd9ef]">
                    <span className="flex size-9 overflow-hidden rounded-full border border-[#d9e7c8]">
                      <span className="flex-1 bg-[#78bf43]" />
                      <span className="flex-1 bg-white" />
                      <span className="flex-1 bg-[#78bf43]" />
                    </span>
                    <span className="text-accent-blue">+234</span>
                  </div>
                  <Input
                    className="h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0"
                    id="showcase-phone"
                    placeholder="123 456 789"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-soft" htmlFor="showcase-job">
                  Job Type
                </label>
                <Select defaultValue="Engineering">
                  <SelectTrigger id="showcase-job">
                    <span className="flex items-center gap-3">
                      <BriefcaseBusiness className="size-5 text-secondary/50" />
                      <SelectValue placeholder="Select department" />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Choices and status</CardTitle>
              <CardDescription>
                Radio controls, tabs, badges, and card treatment aligned to the
                attached visual direction.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center gap-4">
                <RadioGroup className="grid-flow-col" defaultValue="checked">
                  <RadioGroupItem value="checked" />
                  <RadioGroupItem value="unchecked" />
                </RadioGroup>
                <Badge>Full -Time</Badge>
              </div>

              <Tabs className="w-full" defaultValue="personal">
                <TabsList>
                  <TabsTrigger value="personal">Personal Information</TabsTrigger>
                  <TabsTrigger value="experience">Job Experience &amp; Links</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <p className="text-sm leading-7 text-secondary/80">
                    Use this tab pattern for your multi-step flow. Active tabs keep
                    the thin accent underline from the reference.
                  </p>
                </TabsContent>
                <TabsContent value="experience">
                  <p className="text-sm leading-7 text-secondary/80">
                    The component is ready for richer step content and external
                    links sections.
                  </p>
                </TabsContent>
                <TabsContent value="documents">
                  <p className="text-sm leading-7 text-secondary/80">
                    Document upload and review states can sit here without changing
                    the base tab styling.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
        </div>
      </main>
  );
}
