"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { api } from "@/trpc/react";
import { createCounterSchema } from "@/validators/counter";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-600">
          {field.state.meta.errors.map((e) => e.message).join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

const CreateCounterForm = () => {
  const createCounter = api.counter.create.useMutation();
  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onChange: createCounterSchema,
    },
    onSubmit: async ({ value }) =>
      createCounter.mutateAsync({ name: value.name }),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="mx-auto max-w-md rounded-md border bg-white p-6 shadow-md"
    >
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Create</h1>
      <div className="mb-4">
        <form.Field
          name="name"
          children={(field) => (
            <>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Counter Name:
              </label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full rounded-md border p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <FieldInfo field={field} />
            </>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors ${
              !canSubmit
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "..." : "Add"}
          </button>
        )}
      />
    </form>
  );
};

export default CreateCounterForm;
