<script setup lang="ts">
import { createTemplateSchema } from '@griffin/schemas'
import { useForm } from '@tanstack/vue-form'
import type { Ref } from 'vue'

import Button from '@/shared/components/ui/Button.vue'
import { fieldTypes } from '@/shared/constants/field-types'
import type { DisplayableField } from '@/shared/types'

import type { TemplateFormState } from '../types'

type CreateTemplateFormProps = {
  isError: Ref<false, false> | Ref<true, true>
  error: Ref<null, null> | Ref<Error, Error>
}

defineProps<CreateTemplateFormProps>()

const emit = defineEmits<{ submit: [template: TemplateFormState] }>()

const defaultTemplate: TemplateFormState = {
  name: '',
  technologyName: '',
  groups: [{ header: '', fields: [{ label: '', type: 'text' }] }],
  tagNames: [],
}

const form = useForm({
  defaultValues: defaultTemplate,
  validators: {
    onChange: createTemplateSchema,
    onBlur: createTemplateSchema,
    onSubmit: createTemplateSchema,
  },
  onSubmit: ({ value }) => {
    emit('submit', value)
  },
})

const submissionAttempts = form.useSelector((state) => state.submissionAttempts)

function showErrors(field: DisplayableField): boolean {
  return !field.state.meta.isValid && (field.state.meta.isBlurred || submissionAttempts.value > 0)
}
</script>

<template>
  <form class="app-form" @submit.prevent.stop="form.handleSubmit()">
    <section class="form-section">
      <h2>Basic Information</h2>

      <div class="fields-grid">
        <form.Field name="name">
          <template v-slot="{ field }">
            <div class="field">
              <label :for="field.name">
                Name <span class="required" aria-hidden="true">*</span>
              </label>
              <input
                class="input-element"
                :class="{ 'input-invalid': showErrors(field) }"
                :id="field.name"
                :name="field.name"
                :value="field.state.value"
                @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                @blur="() => field.handleBlur()"
              />
              <em role="alert" v-if="showErrors(field)" class="field-error">
                {{ field.state.meta.errors[0]?.message }}
              </em>
            </div>
          </template>
        </form.Field>

        <form.Field name="technologyName">
          <template v-slot="{ field }">
            <div class="field">
              <label :for="field.name">
                Technology <span class="required" aria-hidden="true">*</span>
              </label>
              <input
                class="input-element"
                :class="{ 'input-invalid': showErrors(field) }"
                :id="field.name"
                :name="field.name"
                :value="field.state.value"
                @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                @blur="() => field.handleBlur()"
              />
              <em role="alert" v-if="showErrors(field)" class="field-error">
                {{ field.state.meta.errors[0]?.message }}
              </em>
            </div>
          </template>
        </form.Field>
      </div>
    </section>

    <section class="form-section">
      <h2>Tags</h2>

      <form.Field name="tagNames" mode="array">
        <template v-slot="{ field }">
          <p v-if="(field.state.value ?? []).length === 0" class="empty-hint">No tags yet.</p>

          <div v-for="(_, index) in field.state.value ?? []" :key="index" class="tag-row">
            <form.Field :name="`tagNames[${index}]`">
              <template v-slot="{ field: tagField }">
                <input
                  class="input-element"
                  :class="{ 'input-invalid': showErrors(tagField) }"
                  :id="tagField.name"
                  :name="tagField.name"
                  :value="tagField.state.value"
                  @input="(e) => tagField.handleChange((e.target as HTMLInputElement).value)"
                  @blur="() => tagField.handleBlur()"
                />
                <em role="alert" v-if="showErrors(tagField)" class="field-error">
                  {{ tagField.state.meta.errors[0]?.message }}
                </em>
              </template>
            </form.Field>

            <button type="button" class="remove-button" @click="field.removeValue(index)">
              Remove
            </button>
          </div>

          <em role="alert" v-if="showErrors(field)" class="field-error">
            {{ field.state.meta.errors[0]?.message }}
          </em>

          <button type="button" class="add-button" @click="field.pushValue('')">+ Add tag</button>
        </template>
      </form.Field>
    </section>

    <section class="form-section">
      <h2>Groups <span class="required" aria-hidden="true">*</span></h2>

      <form.Field name="groups" mode="array">
        <template v-slot="{ field }">
          <fieldset
            v-for="(_, groupIndex) in field.state.value"
            :key="groupIndex"
            class="array-group"
          >
            <legend>Group {{ groupIndex + 1 }}</legend>

            <form.Field :name="`groups[${groupIndex}].header`">
              <template v-slot="{ field: headerField }">
                <div class="field">
                  <label :for="headerField.name">
                    Header <span class="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    class="input-element"
                    :class="{ 'input-invalid': showErrors(headerField) }"
                    :id="headerField.name"
                    :name="headerField.name"
                    :value="headerField.state.value"
                    @input="(e) => headerField.handleChange((e.target as HTMLInputElement).value)"
                    @blur="() => headerField.handleBlur()"
                  />
                  <em role="alert" v-if="showErrors(headerField)" class="field-error">
                    {{ headerField.state.meta.errors[0]?.message }}
                  </em>
                </div>
              </template>
            </form.Field>

            <form.Field :name="`groups[${groupIndex}].fields`" mode="array">
              <template v-slot="{ field: fieldsField }">
                <div
                  v-for="(_, fieldIndex) in fieldsField.state.value"
                  :key="fieldIndex"
                  class="array-item"
                >
                  <div class="row-header">
                    <span class="row-title">Field {{ fieldIndex + 1 }}</span>
                    <button
                      type="button"
                      class="remove-button"
                      @click="fieldsField.removeValue(fieldIndex)"
                    >
                      Remove
                    </button>
                  </div>

                  <div class="fields-grid">
                    <form.Field :name="`groups[${groupIndex}].fields[${fieldIndex}].label`">
                      <template v-slot="{ field: labelField }">
                        <div class="field">
                          <label :for="labelField.name">
                            Label <span class="required" aria-hidden="true">*</span>
                          </label>
                          <input
                            class="input-element"
                            :class="{ 'input-invalid': showErrors(labelField) }"
                            :id="labelField.name"
                            :name="labelField.name"
                            :value="labelField.state.value"
                            @input="
                              (e) => labelField.handleChange((e.target as HTMLInputElement).value)
                            "
                            @blur="() => labelField.handleBlur()"
                          />
                          <em role="alert" v-if="showErrors(labelField)" class="field-error">
                            {{ labelField.state.meta.errors[0]?.message }}
                          </em>
                        </div>
                      </template>
                    </form.Field>

                    <form.Field :name="`groups[${groupIndex}].fields[${fieldIndex}].type`">
                      <template v-slot="{ field: typeField }">
                        <div class="field">
                          <label :for="typeField.name">Type</label>
                          <select
                            :id="typeField.name"
                            :value="typeField.state.value"
                            :class="{ 'input-invalid': showErrors(typeField) }"
                            @change="
                              (e) =>
                                typeField.handleChange(
                                  (e.target as HTMLSelectElement).value as
                                    'text' | 'password' | 'email' | 'url'
                                )
                            "
                            @blur="() => typeField.handleBlur()"
                          >
                            <option v-for="type in fieldTypes" :key="type" :value="type">
                              {{ type }}
                            </option>
                          </select>
                          <em role="alert" v-if="showErrors(typeField)" class="field-error">
                            {{ typeField.state.meta.errors[0]?.message }}
                          </em>
                        </div>
                      </template>
                    </form.Field>
                  </div>
                </div>

                <em role="alert" v-if="showErrors(fieldsField)" class="field-error">
                  {{ fieldsField.state.meta.errors[0]?.message }}
                </em>

                <button
                  type="button"
                  class="add-button"
                  @click="fieldsField.pushValue({ label: '', type: 'text' })"
                >
                  + Add field
                </button>
              </template>
            </form.Field>

            <button
              type="button"
              class="remove-button remove-group"
              @click="field.removeValue(groupIndex)"
            >
              Remove group
            </button>
          </fieldset>

          <em role="alert" v-if="showErrors(field)" class="field-error">
            {{ field.state.meta.errors[0]?.message }}
          </em>

          <button
            type="button"
            class="add-button"
            @click="field.pushValue({ header: '', fields: [{ label: '', type: 'text' }] })"
          >
            + Add group
          </button>
        </template>
      </form.Field>
    </section>

    <div class="form-actions">
      <RouterLink class="cancel-link" to="/templates">Cancel</RouterLink>

      <form.Subscribe>
        <template v-slot="{ canSubmit, isSubmitting }">
          <Button :disabled="!canSubmit">{{
            isSubmitting ? 'Creating…' : 'Create template'
          }}</Button>

          <em role="alert" v-if="isError" class="field-error">{{ error.value?.message }}</em>
        </template>
      </form.Subscribe>
    </div>
  </form>
</template>
