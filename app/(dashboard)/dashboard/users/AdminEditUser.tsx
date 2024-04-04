"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import toast from "react-hot-toast";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import DialogWrapper from "@/components/Common/DialogWrapper";
import { BsCheckLg } from "react-icons/bs";
import { PiCaretUpDownBold } from "react-icons/pi";
import { User } from "@prisma/client";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";

type EditUserProps = {
  user: User;
};

const AdminEditUser = ({ user }: EditUserProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const id = user.id;
  const UserRoles = ["ADMIN", "USER", "MODERATOR"] as const;

  const formSchema = z.object({
    course: z.string().trim(), //remove whitespaces as we will use this for searching
    cohort: z.string().trim(),
    role: z.enum(UserRoles),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: user.role,
      course: user.course as string,
      cohort: user.cohort as string,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values,
        id,
      };

      const res = await fetch("/api/user/admin", {
        method: "PATCH",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("User edited Successfully ", { duration: 4000 });
        form.reset();
        setOpen(false);
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
    <DialogWrapper
      isBtn={false}
      title="Edit User"
      icon={CiEdit}
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <div className=" bg-white p-4 rounded-md shadow-md dark:bg-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Course Code" {...field} />
                  </FormControl>
                  <FormDescription>Edit course code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cohort"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edit Cohort</FormLabel>
                  <FormControl>
                    <Input placeholder="Cohort" {...field} />
                  </FormControl>
                  <FormDescription>Edit student cohort</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Role</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            " justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? UserRoles.find((role) => role === field.value)
                            : "Select a role"}
                          <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search a role..." />
                        <CommandEmpty>No role found.</CommandEmpty>
                        <CommandGroup>
                          {UserRoles.map((role, i) => (
                            <CommandItem
                              value={role}
                              key={i}
                              onSelect={() => {
                                form.setValue("role", role);
                              }}
                            >
                              <BsCheckLg
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  role === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {role}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </DialogWrapper>
  );
};

export default AdminEditUser;
