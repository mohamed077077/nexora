// c:\Users\alifb\Desktop\store\lib\addUser\Form.tsx
"use client";

import { useActionState } from "react";
import { createUser } from "./Action";

export default function AddUserForm() {
  const [state, formAction, isPending] = useActionState(createUser, null);

  return (
    <main>
      <h1>Create Test User</h1>

      <form action={formAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="test@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="123456"
            required
          />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create User"}
        </button>

        {state?.message && (
          <p style={{ color: state.success ? "green" : "red" }}>
            {state.message}
          </p>
        )}
      </form>
    </main>
  );
}
