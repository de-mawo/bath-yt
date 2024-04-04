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
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import toast from "react-hot-toast";
import * as z from "zod";
import { categoryType, cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import DialogWrapper from "@/components/Common/DialogWrapper";
import { BsCheckLg } from "react-icons/bs";
import { PiCaretUpDownBold } from "react-icons/pi";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const AddModule = () => {
  const router = useRouter();

  const [tags, setTag] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [open, setOpen] = useState(false);

  const addTags = () => {
    const tempData = [...tags]; // Create a new array using spread syntax
    tempData.push(tagInput);
    setTag(tempData); // Update the state with the new array
    setTagInput("");
  };

 

  const formSchema = z.object({
    title: z
      .string({
        required_error: "Please add a Title.",
      })
      .max(500),

    courseCode: z
      .string({
        required_error: "Please add a Course code.",
      })
      .trim(), //remove whitespaces as we will use this for searching

    code: z
      .string({
        required_error: "Please add a module code.",
      })
      .trim(), //remove whitespaces as we will use this for searching

    category: z.string({
      required_error: "Please select a category Type.",
    }),
    courseId: z.string({
      required_error: "Please select a courseId.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      code: "",
      courseCode: "",
      courseId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values,
        tags,
      };

      const res = await fetch("/api/module", {
        method: "POST",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("Module Added", { duration: 4000 });
        form.reset();
        setTag([]);
        setTagInput("");
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
      isBtn
      btnTitle="Add a Module"
      title="Add a Module"
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <div className=" bg-white p-4 rounded-md shadow-md dark:bg-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add a title for this module.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Course Code" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add a Course Code associated with this module
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Module Code" {...field} />
                  </FormControl>
                  <FormDescription>Add a module code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Course ID" {...field} />
                  </FormControl>
                  <FormDescription>Add a course ID</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Course Category</FormLabel>
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
                            ? categoryType.find(
                                (category) => category.value === field.value
                              )?.label
                            : "Select a category"}
                          <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search a category..." />
                        <CommandEmpty>No category type found.</CommandEmpty>
                        <CommandGroup>
                          {categoryType.map((category) => (
                            <CommandItem
                              value={category.label}
                              key={category.value}
                              onSelect={() => {
                                form.setValue("category", category.value);
                              }}
                            >
                              <BsCheckLg
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.label}
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
            <div>
              <FormLabel>Add Tags (one each time)</FormLabel>
              <div className="grid grid-cols-3">
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input
                      placeholder="Tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                  </FormControl>
                  {tags.length ? (
                    <ul className="list-none flex flex-wrap space-x-2">
                      {tags.map((value, index) => {
                        return (
                          <li key={index} className="">
                            <Badge>{value}</Badge>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </FormItem>
                <Button onClick={addTags} type="button">
                  Add Tag
                </Button>
              </div>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </DialogWrapper>
  );
};

export default AddModule;
