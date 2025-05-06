"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Skeleton,
  Tabs,
  TabsList,
  TabsTrigger,
  Progress,
  Indicator,
  Input,
  Textarea,
} from "@/lib/ui";
import { useEffect, useState } from "react";
import { Paintbrush } from "lucide-react";

export default function Styleguide() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputIsLoading, setInputIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 2) % 100);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const progress2 = (progress * 2) % 100;
  const progress3 = 100 - progress;
  const total = progress + progress2 + progress3;

  return (
    <div className="space-y-8 p-3 sm:p-5 md:p-8">
      <div>
        <h2 className="font-title mb-3 text-2xl font-bold tracking-wide">
          <Paintbrush className="mb-1 inline size-9" /> Page Title
        </h2>
        <p className="mb-4 text-xl leading-tight font-medium">
          Page description is here with a bunch of bla bla blas so you can see
          how the page description looks like without your typical ipsum lorem.
          If you really loved the ipsum lorem we formally apologize for the
          inconvenience. We&apos;re sorry for the inconvenience and we&apos;re
          really sorry for the inconvenience.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <h2 className="bg-primary text-primary-foreground p-2">Primary</h2>
        <h2 className="bg-secondary text-secondary-foreground p-2">
          Secondary
        </h2>
        <h2 className="bg-tertiary text-destructive-foreground p-2">
          Tertiary
        </h2>
        <h2 className="border-border bg-background text-foreground border p-2">
          Background
        </h2>
        <h2 className="bg-foreground text-background p-2">Foreground</h2>
        <h2 className="bg-light text-foreground p-2">Light</h2>
        <h2 className="bg-lighter text-light-foreground p-2">Lighter</h2>
        <h2 className="bg-lightest text-lightest-foreground p-2">Lightest</h2>

        <h2 className="bg-muted text-muted-foreground p-2">Muted</h2>

        <h2 className="bg-destructive text-destructive-foreground p-2">
          Destructive
        </h2>
      </div>
      <div>
        <Progress className="mt-2" variant="primary" value={progress} />
        <p className="text-sm">{progress}%</p>
        <Progress className="mt-2" variant="lightest" value={progress2} />
        <p className="text-sm">{progress2}%</p>
        <Progress className="mt-2" variant="secondary" value={progress3} />
        <p className="text-sm">{progress3}%</p>

        <Progress className="mt-2 leading-[0]">
          <Indicator
            variant="primary"
            className="inline-block"
            style={{
              width: `${(progress / total) * 100}%`,
            }}
          />
          <Indicator
            variant="lightest"
            className="inline-block"
            style={{
              width: `${(progress2 / total) * 100}%`,
            }}
          />
          <Indicator
            className="inline-block"
            variant="white"
            style={{ width: `${(progress3 / total) * 100}%` }}
          />
        </Progress>
        <p className="flex flex-wrap gap-x-2 text-sm">
          <span>
            <span className="bg-primary inline-block size-2 rounded-full" />{" "}
            {((progress / total) * 100).toFixed(0)}% Primary
          </span>
          <span>
            <span className="bg-lightest inline-block size-2 rounded-full" />{" "}
            {((progress2 / total) * 100).toFixed(0)}% Lightest
          </span>
          <span>
            <span className="inline-block size-2 rounded-full bg-white" />{" "}
            {((progress3 / total) * 100).toFixed(0)}% White
          </span>
        </p>
      </div>
      <div className="max-w-xl">
        <h2 className="mb-2 text-xl">Input states</h2>
        <div className="mb-3 flex items-center space-x-2">
          <Checkbox
            onCheckedChange={(checked) => setInputIsLoading(!!checked)}
            checked={inputIsLoading}
            id="loading"
          />
          <label
            htmlFor="loading"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Loading
          </label>
        </div>
        <label
          htmlFor="left-align"
          className="text-muted-foreground mb-1 block text-sm font-medium"
        >
          Small Input
        </label>
        <Input
          size="sm"
          className="mb-3"
          id="left-align"
          loading={inputIsLoading}
          placeholder="Placeholder text"
          startAdornment={<span className="px-2 text-xs">Start Adornment</span>}
          endAdornment={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mr-1 text-sm"
            >
              Max
            </Button>
          }
        />
        <label
          htmlFor="left-align"
          className="text-muted-foreground mb-1 block text-sm font-medium"
        >
          Left Aligned Input (Default)
        </label>
        <Input
          className="mb-3"
          id="left-align"
          loading={inputIsLoading}
          placeholder="Placeholder text"
          startAdornment={<span className="px-2">Start Adornment</span>}
          endAdornment={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mr-1 text-sm"
            >
              Max
            </Button>
          }
        />
        <label
          htmlFor="right-align"
          className="text-muted-foreground mb-1 block text-sm font-medium"
        >
          Right Aligned Input
        </label>
        <Input
          className="mb-3"
          id="right-align"
          align="right"
          loading={inputIsLoading}
          placeholder="Placeholder text"
          startAdornment={<span className="px-2">Start Adornment</span>}
          endAdornment={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mr-1 text-sm"
            >
              Max
            </Button>
          }
        />
        <label
          htmlFor="left-align"
          className="text-muted-foreground mb-1 block text-sm font-medium"
        >
          Large Input
        </label>
        <Input
          size="lg"
          className="mb-3"
          id="left-align"
          loading={inputIsLoading}
          placeholder="Placeholder text"
          startAdornment={<span className="px-2">Start Adornment</span>}
          endAdornment={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mr-1 text-sm"
            >
              Max
            </Button>
          }
        />

        <label
          htmlFor="textarea"
          className="text-muted-foreground mb-1 block text-sm font-medium"
        >
          Textarea
        </label>
        <Textarea id="textarea" placeholder="Placeholder text" />
      </div>
      <div className="max-w-xl">
        <label
          htmlFor="textarea"
          className="text-muted-foreground mb-1 block text-sm font-medium"
        >
          Dropdown
        </label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <h2 className="mb-2 text-xl">Button States</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={(checked) => setIsLoading(!!checked)}
              checked={isLoading}
              id="loading"
            />
            <label
              htmlFor="loading"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Loading
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={(checked) => setIsDisabled(!!checked)}
              checked={isDisabled}
              id="disabled"
            />
            <label
              htmlFor="disabled"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Disabled
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button loading={isLoading} disabled={isDisabled}>
          Default
        </Button>
        <Button loading={isLoading} disabled={isDisabled} variant="outline">
          Outline
        </Button>
        <Button
          loading={isLoading}
          disabled={isDisabled}
          variant="destructive-outline"
        >
          Destructive Outline
        </Button>
        <Button loading={isLoading} disabled={isDisabled} variant="borderless">
          Borderless
        </Button>
        <Button loading={isLoading} disabled={isDisabled} variant="ghost">
          Ghost
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <div>
        <h2 className="mb-4 text-xl">Skeleton</h2>
        <div className="flex gap-3">
          <Skeleton className="size-20 rounded-full"></Skeleton>
          <div className="flex flex-col">
            <Skeleton className="mb-3 h-6 w-64" variant="primary"></Skeleton>
            <Skeleton className="mb-2 h-4 w-48"></Skeleton>
            <Skeleton className="h-4 w-48"></Skeleton>
          </div>
        </div>
      </div>
      <div>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex gap-8">
        <div className="space-y-2">
          <h2 className="font-title text-4xl leading-tight">Raleway (Title)</h2>
        </div>
        <div>
          <h2 className="text-4xl font-bold">Montserrat Bold</h2>
          <h2 className="text-4xl font-medium">Montserrat Medium</h2>
          <h2 className="text-4xl font-normal">Montserrat Normal</h2>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-xl">Table State</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={(checked) => setTableLoading(!!checked)}
              checked={tableLoading}
              id="table-loading"
            />
            <label
              htmlFor="table-loading"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Loading
            </label>
          </div>
        </div>
      </div>
      {tableLoading ? (
        <TableSkeleton cols={4} rows={4} />
      ) : (
        <Table>
          <TableCaption>Table of a list of invoices</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV002</TableCell>
              <TableCell>Unpaid</TableCell>
              <TableCell>PayPal</TableCell>
              <TableCell className="text-right">$500.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV003</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$750.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV004</TableCell>
              <TableCell>Unpaid</TableCell>
              <TableCell>PayPal</TableCell>
              <TableCell className="text-right">$1,000.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}
