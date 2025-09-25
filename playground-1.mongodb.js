db.getCollection("song").updateMany(
  { isTranslation: { $type: "string" } }, 
  { $set: { isTranslation: false } }
)
