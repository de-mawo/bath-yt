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
import { Textarea } from "@/components/ui/textarea";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import DialogWrapper from "@/components/Common/DialogWrapper";
import { BsCheckLg } from "react-icons/bs";
import { PiCaretUpDownBold } from "react-icons/pi";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const AddProjects = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [tags, setTag] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [reqs, setReq] = useState<string[]>([]);
  const [reqInput, setReqInput] = useState("");
  const [resources, setResources] = useState<string[]>([]);
  const [resourcesInput, setResourcesInput] = useState("");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [objectivesInput, setObjectivesInput] = useState("");

  const addTags = () => {
    const tempData = [...tags]; // Create a new array using spread syntax
    tempData.push(tagInput);
    setTag(tempData); // Update the state with the new array
    setTagInput("");
  };

  const addReqs = () => {
    const tempData = [...reqs]; // Create a new array using spread syntax
    tempData.push(reqInput);
    setReq(tempData); // Update the state with the new array
    setReqInput("");
  };

  const addResources = () => {
    const tempData = [...resources]; // Create a new array using spread syntax
    tempData.push(resourcesInput);
    setResources(tempData); // Update the state with the new array
    setResourcesInput("");
  };

  const addObjectives = () => {
    const tempData = [...objectives]; // Create a new array using spread syntax
    tempData.push(objectivesInput);
    setObjectives(tempData); // Update the state with the new array
    setObjectivesInput("");
  };

 
  const formSchema = z.object({
    moduleId: z.string({
      required_error: "Please add a module ID.",
    }),
    courseCode: z
      .string({
        required_error: "Please add a Course code.",
      })
      .trim(), //remove whitespaces as we will use this for searching
    title: z
      .string({
        required_error: "Please add a Title.",
      })
      .max(500),

    category: z.string({
      required_error: "Please select a category Type.",
    }),

    code: z
      .string({
        required_error: "Please add a project code.",
      })
      .trim(), //remove whitespaces as we will use this for searching

    description: z.string({
      required_error: "Please select a description.",
    }),
  
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      code: " ",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values,
        tags,
        requirements: reqs,
        resources,
        objectives,
      };

      const res = await fetch("/api/project", {
        method: "POST",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("Project Added", { duration: 4000 });
        form.reset();
        setTag([]);
        setTagInput("");
        setReq([]);
        setReqInput("");
        setObjectives([]);
        setObjectivesInput("");
        setResources([]);
        setResourcesInput("");
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
      btnTitle="Add a Project"
      title="Add a Project"
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <div className=" bg-white p-4 rounded-md shadow-md dark:bg-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="moduleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Module ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Module ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add a Module ID associated with this project
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
                    Add a Course Code associated with this project
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
                  <FormDescription>Add a title to the Project.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Code" {...field} />
                  </FormControl>
                  <FormDescription>Add a code for this Project</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe briefly the Project details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Project Category</FormLabel>
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
                  Add Requirement
                </Button>
              </div>
            </div>

            <div>
              <FormLabel>Add Resource URLs (one each time)</FormLabel>
              <div className="grid grid-cols-3">
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input
                      placeholder="Resources"
                      value={resourcesInput}
                      onChange={(e) => setResourcesInput(e.target.value)}
                    />
                  </FormControl>
                  {resources.length ? (
                    <ul className="list-none flex flex-col">
                      {resources.map((value, index) => {
                        return (
                          <li key={index} className="">
                            <Badge>{value}</Badge>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </FormItem>
                <Button onClick={addResources} type="button">
                  Add Resource
                </Button>
              </div>
            </div>

            <div>
              <FormLabel>Add Objectives (one each time)</FormLabel>
              <div className="grid grid-cols-3">
                <FormItem className="col-span-2">
                  <FormControl>
                    <Input
                      placeholder="Objectives"
                      value={objectivesInput}
                      onChange={(e) => setObjectivesInput(e.target.value)}
                    />
                  </FormControl>
                  {objectives.length ? (
                    <ul className="list-none flex flex-col">
                      {objectives.map((value, index) => {
                        return (
                          <li key={index} className="">
                            <Badge>{value}</Badge>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </FormItem>
                <Button onClick={addObjectives} type="button">
                  Add Objective
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

export default AddProjects;
