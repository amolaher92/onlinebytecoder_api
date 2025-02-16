import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { PassportStatic } from "passport";
import dotenv from "dotenv";
import User from "../models/User"; // Import your User model

dotenv.config();

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey as string, // Ensuring it's always a string
};

export default (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(
      opts,
      async (
        jwtPayload: { id: string },
        done: (error: any, user?: any) => void
      ) => {
        try {
          const user = await User.findById(jwtPayload.id);
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
