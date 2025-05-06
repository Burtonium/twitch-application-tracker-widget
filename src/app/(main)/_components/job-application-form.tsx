"use client";

import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  cn,
  FormMessage,
} from "@/lib/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createJobApplicationSchema } from "@/validators/jobApplication";
import { api } from "@/trpc/react";
import useJobApplications from "@/hooks/useJobApplications";

type CreateJobApplication = z.infer<typeof createJobApplicationSchema>;

export const CreateJobApplication = () => {
  const { create } = useJobApplications();

  const createScheduleForm = useForm<CreateJobApplication>({
    defaultValues: {
      status: "Pending",
      company: "",
      title: "",
      url: "",
    },
    resolver: zodResolver(createJobApplicationSchema),
  });

  const onSubmit = async (values: CreateJobApplication) => {
    await create.mutateAsync({
      ...values,
    });
    createScheduleForm.reset();
  };

  return (
    <Form {...createScheduleForm}>
      <form
        onSubmit={createScheduleForm.handleSubmit(onSubmit)}
        className="flex items-center gap-3"
      >
        <FormField
          control={createScheduleForm.control}
          name="company"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={cn("w-full", {
                    "border-destructive": formState.errors.company,
                  })}
                />
              </FormControl>
              <div className="h-8">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={createScheduleForm.control}
          name="title"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={cn("w-full", {
                    "border-destructive": formState.errors.title,
                  })}
                />
              </FormControl>
              <div className="h-8">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={createScheduleForm.control}
          name="url"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={cn("w-full", {
                    "border-destructive": formState.errors.url,
                  })}
                />
              </FormControl>
              <div className="h-8">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button className="mb-4" type="submit" loading={create.isPending}>
          Add
        </Button>

        <p className="text-destructive empty:hidden">{create.error?.message}</p>
      </form>
    </Form>
  );
};
