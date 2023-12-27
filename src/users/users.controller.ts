import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role-dto";



@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @ApiOperation({summary: 'Issuing the roles'})
    @ApiResponse({status:200, type: User})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRole(dto)
    }

}
