const handleUnexpectedError = (_, res, next) => {
  try {
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ detail: "Server error" });
  }
};

export { handleUnexpectedError };
