import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest()

    await new Promise<void>((resolve, reject) => {
      request.session.regenerate((err) => {
        if (err) reject(err)
        else resolve()
      })
    })

    await super.logIn(request)

    await new Promise<void>((resolve, reject) => {
      request.session.save((err) => {
        if (err) reject(err)
        else resolve()
      })
    })

    return result
  }
}
