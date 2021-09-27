import jwt from "jsonwebtoken";
export const createTokens = (user) => {
  const accessToken = jwt.sign({ userId: user.id }, "SUPER_SECRETTTT", {
    expiresIn: "5min",
  });
  const refreshToken = jwt.sign(
    { userId: user.id, count: user.count },
    "SUPER_SECRETTTTTT",
    {
      expiresIn: "7d",
    }
  );
  return { refreshToken, accessToken };
};
