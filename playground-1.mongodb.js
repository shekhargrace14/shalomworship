db.getCollection("song").updateMany(
  { bpm: { $type: "int" } },   // only match integer values
  [
    { $set: { bpm: { $toString: "$bpm" } } }
  ]
)
