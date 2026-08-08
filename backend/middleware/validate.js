// This actually validate the user and contains logic

const validate = (schema) => (req, res, next) => {
  
  const data=req.method==="GET"?req.query:req.body;

  const result = schema.safeParse(data);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (req.method === "GET") {
    req.query = result.data;
  } 
  else {
    req.body = result.data;
  }

  next();
};

module.exports = validate;
