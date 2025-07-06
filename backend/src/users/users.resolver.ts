import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Book } from '../books/book.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userByEmail' })
  findByEmail(@Args('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Query(() => User, { name: 'userByUsername' })
  findByUsername(@Args('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }

  @Mutation(() => Boolean)
  verifyUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.update(id, { isVerified: true });
  }

  // Resolve books field for User
  @ResolveField(() => [Book])
  async books(@Parent() user: User) {
    return this.usersService.getUserBooks(user.id);
  }

  // Additional query to get user's books
  @Query(() => [Book], { name: 'userBooks' })
  getUserBooks(@Args('userId', { type: () => ID }) userId: string) {
    return this.usersService.getUserBooks(userId);
  }
}
