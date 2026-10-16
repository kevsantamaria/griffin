<script setup lang="ts">
import type { CreateTemplateDto } from '@griffin/schemas'
import { reactive } from 'vue'

import Button from '@/shared/components/ui/Button.vue'
import Input from '@/shared/components/ui/Input.vue'

// CreateTemplateDto has no nullable keys, so only tagNames (optional) is widened
// to a defined array. Everything else is used as declared.
type TemplateFormState = Omit<CreateTemplateDto, 'tagNames'> & {
  tagNames: string[]
}

const fieldTypes = ['text', 'password', 'email', 'url'] as const

const form = reactive<TemplateFormState>({
  name: '',
  technologyName: '',
  groups: [{ header: '', fields: [{ label: '', type: 'text' }] }],
  tagNames: [''],
})

function addTag() {
  form.tagNames.push('')
}

function removeTag(index: number) {
  form.tagNames.splice(index, 1)
}

function addGroup() {
  form.groups.push({ header: '', fields: [{ label: '', type: 'text' }] })
}

function removeGroup(index: number) {
  form.groups.splice(index, 1)
}

function addField(groupIndex: number) {
  form.groups[groupIndex].fields.push({ label: '', type: 'text' })
}

function removeField(groupIndex: number, fieldIndex: number) {
  form.groups[groupIndex].fields.splice(fieldIndex, 1)
}

function submit() {
  // TODO: call useTemplates().create with the payload
}
</script>

<template>
  <h1>Create a new template</h1>

  <form @submit.prevent="submit">
    <label>
      Name
      <Input v-model="form.name" />
    </label>

    <label>
      Technology
      <Input v-model="form.technologyName" />
    </label>

    <fieldset>
      <legend>Tags</legend>
      <div v-for="(tag, tagIndex) in form.tagNames" :key="tagIndex">
        <Input v-model="form.tagNames[tagIndex]" />
        <button type="button" @click="removeTag(tagIndex)">Remove tag</button>
      </div>
      <button type="button" @click="addTag">Add tag</button>
    </fieldset>

    <fieldset>
      <legend>Groups</legend>
      <fieldset v-for="(group, groupIndex) in form.groups" :key="groupIndex">
        <legend>{{ group.header }}</legend>

        <label>
          Header
          <Input v-model="form.groups[groupIndex].header" />
        </label>

        <div v-for="(field, fieldIndex) in group.fields" :key="fieldIndex">
          <label>
            Label
            <Input v-model="form.groups[groupIndex].fields[fieldIndex].label" />
          </label>

          <label>
            Type
            <select v-model="form.groups[groupIndex].fields[fieldIndex].type">
              <option v-for="type in fieldTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </label>

          <button type="button" @click="removeField(groupIndex, fieldIndex)">Remove field</button>
        </div>

        <button type="button" @click="addField(groupIndex)">Add field</button>
        <button type="button" @click="removeGroup(groupIndex)">Remove group</button>
      </fieldset>

      <button type="button" @click="addGroup">Add group</button>
    </fieldset>

    <Button type="submit">Create template</Button>
  </form>
</template>

<style scoped></style>
