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

const coachSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  mobile: z.string().min(10, "Enter a valid phone number"),
  qualification: z.string().min(2, "Qualification is required"),
  certificationLevel: z.enum(["LEVEL_1", "LEVEL_2", "LEVEL_3", "INTERNATIONAL"]),
  district: z.string().min(1, "Select a district"),
});

type CoachFormData = z.infer<typeof coachSchema>;

export function CoachAccountForm({
  prefill,
}: {
  prefill: { name: string; email: string; phone: string };
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CoachFormData>({
    resolver: zodResolver(coachSchema),
    defaultValues: {
      name: prefill.name,
      email: prefill.email,
      mobile: prefill.phone,
      certificationLevel: "LEVEL_1",
    },
  });

  async function onSubmit(data: CoachFormData) {
    try {
      const res = await apiPost("/api/coaches/register", data);
      const { message } = await handleApiFetch<{ coachId: string }>(res);
      toast.success(message ?? "Coach registration submitted");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormBuilder
        register={register}
        errors={errors}
        fields={[
          { name: "name", label: "Full Name", placeholder: "Your full name" },
          { name: "email", label: "Email", type: "email" },
          { name: "mobile", label: "Mobile Number", type: "tel", placeholder: "10-digit mobile number" },
          { name: "qualification", label: "Qualification", placeholder: "e.g. IRA Level 2 Certified Coach" },
          {
            name: "certificationLevel",
            label: "Certification Level",
            type: "select",
            options: [
              { label: "Level 1", value: "LEVEL_1" },
              { label: "Level 2", value: "LEVEL_2" },
              { label: "Level 3", value: "LEVEL_3" },
              { label: "International", value: "INTERNATIONAL" },
            ],
          },
          {
            name: "district",
            label: "District",
            type: "select",
            options: [
              { label: "Select district", value: "" },
              ...rajasthanDistricts.map((d) => ({ label: d, value: d })),
            ],
          },
        ]}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Coach Registration"}
      </Button>
    </form>
  );
}
