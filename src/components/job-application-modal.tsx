"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Eye, EyeOff, Mail, Phone } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@wew/components/ui/button";
import { Input } from "@wew/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@wew/components/ui/modal";
import { RadioGroup, RadioGroupItem } from "@wew/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@wew/components/ui/select";
import {
  type JobPostFormValues,
  jobPostFormSchema,
} from "@wew/lib/schemas/job-post-form";

const departments = [
  "All Department",
  "Engineering",
  "Design",
  "Marketing",
  "Support",
  "Public Relations",
  "Sales",
] as const;

export function JobApplicationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<JobPostFormValues>({
    defaultValues: {
      department: "",
      email: "",
      jobType: "full-time",
      password: "",
      phone: "",
    },
    resolver: zodResolver(jobPostFormSchema),
  });

  const onSubmit = (values: JobPostFormValues) => {
    setIsOpen(false);
    form.reset(values);
  };

  return (
    <Modal onOpenChange={setIsOpen} open={isOpen}>
      <ModalTrigger asChild>
        <Button size="lg" variant="primary">
          Get started
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Quick candidate form</ModalTitle>
          <ModalDescription>
            This form is wired with React Hook Form and Zod, so the modal already
            has the validation foundation you can reuse across the app.
          </ModalDescription>
        </ModalHeader>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-soft" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-secondary/45" />
              <Input
                className="pl-12"
                id="email"
                placeholder="Enter your email address"
                {...form.register("email")}
              />
            </div>
            <p className="text-sm text-[#ff4d58]">{form.formState.errors.email?.message}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-soft" htmlFor="phone">
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
              <Phone className="mr-3 size-5 text-secondary/40" />
              <Input
                className="h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0"
                id="phone"
                placeholder="123 456 789"
                {...form.register("phone")}
              />
            </div>
            <p className="text-sm text-[#ff4d58]">{form.formState.errors.phone?.message}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-soft">Job Type</label>
              <Controller
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <RadioGroup
                    className="grid grid-cols-2 gap-3"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#ebe6ff] bg-white px-4 py-3">
                      <RadioGroupItem value="full-time" />
                      <span className="text-sm text-secondary">Full Time</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#ebe6ff] bg-white px-4 py-3">
                      <RadioGroupItem value="part-time" />
                      <span className="text-sm text-secondary">Part Time</span>
                    </label>
                  </RadioGroup>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-dark-soft">Department</label>
              <Controller
                control={form.control}
                name="department"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
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
                )}
              />
              <p className="text-sm text-[#ff4d58]">
                {form.formState.errors.department?.message}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-dark-soft" htmlFor="password">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                className="pr-14"
                id="password"
                placeholder="****************"
                type={isPasswordVisible ? "text" : "password"}
                {...form.register("password")}
              />
              <button
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-secondary/45 transition hover:text-accent-blue"
                onClick={() => setIsPasswordVisible((value) => !value)}
                type="button"
              >
                {isPasswordVisible ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeOff className="size-5" />
                )}
              </button>
            </div>
            <p className="text-sm text-[#ff4d58]">
              {form.formState.errors.password?.message}
            </p>
          </div>

          <ModalFooter>
            <Button className="w-full sm:w-auto" type="submit" variant="primary">
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
