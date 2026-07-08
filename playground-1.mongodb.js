db.SongCategory.aggregate([
  {
    $group: {
      _id: {
        songId: '$songId',
        categoryId: '$categoryId',
      },
      count: { $sum: 1 },
    },
  },
  {
    $match: {
      count: { $gt: 1 },
    },
  },
]);
