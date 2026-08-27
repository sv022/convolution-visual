<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form, Field as VeeField } from 'vee-validate'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { LucideSave } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useconv2dStore } from '@/stores/conv2d'
import { ref } from 'vue'
import { kernelNameMap } from '@/utils/kernelNames'

const conv2dStore = useconv2dStore()

const isOpen = ref(false)

const forbiddenNames = Object.values(kernelNameMap).map(name => name.toLowerCase())

const formSchema = toTypedSchema(z.object({
  name: z.string()
    .min(2)
    .max(50)
    .refine(
      (val) => val.trim().toLowerCase() !== 'random',
      { message: '"random" kernel cannot be saved' }
    )
    .refine(
      (val) => !forbiddenNames.includes(val.trim().toLowerCase()),
      { message: 'This kernel name is already in use' }
    ),
}))

function onSubmit(values: z.infer<typeof formSchema> | undefined) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error|
  conv2dStore.saveKernel(values?.name)
  isOpen.value = false
}
</script>

<template>
  <TooltipProvider ignore-non-keyboard-focus>
    <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
      <Dialog v-model:open="isOpen">
        <Tooltip>
          <TooltipTrigger as-child>
            <DialogTrigger as-child>
              <Button variant="ghost">
                <LucideSave class="stroke-taupe-400" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save kernel</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent
          class="sm:max-w-106.25"
          @close-auto-focus.prevent
        >
          <DialogHeader>
            <DialogTitle>Enter kernel name</DialogTitle>
          </DialogHeader>

          <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
            <FieldGroup>
              <VeeField v-slot="{ componentField, errors }" name="name">
                <Field :data-invalid="!!errors.length">
                  <Input id="name" type="text" placeholder="my kernel" v-bind="componentField" />
                  <FieldError v-if="errors.length" :errors="errors" />
                </Field>
              </VeeField>
            </FieldGroup>
          </form>

          <DialogFooter>
            <Button class="bg-mint-700 hover:bg-mint-500" type="submit" form="dialogForm">
              Save kernel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  </TooltipProvider>
</template>
