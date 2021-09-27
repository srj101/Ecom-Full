import bcrypt from "bcrypt";
export const hashPassword = async (user) => {
  const password = user.password;
  const saltRounds = 10;

  const hashedPassword = bcrypt.hash(
    password,
    saltRounds,
    function (err, hash) {
      if (err) {
        return err;
      }

      return hash;
    }
  );

  return hashedPassword;
};

export const checkHashpass = async (inputPass, RealuserPass) =>
  await bcrypt.compare(inputPass, RealuserPass);
