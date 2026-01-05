db.song.find(
  { searchVariant: { $exists: true } },
  { searchVariant: 1 }
)
