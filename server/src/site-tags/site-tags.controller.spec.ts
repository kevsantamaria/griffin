import { Test, TestingModule } from '@nestjs/testing'

import { SiteTagsController } from './site-tags.controller'
import { SiteTagsService } from './site-tags.service'

describe('SiteTagsController', () => {
  let controller: SiteTagsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteTagsController],
      providers: [SiteTagsService],
    }).compile()

    controller = module.get<SiteTagsController>(SiteTagsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
