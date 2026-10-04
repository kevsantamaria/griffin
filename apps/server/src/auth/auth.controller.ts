import { Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import type { Response, Request } from 'express'

import { AuthService } from './auth.service'
import { AuthenticatedGuard } from './guards/authenticated.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Throttle({ auth: {} })
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: Request) {
    return {
      message: 'Login successful',
      user: req.user,
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res() res: Response) {
    await new Promise<void>((resolve, reject) => {
      req.logout((err) => (err ? reject(err) : resolve()))
    })

    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()))
    })

    res.clearCookie('credentials-manager.sid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    return res.json({ message: 'Logged out successfully' })
  }

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    return req.user
  }
}
