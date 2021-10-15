import bcrypt from "bcrypt";
export const hashPassword = async (user) => {
  const password = user.password;
  const saltRounds = 12;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export const checkHashpass = async (inputPass, RealuserPass) =>
  await bcrypt.compare(inputPass, RealuserPass);
