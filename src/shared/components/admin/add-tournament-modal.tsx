"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { apiFetch, handleApiFetch } from "@/lib/api-client";

export type DistrictOption = { id: string; name: string };

const tournamentSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().optional(),
    category: z.enum(["JUNIOR", "SENIOR", "OPEN", "PROFESSIONAL"]),
    status: z.enum(["DRAFT", "REGISTRATION_OPEN", "REGISTRATION_CLOSED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
    districtId: z.string().optional(),
    venue: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    registrationDeadline: z.string().optional(),
    maxParticipants: z.string().optional(),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be on or after start date",
    path: ["endDate"],
  });

type TournamentFormData = z.infer<typeof tournamentSchema>;

function AddTournamentModal({
  open,
  onClose,
  districts,
  lockedDistrictId,
}: {
  open: boolean;
  onClose: () => void;
  districts: DistrictOption[];
  lockedDistrictId?: string;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TournamentFormData>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      category: "OPEN",
      status: "REGISTRATION_OPEN",
      districtId: lockedDistrictId ?? "",
    },
  });

  if (!open) return null;

  async function onSubmit(data: TournamentFormData) {
    try {
      const res = await apiFetch("/api/admin/tournaments", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          districtId: lockedDistrictId || data.districtId || undefined,
          maxParticipants: data.maxParticipants ? Number(data.maxParticipants) : undefined,
          description: data.description?.trim() || undefined,
          venue: data.venue?.trim() || undefined,
          registrationDeadline: data.registrationDeadline || undefined,
        }),
      });
      const { message } = await handleApiFetch(res);
      toast.success(message ?? "Tournament created");
      onClose();
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create tournament");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>Add Tournament</CardTitle>
            <p className="mt-1 text-sm text-slate-500">Create a new racquetball tournament</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-md p-1 hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tournament Name</Label>
              <Input id="name" placeholder="e.g. Jaipur District Open 2026" {...register("name")} />
              {errors.name && <p className="text-sm text-secondary">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea id="description" rows={3} placeholder="Tournament details..." {...register("description")} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-11 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  {...register("category")}
                >
                  <option value="OPEN">Open</option>
                  <option value="JUNIOR">Junior</option>
                  <option value="SENIOR">Senior</option>
                  <option value="PROFESSIONAL">Professional</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="flex h-11 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  {...register("status")}
                >
                  <option value="REGISTRATION_OPEN">Registration Open</option>
                  <option value="DRAFT">Draft</option>
                  <option value="REGISTRATION_CLOSED">Registration Closed</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="districtId">District</Label>
                <select
                  id="districtId"
                  className="flex h-11 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:bg-slate-100"
                  {...register("districtId")}
                  disabled={Boolean(lockedDistrictId)}
                >
                  {!lockedDistrictId && <option value="">State-wide (all districts)</option>}
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue (optional)</Label>
                <Input id="venue" placeholder="e.g. Jaipur Sports Complex" {...register("venue")} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" {...register("startDate")} />
                {errors.startDate && <p className="text-sm text-secondary">{errors.startDate.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" {...register("endDate")} />
                {errors.endDate && <p className="text-sm text-secondary">{errors.endDate.message}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="registrationDeadline">Registration Deadline (optional)</Label>
                <Input id="registrationDeadline" type="date" {...register("registrationDeadline")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants (optional)</Label>
                <Input id="maxParticipants" type="number" min="1" placeholder="64" {...register("maxParticipants")} />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Tournament"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export function AddTournamentButton({
  districts,
  lockedDistrictId,
}: {
  districts: DistrictOption[];
  lockedDistrictId?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Tournament</Button>
      <AddTournamentModal
        open={open}
        onClose={() => setOpen(false)}
        districts={districts}
        lockedDistrictId={lockedDistrictId}
      />
    </>
  );
}
