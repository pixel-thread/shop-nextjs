import { prisma } from "@/lib/db";

type Props = {
  title: string;
};

export async function createCategory({ title }: Props) {
  return await prisma.category.create({ data: { title } });
}
