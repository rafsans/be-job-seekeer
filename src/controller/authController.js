import { success, error } from "../utils/response.js";
import {
  register,
  login,
  changeEmail,
  changePassword,
  registerFace,
  loginWithFace,
} from "../services/auth/authServices.js";
export async function registerHandler(req, res) {
  try {
    const { email, password, role } = req.body;
    const result = await register({ email, password, role });
    return success(201, res, result, "User registered successfully");
  } catch (e) {
    if (e.code === "CONFLICT") {
      return error(409, res, e.message);
    }
    return error(500, res, "Internal server error");
  }
}
export async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    const result = await login({ email, password });
    return success(200, res, result, "Login successful");
  } catch (e) {
    if (e.code === "UNAUTHORIZED") {
      return error(401, res, e.message);
    }
    return error(500, res, "Internal server error", e.message);
  }
}
export async function changeEmailHandler(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return error(401, res, "Unauthorized");
    }
    const { new_email, current_password } = req.body;
    await changeEmail(userId, new_email, current_password);
    return success(200, res, null, "Email changed successfully");
  } catch (e) {
    if (e.code === "CONFLICT") return error(409, res, e.message);
    if (e.code === "UNAUTHORIZED") return error(401, res, e.message);
    if (e.code === "NOT_FOUND") return error(404, res, e.message);
    return error(500, res, "Internal server error");
  }
}
export async function changePasswordHandler(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return error(401, res, "Unauthorized");
    }
    const { current_password, new_password } = req.body;
    await changePassword(userId, current_password, new_password);
    return success(200, res, null, "Password changed successfully");
  } catch (e) {
    if (e.code === "UNAUTHORIZED") return error(401, res, e.message);
    if (e.code === "NOT_FOUND") return error(404, res, e.message);
    return error(500, res, "Internal server error");
  }
}

export async function registerFaceHandler(req, res) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return error(401, res, "Unauthorized");
    }
    const { faceDescriptor } = req.body;
    if (!faceDescriptor || !Array.isArray(faceDescriptor)) {
      return error(400, res, "Invalid face descriptor");
    }
    
    await registerFace(userId, faceDescriptor);
    return success(200, res, null, "Face registered successfully");
  } catch (e) {
    console.error("registerFace error: ", e);
    if (e.code === "NOT_FOUND") return error(404, res, e.message);
    return error(500, res, "Internal server error");
  }
}

export async function loginWithFaceHandler(req, res) {
  try {
    const { faceDescriptor } = req.body;
    if (!faceDescriptor || !Array.isArray(faceDescriptor)) {
      return error(400, res, "Invalid face descriptor");
    }
    
    const result = await loginWithFace(faceDescriptor);
    return success(200, res, result, "Face login successful");
  } catch (e) {
    if (e.code === "UNAUTHORIZED") {
      return error(401, res, e.message);
    }
    return error(500, res, "Internal server error");
  }
}
