import { prisma } from "@/lib/db";

type Props = {
  name: string;
};
export async function getCategoryByName({ name }: Props) {
  return prisma.category.findFirst({
    where: { title: { equals: name, mode: "insensitive" } },
  });
}
