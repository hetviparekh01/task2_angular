import { Container } from "inversify";
import { userService } from "../services";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const container = new Container();

container.bind<userService>(userService).toSelf();
container.bind<AuthMiddleware>(AuthMiddleware).toSelf()
export default container;