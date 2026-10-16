<script setup lang="ts">
import type { CreateSiteDto } from '@griffin/schemas'
import { reactive } from 'vue'

import Button from '@/shared/components/ui/Button.vue'
import Input from '@/shared/components/ui/Input.vue'

// CreateSiteDto declares url/notes as `string | null | undefined` (z.url().nullish())
// and tagNames as optional, but Input.vue exposes `defineModel<string>()` and the
// form needs a defined array. Those keys are widened here and converted on submit.
type SiteFormState = Omit<CreateSiteDto, 'url' | 'notes' | 'tagNames'> & {
  url: string
  notes: string
  tagNames: string[]
}

const fieldTypes = ['text', 'password', 'email', 'url'] as const

const form = reactive<SiteFormState>({
  name: '',
  url: '',
  isInternal: true,
  notes: '',
  technologyName: '',
  credentials: [{ header: '', fields: [{ label: '', type: 'text', content: '' }] }],
  tagNames: [''],
})

function addTag() {
  form.tagNames.push('')
}

function removeTag(index: number) {
  form.tagNames.splice(index, 1)
}

function addCredentialGroup() {
  form.credentials.push({ header: '', fields: [{ label: '', type: 'text', content: '' }] })
}

function removeCredentialGroup(index: number) {
  form.credentials.splice(index, 1)
}

function addCredentialField(groupIndex: number) {
  form.credentials[groupIndex].fields.push({ label: '', type: 'text', content: '' })
}

function removeCredentialField(groupIndex: number, fieldIndex: number) {
  form.credentials[groupIndex].fields.splice(fieldIndex, 1)
}

function submit() {
  // TODO: map SiteFormState back to CreateSiteDto ('url'/'notes' -> null) and call useSites().create
}
</script>

<template>
  <h1>Create a new site</h1>

  <form @submit.prevent="submit">
    <label>
      Name
      <Input v-model="form.name" />
    </label>

    <label>
      URL
      <Input v-model="form.url" type="url" />
    </label>

    <label>
      Internal
      <input v-model="form.isInternal" type="checkbox" />
    </label>

    <label>
      Notes
      <textarea v-model="form.notes"></textarea>
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
      <legend>Credentials</legend>
      <fieldset v-for="(group, groupIndex) in form.credentials" :key="groupIndex">
        <legend>{{ group.header }}</legend>

        <label>
          Header
          <Input v-model="form.credentials[groupIndex].header" />
        </label>

        <div v-for="(field, fieldIndex) in group.fields" :key="fieldIndex">
          <label>
            Label
            <Input v-model="form.credentials[groupIndex].fields[fieldIndex].label" />
          </label>

          <label>
            Type
            <select v-model="form.credentials[groupIndex].fields[fieldIndex].type">
              <option v-for="type in fieldTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </label>

          <label>
            Content
            <Input v-model="form.credentials[groupIndex].fields[fieldIndex].content" />
          </label>

          <button type="button" @click="removeCredentialField(groupIndex, fieldIndex)">
            Remove field
          </button>
        </div>

        <button type="button" @click="addCredentialField(groupIndex)">Add field</button>
        <button type="button" @click="removeCredentialGroup(groupIndex)">Remove group</button>
      </fieldset>

      <button type="button" @click="addCredentialGroup">Add group</button>
    </fieldset>

    <Button type="submit">Create site</Button>
  </form>
</template>

<style scoped></style>
