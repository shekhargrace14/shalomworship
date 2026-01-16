db.song.updateMany(
  { searchVariant: { $not: { $type: "array" } } },
  { $set: { searchVariant: null } }
)
