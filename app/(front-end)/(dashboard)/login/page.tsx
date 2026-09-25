
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import Logo from "@/shared/components/dashboard/Logo";
import LoginForm from "@/features/auth/components/LoginForm";

export default function Login() {

  return (
    <div className="flex min-h-screen items-center justify-center px-auto">
      <Card className="w-full max-w-sm mx-5">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-18 flex items-center justify-center relative  w-64 md:w-68 h-20">
            <Logo />
          </div>

          <CardTitle className="text-3xl font-semibold">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            Sign in to your account to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}