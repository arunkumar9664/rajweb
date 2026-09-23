"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { FormBuilder } from "@/shared/components/ui/form-builder";
import { rajasthanDistricts } from "@/shared/config/site";
import { apiPost, handleApiFetch } from "@/lib/api-client";

const clubSchema = z.object({
  clubName: z.string().min(2, "Club name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  district: z.string().min(1, "Select a district"),
  address: z.string().min(10, "Address is required"),
  courts: z.string().min(1, "Number of courts is required"),
});

type ClubFormData = z.infer<typeof clubSchema>;

export function ClubMembershipForm({
  prefill,
}: {
  prefill: { contactPerson: string; email: string; phone: string };
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClubFormData>({
    resolver: zodResolver(clubSchema),
    defaultValues: { contactPerson: prefill.contactPerson, email: prefill.email, phone: prefill.phone },
  });

  async function onSubmit(data: ClubFormData) {
    try {
      const res = await apiPost("/api/memberships/club", { ...data, courts: Number(data.courts) });
      const { message } = await handleApiFetch<{ membershipId: string }>(res);
      toast.success(message ?? "Club membership application submitted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormBuilder
        register={register}
        errors={errors}
        fields={[
          { name: "clubName", label: "Club Name", placeholder: "e.g. Jaipur Racquetball Club" },
          { name: "contactPerson", label: "Contact Person", placeholder: "Your full name" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "tel", placeholder: "10-digit mobile number" },
          {
            name: "district",
            label: "District",
            type: "select",
            options: [
              { label: "Select district", value: "" },
              ...rajasthanDistricts.map((d) => ({ label: d, value: d })),
            ],
          },
          { name: "address", label: "Address", type: "textarea", placeholder: "Full club address" },
          { name: "courts", label: "Number of Courts", type: "number" },
        ]}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
