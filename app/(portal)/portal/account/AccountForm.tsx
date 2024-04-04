"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

const accountFormSchema = z.object({
  phone: z.string(),
  linkedIn: z.string(),
  github: z.string(),
  discord: z.string(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  phone: "",
  linkedIn: "",
  github: "",
  discord: "",
};

type Props = {
  user: User;
};

export function AccountForm({ user }: Props) {
  const router = useRouter();

  const email = user.email
  const displayPhone = user.phone || "Phone"
  const displayGitHub = user.github || "GitHub"
  const displayLinkedIn = user.linkedIn || "LinkedIn"
  const displayDiscord = user.discord || "Discord "

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    try {
      const formattedValues = {
        ...values, email
      };

      const res = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success(" Profile Edited", { duration: 4000 });
        form.reset();
        router.refresh();
      } else {
        const errorMessage = await res.text();

        toast.error(`An error occured ${errorMessage}`, { duration: 6000 });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An Unexpected error occured");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel className="text-lg font-semibold tracking-tight ">
            Name
          </FormLabel>
          <FormControl>
            <Input placeholder={user.name as string} disabled />
          </FormControl>
          <FormDescription>
            This is the name that will be displayed on your profile and in
            emails.
          </FormDescription>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg font-semibold tracking-tight ">
                Phone
              </FormLabel>
              <Input placeholder={displayPhone} {...field} />
              <FormDescription>Your phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg font-semibold tracking-tight ">
                GitHub
              </FormLabel>
              <Input placeholder={displayGitHub} {...field} />
              <FormDescription>Your github profile link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg font-semibold tracking-tight ">
                LinkedIn
              </FormLabel>
              <Input placeholder={displayLinkedIn} {...field} />
              <FormDescription>Your LinkedIn profile link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discord"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg font-semibold tracking-tight ">
                Discord
              </FormLabel>
              <Input placeholder={displayDiscord} {...field} />
              <FormDescription>Your discord profile link.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
