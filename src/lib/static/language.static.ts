import { StatusType } from '@prisma/client';
import prisma from './prisma';

export async function getAllLanguages() {
  try {
    return await prisma.language.findMany({
      include: {
        songs: true,
      },
    });
  } catch (error: any) {
    console.error(error, 'error from all languages server action');
  }
}

export async function getLanguage(code: string, statuses: StatusType[]) {
  try {
    return await prisma.language.findUnique({
      where: {
        code,
      },
      include: {
        songs: {
          where: {
            song: {
              status: {
                in: statuses,
              },
            },
          },
          include: {
            song: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error, 'error from language server action');
    throw error;
  }
}
