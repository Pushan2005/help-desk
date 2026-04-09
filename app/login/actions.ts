"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error("Login error:", error);
        // Handle login error (e.g., show an error message to the user)
        redirect("/error");
    } else {
        console.log("Login successful:", data);
        redirect("/");
    }
}

export async function signup(formData: FormData) {
    // TODO: Implement signup logic
    // for now, we'll set up dummy accounts for testing before allowing sign-ups
    // leaving this here incase required later
}
