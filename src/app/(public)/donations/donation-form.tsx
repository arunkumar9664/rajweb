"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { apiPost, handleApiFetch } from "@/lib/api-client";

const donationSchema = z.object({
  donorName: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  amount: z.string().min(1, "Please enter an amount"),
  purpose: z.string().min(1, "Please select a purpose"),
  panNumber: z.string().optional(),
  message: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

export function DonationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
  });

  async function onSubmit(data: DonationFormData) {
    try {
      const res = await apiPost("/api/donations", {
          name: data.donorName,
          email: data.email,
          mobile: data.phone,
          amount: Number(data.amount),
          message: data.message ? `${data.purpose}: ${data.message}` : data.purpose,
        });
      const { message } = await handleApiFetch(res);
      toast.success(message ?? "Thank you for your generous support!");
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to process donation");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="donorName">Full Name</Label>
          <Input id="donorName" placeholder="Your full name" {...register("donorName")} />
          {errors.donorName && <p className="text-sm text-secondary">{errors.donorName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-sm text-secondary">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" {...register("phone")} />
          {errors.phone && <p className="text-sm text-secondary">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">Donation Amount (₹)</Label>
          <Input id="amount" type="number" min="100" placeholder="1000" {...register("amount")} />
          {errors.amount && <p className="text-sm text-secondary">{errors.amount.message}</p>}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose</Label>
          <select
            id="purpose"
            className="flex h-11 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            {...register("purpose")}
            defaultValue=""
          >
            <option value="" disabled>Select purpose</option>
            <option value="General Development">General Development</option>
            <option value="Youth Programs">Youth Programs</option>
            <option value="Court Construction">Court Construction</option>
            <option value="Tournament Sponsorship">Tournament Sponsorship</option>
            <option value="Equipment Support">Equipment Support</option>
          </select>
          {errors.purpose && <p className="text-sm text-secondary">{errors.purpose.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="panNumber">PAN Number (Optional, for 80G receipt)</Label>
          <Input id="panNumber" placeholder="ABCDE1234F" {...register("panNumber")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea id="message" placeholder="Any specific instructions or dedication..." {...register("message")} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : "Pledge Donation"}
      </Button>
    </form>
  );
}
