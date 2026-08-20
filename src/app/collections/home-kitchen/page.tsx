import { redirect } from "next/navigation";

export default function HomeKitchenRedirect() {
  redirect("/collections/all");
}
