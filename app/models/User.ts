import Adapters from "next-auth/adapters";
import { EntitySchemaColumnOptions } from 'typeorm'

const User = class extends (<any>Adapters.TypeORM.Models.User.model)  {
    constructor(name: any, email: any, image: any, emailVerified: any, rating: number) {
        super(name, email, image, emailVerified, rating);
        this.rating = 0.0;
      }
}

type UserSchema = {
  name: string
  target: typeof User
  columns: {
    rating?: {
      type: "float",
    },
    name?: EntitySchemaColumnOptions
    email?: EntitySchemaColumnOptions
    image?: EntitySchemaColumnOptions
    emailVerified?: EntitySchemaColumnOptions
  }
}

export const UserSchema: UserSchema = {
  name: 'users',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    rating: {
        type: "float",
      },
  },
}

export default User;