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

import toast from "react-hot-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import DialogWrapper from "@/components/Common/DialogWrapper";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { BsCheckLg } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PiCaretUpDownBold } from "react-icons/pi";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const AddTasks = () => {
  const router = useRouter();
  const [reqs, setReq] = useState<string[]>([]);
  const [reqInput, setReqInput] = useState("");
  const [open, setOpen] = useState(false);

  const addReqs = () => {
    const tempData = [...reqs]; // Create a new array using spread syntax
    tempData.push(reqInput);
    setReq(tempData); // Update the state with the new array
    setReqInput("");
  };

  const programmingLang = [
    { label: "JavaScript", value: "javascript" },
    { label: "Typescript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "Sql", value: "sql" },
    { label: "Css", value: "css" },
    { label: "HTML", value: "html" },
    { label: "XML", value: "xml" },
  ];

  const formSchema = z.object({
    title: z
      .string({
        required_error: "Please add a Title.",
      })
      .max(500),

    question: z.string({
      required_error: "Please add a task question.",
    }),
    markingScheme: z.string({
      required_error: "Please add a  question for the Reveiw",
    }),
    projectId: z
      .string({
        required_error: "Please add a project Id.",
      })
      .trim(), //remove whitespaces as we will use this for searching
    demo: z.string(),
    progLang: z.string(),
    number: z.coerce.number({
      required_error: "Please add a question number.",
    }),
    possiblePoint: z.coerce.number({
      required_error: "Please add a possible score.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: "",
      title: "",
      question: "",
      demo: "",
      number: 0,
      possiblePoint: 0,
      progLang: "",
      markingScheme: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values,
        requirements: reqs,
      };

      const res = await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("Task Added", { duration: 4000 });
        form.reset();
        setReq([]);
        setReqInput("");
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
      btnTitle="Add a Task"
      title="Add a Task"
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <div className=" bg-white p-4 rounded-md shadow-md dark:bg-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Project ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add a Project ID associated with this task
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription>Add a title for this Task.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Question" {...field} />
                  </FormControl>
                  <FormDescription>Add a Question</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="markingScheme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question for Review</FormLabel>
                  <FormControl>
                    <Input placeholder="Review Question" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add Question for the Reviewer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Question Number"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Add a Question Number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="progLang"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Programming Language</FormLabel>
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
                            ? programmingLang.find(
                                (programmingLang) =>
                                  programmingLang.value === field.value
                              )?.label
                            : "Select a programmingLang"}
                          <PiCaretUpDownBold className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search a programming Lang..." />
                        <CommandEmpty>No Language type found.</CommandEmpty>
                        <CommandGroup>
                          {programmingLang.map((programmingLang) => (
                            <CommandItem
                              value={programmingLang.label}
                              key={programmingLang.value}
                              onSelect={() => {
                                form.setValue(
                                  "progLang",
                                  programmingLang.value
                                );
                              }}
                            >
                              <BsCheckLg
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  programmingLang.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {programmingLang.label}
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

            <FormField
              control={form.control}
              name="possiblePoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Possible Score</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Possible Scores"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Add possible points</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Add Requirements (one each time)</FormLabel>
              <div className="grid grid-cols-3">
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input
                      placeholder="Requirements"
                      value={reqInput}
                      onChange={(e) => setReqInput(e.target.value)}
                    />
                  </FormControl>
                  {reqs.length ? (
                    <ul className="list-none flex flex-col">
                      {reqs.map((value, index) => {
                        return (
                          <li key={index} className="">
                            <Badge>{value}</Badge>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </FormItem>
                <Button onClick={addReqs} type="button">
                  Add Reqs
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="demo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Output</FormLabel>
                  <FormControl>
                    <Input placeholder="Expected Output" {...field} />
                  </FormControl>
                  <FormDescription>Add an expected output</FormDescription>
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
export default AddTasks;
