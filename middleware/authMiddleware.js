import {
  BadRequestError,
  UnauthenticatedError,
  UnauthiruzedError,
} from "../errors/customError.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, rol } = verifyJWT(token);
    const testUser = userId === "654d17b170b7f715c983d026";
    req.user = { userId, rol, testUser };

    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      throw new UnauthiruzedError("Unauthorized to access to this route");
    }
    console.log(roles);

    next();
  };
};

export const chechForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User. Read Only!");
  next();
};
