db.genre.updateMany(
  {},
  { $rename: { "name": "title" } }
)
