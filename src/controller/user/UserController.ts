import {
  getAllUsers,
  getUserById,
  createUser,
} from "../../services/user/userServices.js";
import { Request, Response } from "express";
import { success, error } from "../../utils/response.js";

export async function getAll(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    return success(200, res, users);
  } catch (e) {
    return error(500, res, "Internal server error");
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const user = await getUserById(req.params.id as string);
    return success(200, res, user);
  } catch (e) {
    return error(500, res, "Internal server error");
  }
}

export async function create(req: Request, res: Response) {
  try {
    req.accepts(["application/json", "text/json", "*/*"])
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return error(400, res, "Email, password, and role are required");
    }
    const user = await createUser(req.body);
    return success(201, res, user);
  } catch (e) {
    return error(500, res, "Internal server error");
  }
}
