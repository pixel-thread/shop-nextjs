import { prisma } from "@/lib/db";

type Props = {
  id: string;
  title: string;
};

export async function updateCategory({ id, title }: Props) {
  return await prisma.category.update({
    where: { id },
    data: { title },
  });
}
