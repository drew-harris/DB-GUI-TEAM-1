import { Request, Response }from 'express'
export async function createUserHandler(req: Request, res: Response) {
    return res.sendStatus(200)
}