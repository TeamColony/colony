import Adapters from "next-auth/adapters";

export default class User extends (<any>Adapters.TypeORM.Models.User.model)  {
    constructor(name: any, email: any, image: any, emailVerified: any, rating: number) {
        super(name, email, image, emailVerified, rating);
        this.rating = 0.0;
      }
}

export const UserSchema = {
  name: "User",
  target: User,

  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    rating: {
        type: "float",
        createDate: true
      },
  },
};