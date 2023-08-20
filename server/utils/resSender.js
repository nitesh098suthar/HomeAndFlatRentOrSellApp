//sending response along with cookie and jwttoken
export const resSender = (statusCode, user, msg='success', res) => {
  const token = user.genToken();

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    sameSite: "none",
    secure: true,
    httpOnly: true,
  };

  res
    .status(Number(statusCode))
    .cookie("token", token, cookieOptions)
    .json({ success: true, msg, user });
};
