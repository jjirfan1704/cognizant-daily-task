// Task 1: Create Database and Insert Documents

use("college_nosql");

db.feedback.insertMany([
  {
    student_id: 1,
    course_code: "CS101",
    semester: "2022-ODD",
    rating: 5,
    comments: "Excellent teaching",
    tags: ["challenging", "well-structured"],
    submitted_at: new Date("2022-11-30"),
    attachments: [{ filename: "notes.pdf", size_kb: 240 }]
  },
  {
    student_id: 2,
    course_code: "CS101",
    semester: "2022-ODD",
    rating: 4,
    comments: "Very informative",
    tags: ["challenging", "good-examples"],
    submitted_at: new Date("2022-11-28"),
    attachments: [{ filename: "slides.pdf", size_kb: 180 }]
  },
  {
    student_id: 3,
    course_code: "CS101",
    semester: "2022-ODD",
    rating: 3,
    comments: "Average",
    tags: ["practice"],
    submitted_at: new Date("2022-11-20"),
    attachments: [{ filename: "lab.pdf", size_kb: 120 }]
  },
  {
    student_id: 4,
    course_code: "CS102",
    semester: "2022-ODD",
    rating: 5,
    comments: "Loved the DB labs",
    tags: ["hands-on", "challenging"],
    submitted_at: new Date("2022-12-01"),
    attachments: [{ filename: "db.pdf", size_kb: 200 }]
  },
  {
    student_id: 5,
    course_code: "CS102",
    semester: "2022-ODD",
    rating: 2,
    comments: "Needs improvement",
    tags: ["difficult"],
    submitted_at: new Date("2022-11-18"),
    attachments: [{ filename: "review.pdf", size_kb: 100 }]
  },
  {
    student_id: 6,
    course_code: "EC101",
    semester: "2021-EVEN",
    rating: 4,
    comments: "Good",
    tags: ["electronics"],
    submitted_at: new Date("2021-10-10"),
    attachments: [{ filename: "ec.pdf", size_kb: 90 }]
  },
  {
    student_id: 7,
    course_code: "ME101",
    semester: "2022-ODD",
    rating: 1,
    comments: "Very hard",
    tags: ["mechanics"],
    submitted_at: new Date("2022-11-15"),
    attachments: [{ filename: "me.pdf", size_kb: 150 }]
  },
  {
    student_id: 8,
    course_code: "CS103",
    semester: "2022-ODD",
    rating: 5,
    comments: "Excellent",
    tags: ["oop", "coding"],
    submitted_at: new Date("2022-11-16"),
    attachments: [{ filename: "oop.pdf", size_kb: 220 }]
  },
  {
    student_id: 9,
    course_code: "EC101",
    semester: "2022-ODD",
    rating: 3,
    comments: "Nice course",
    tags: ["circuits"],
    submitted_at: new Date("2022-11-12"),
    attachments: [{ filename: "ckt.pdf", size_kb: 140 }]
  },
  {
    student_id: 10,
    course_code: "CS102",
    semester: "2022-ODD",
    rating: 4,
    comments: "Good content",
    tags: ["database", "sql"],
    submitted_at: new Date("2022-11-25")
  }
]);

db.feedback.countDocuments();

// Task 2: CRUD Operations

db.feedback.find({ rating: 5 });

db.feedback.find({
  course_code: "CS101",
  tags: "challenging"
});

db.feedback.find(
  {},
  {
    student_id: 1,
    course_code: 1,
    rating: 1,
    _id: 0
  }
);

db.feedback.updateMany(
  { rating: { $lt: 3 } },
  { $set: { needs_review: true } }
);

db.feedback.updateMany(
  { needs_review: true },
  { $push: { tags: "reviewed" } }
);

db.feedback.deleteMany({
  semester: "2021-EVEN"
});

// Task 3: Aggregation Pipeline

db.feedback.aggregate([
  { $match: { semester: "2022-ODD" } },
  {
    $group: {
      _id: "$course_code",
      avg_rating: { $avg: "$rating" },
      total_feedback: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      course_code: "$_id",
      average_rating: { $round: ["$avg_rating", 1] },
      total_feedback: 1
    }
  },
  { $sort: { average_rating: -1 } }
]);

db.feedback.aggregate([
  { $unwind: "$tags" },
  {
    $group: {
      _id: "$tags",
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } }
]);

db.feedback.createIndex({ course_code: 1 });

db.feedback.find({ course_code: "CS101" }).explain("executionStats");
