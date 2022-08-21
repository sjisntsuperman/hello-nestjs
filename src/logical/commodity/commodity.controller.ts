import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from 'src/guard/rbac.guard';
import { RbacInterceptor } from 'src/interceptor/rbac.interceptor';
import { ROLES } from '../auth/constants';
import { CommodityService } from './commodity.service';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}
  @UseGuards(new RbacGuard(ROLES.NORMAL))
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(ROLES.NORMAL))
  @Post('list')
  async queryCommodityList(@Body() body: any) {
    return await this.commodityService.queryCommodityList(body);
  }

  @UseGuards(new RbacGuard(ROLES.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(ROLES.DEVELOPER))
  @Post('create')
  async createCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.createCommodity(body, req.user.username);
  }

  @UseGuards(new RbacGuard(ROLES.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(ROLES.ADMIN))
  @Post('update')
  async updateCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.updateCommodity(body, req.user.username);
  }

  @UseGuards(new RbacGuard(ROLES.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(ROLES.ROOT))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commodityService.deleteCommodity(body);
  }
}
