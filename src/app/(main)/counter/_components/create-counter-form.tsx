"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { api } from "@/trpc/react";
import { createCounterSchema } from "@/validators/counter";

const isBrowser = typeof window !== "undefined";

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
  const utils = api.useUtils();
  const createCounter = api.counter.create.useMutation({
    onMutate: (counter) => {
      utils.counter.list.setData(undefined, (data) => {
        const newData = data
          ? [...data, { ...counter, value: 0 }]
          : [{ ...counter, value: 0 }];
        return newData.sort((a, b) => a.name.localeCompare(b.name));
      });
    },
    onSuccess: () => {
      utils.counter.list.refetch();
    },
  });
  const form = useForm({
    defaultValues: {
      name: "",
      uri: "",
    },
    validators: {
      onChange: createCounterSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      await createCounter.mutateAsync(value);
      formApi.reset();
    },
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div>
      <h1 className="heading mb-3 text-3xl font-bold">Create Counter</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="max-w-2xl rounded-md border bg-white p-6 shadow-md"
      >
        <div className="mb-4">
          <form.Field
            name="name"
            children={(field) => (
              <>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Display Name:
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    if (!form.fieldInfo.uri.instance?.getMeta().isTouched) {
                      form.setFieldValue(
                        "uri",
                        e.target.value
                          .toLocaleLowerCase()
                          .replaceAll(" ", "-")
                          .replaceAll(/[^a-z0-9\-_]/g, ""),
                        {
                          dontUpdateMeta: true,
                        },
                      );
                    }

                    field.handleChange(e.target.value);
                  }}
                  className="w-full rounded-md border p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>

        <div className="mb-4">
          <form.Field
            name="uri"
            children={(field) => (
              <>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Uri:
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full rounded-md border p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Url:{" "}
                  <code>http://localhost:3000/counter/{field.state.value}</code>
                </p>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      `${isBrowser && window.location.origin}/counter/${field.state.value}`,
                    )
                  }
                  className="mt-2 cursor-pointer rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                >
                  Copy to Clipboard
                </button>
                <br />
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
    </div>
  );
};

export default CreateCounterForm;
