
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

import Logo from "@/shared/components/Logo";
import LoginForm from "@/features/auth/components/LoginForm";

export default function Login() {

  return (
    <div className="flex min-h-screen items-center justify-center  px-4">
      <Card className="w-full max-w-sm ">
        <CardHeader className="space-y-2 text-center">
          {/* Logo */}
          <div className="mx-auto mb-12 flex items-center justify-center">
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