"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ErrorPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl">SUM TING WONG</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                    Something went wrong. Please try again.
                </CardContent>
                <CardFooter>
                    <Link href="/" className={cn(buttonVariants(), "w-full")}>
                        Go back home
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
