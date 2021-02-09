import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();
const usersRepository = new UsersRepository();

interface IResponseUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const responseUser: IResponseUser = user;
  delete responseUser.password;

  return response.json({ responseUser, token });
});

export default sessionsRouter;
