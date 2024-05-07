"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logOut() {
	cookies().delete("accesstoken");
	cookies().delete("username");
	revalidatePath("/");
	redirect("/"); // cant redirect here. need to clear context on client
}
