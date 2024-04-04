"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";

import toast from "react-hot-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@prisma/client";

type Props = {
  project: Project;
  userId: string;
};

const AddProjectWorkLinks = ({ project, userId }: Props) => {
  const router = useRouter();

  const [links, setLink] = useState<string[]>([]);
  const [linkInput, setLinkInput] = useState("");

  const addlinks = () => {
    const tempData = [...links]; // Create a new array using spread syntax
    tempData.push(linkInput);
    setLink(tempData); // Update the state with the new array
    setLinkInput("");
  };

  const projectTitle = project.title;
  const projectId = project.id;

  const formSchema = z.object({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedValues = {
        ...values,
        links,
        userId,
        projectId,
        projectTitle,
      };

      const res = await fetch("/api/pmarks", {
        method: "POST",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("Links  Added", { duration: 4000 });
        form.reset();
        setLink([]);
        setLinkInput("");
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
    <div className=" bg-white p-4 rounded-md shadow-md dark:bg-black">
      <div className="">
        <h3 className="mb-2 text-lg font-extrabold leading-tight  lg:text-2xl">
          Done with the Tasks? Add your work URL Links below for grading
        </h3>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <FormLabel>Add URLs here (one each time)</FormLabel>
            <div className="grid grid-cols-3">
              <FormItem className="col-span-2">
                <FormControl>
                  <Input
                    placeholder="links"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                  />
                </FormControl>
                {links.length ? (
                  <ul className="list-none flex flex-wrap space-x-2">
                    {links.map((value, index) => {
                      return (
                        <li key={index}>
                          <Badge>{value}</Badge>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </FormItem>
              <Button onClick={addlinks} type="button" className="max-w-[80px]">
                Add link
              </Button>
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProjectWorkLinks;
