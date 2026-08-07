import { Test, TestingModule } from '@nestjs/testing'

import { TemplateTagsService } from './template-tags.service'

describe('TemplateTagsService', () => {
  let service: TemplateTagsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateTagsService],
    }).compile()

    service = module.get<TemplateTagsService>(TemplateTagsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
