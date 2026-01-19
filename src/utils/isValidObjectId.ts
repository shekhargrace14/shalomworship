export const isValidObjectId = (id: string) =>
  /^[a-f0-9]{24}$/i.test(id);