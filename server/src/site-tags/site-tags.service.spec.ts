import { Test, TestingModule } from '@nestjs/testing'

import { SiteTagsService } from './site-tags.service'

describe('SiteTagsService', () => {
  let service: SiteTagsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteTagsService],
    }).compile()

    service = module.get<SiteTagsService>(SiteTagsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
