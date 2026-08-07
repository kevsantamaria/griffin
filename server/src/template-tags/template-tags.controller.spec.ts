import { Test, TestingModule } from '@nestjs/testing'

import { TemplateTagsController } from './template-tags.controller'
import { TemplateTagsService } from './template-tags.service'

describe('TemplateTagsController', () => {
  let controller: TemplateTagsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateTagsController],
      providers: [TemplateTagsService],
    }).compile()

    controller = module.get<TemplateTagsController>(TemplateTagsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
