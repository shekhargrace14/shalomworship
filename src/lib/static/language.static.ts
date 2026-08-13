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

export async function getLanguage(code: string) {
  try {
    return await prisma.language.findUnique({
      where: {
        code: code,
      },
      include: {
        songs: true,
      },
    });
  } catch (error: any) {
    console.error(error, 'error from all languages server action');
  }
}
