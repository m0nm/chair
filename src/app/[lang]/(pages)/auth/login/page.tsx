"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/app/_components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.promise(
      async () => {
        setTimeout(() => {
          if (Math.random() >= 0.5) {
            throw "Login failed";
          }
          return true;
        }, 5000);
      },
      {
        loading: "Logging in...",
        success: `Logged in successfully by ${data.email}`,
        error: "Login failed",
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="mx-auto mb-4 text-center"
            />

            <CardTitle className="text-center text-2xl font-bold">
              Login
            </CardTitle>
            <CardDescription>
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem {...field}>
                    <div className="space-y-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="user@email.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem {...field}>
                    <div className="space-y-2">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button className="mt-4 w-full" type="submit">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
