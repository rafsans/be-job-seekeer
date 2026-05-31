import { getAllUsers, getUserById, createUser, } from "../../services/user/userServices.js";
import { success, error } from "../../utils/response.js";
export async function getAll(req, res) {
    try {
        const users = await getAllUsers();
        return success(200, res, users);
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function getById(req, res) {
    try {
        const user = await getUserById(req.params.id);
        return success(200, res, user);
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
export async function create(req, res) {
    try {
        req.accepts(["application/json", "text/json", "*/*"]);
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return error(400, res, "Email, password, and role are required");
        }
        const user = await createUser(req.body);
        return success(201, res, user);
    }
    catch (e) {
        return error(500, res, "Internal server error");
    }
}
