export default async function getSoloSetlist(setlistId: string) {
  try {
    const res = await fetch(`/api/setlist/${setlistId}`);

    if (!res.ok) {
      throw new Error('Failed to fetch setlist');
    }

    const data = await res.json();

    if (!data.success) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
