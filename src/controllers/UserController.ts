import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { userSchema } from "../validators/userValidator";

export class UserController {
  static async create(req: Request, res: Response) {
    const parsed = userSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    try {
      const user = await UserService.createUser(parsed.data);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur.", details: error });
    }
  }

  static async getUserWithAnswers(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide." });
    }

    try {
      const user = await UserService.getUserWithAnswers(id);

      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur.", details: error });
    }
  }
}
