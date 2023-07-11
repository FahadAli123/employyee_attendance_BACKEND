const hello = async (req, res, next) => {
  console.log("hello");
  const result = {
    message: "Hello test",
  };
  try {
    res.status(200).send(result);
  } catch (e) {
    next({
      msgCode: "Failed to created one time purchase.",
      status: 400,
      data: JSON.stringify(e),
    });
  }
};

module.exports = {
  hello,
};
