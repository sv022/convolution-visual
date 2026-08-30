<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useconv2dStore } from '@/stores/conv2d';
import { useVisualsStore } from '@/stores/visuals';
import { Kernels } from '@/types/kernels';
import { kernelNameMap } from '@/utils/kernelNames';
import { ref } from 'vue';
import { onMounted } from 'vue';
import Button from '../ui/button/Button.vue';
import { LucideCpu, LucideDices, LucideGrid, LucideGrip, LucideTrash } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { LucideUserStar } from '@lucide/vue';
import SaveKernelDialog from '../Kernel/SaveKernelDialog.vue';

const conv2dStore = useconv2dStore()
const visualsStore = useVisualsStore()

const selectedKernel = ref<Kernels | 'random' | string>('random')
const operation = ref<'convolution' | 'correlation'>('correlation')

const {userKernelsNames} = storeToRefs(conv2dStore)

const hoverIndex = ref(-1)

function setKernel() {
  visualsStore.clearHighlight()
  if (selectedKernel.value === 'random') {
    conv2dStore.resetKernel()
    return
  }
  if (conv2dStore.userKernelsNames.includes(selectedKernel.value)){
    hoverIndex.value = -1
    conv2dStore.setUserKernel(selectedKernel.value)
    return
  }
  conv2dStore.setKernel(selectedKernel.value as Kernels)
}

function deleteKernel(kernelName: string) {
  console.log('deleting kernel:', kernelName)
  visualsStore.clearHighlight()

  conv2dStore.deleteKernel(kernelName)
  hoverIndex.value = -1

  if (selectedKernel.value === kernelName) {
    conv2dStore.resetKernel()
    selectedKernel.value = 'random'
  }
}

function setOperation() {
  visualsStore.clearHighlight()
  conv2dStore.setOperation(operation.value)
}

onMounted(() => {
  conv2dStore.loadKernels()
})
</script>

<template>

  <div class="space-y-4">
    <h3 class="text-3xl font-bold text-center text-carbon">Kernel Settings</h3>
    <NumberField id="size" :disabled="conv2dStore.isKernelSelected" :default-value="3" :min="1" :step="2"
      :max="7" :model-value="conv2dStore.kernel.height">
      <Label for="size">Kernel Size</Label>
      <NumberFieldContent>
        <NumberFieldDecrement @click="conv2dStore.decrementKernelSize(); visualsStore.clearHighlight()" />
        <NumberFieldInput />
        <NumberFieldIncrement @click="conv2dStore.incrementKernelSize(); visualsStore.clearHighlight()" />
      </NumberFieldContent>
    </NumberField>
    <NumberField id="size" :default-value="1" :min="1" :step="1" :max="3"
      :model-value="conv2dStore.stride">
      <Label for="size">Stride</Label>
      <NumberFieldContent>
        <NumberFieldDecrement @click="conv2dStore.stride--; visualsStore.clearHighlight()" />
        <NumberFieldInput />
        <NumberFieldIncrement @click="conv2dStore.stride++; visualsStore.clearHighlight()" />
      </NumberFieldContent>
    </NumberField>
    <div class="flex space-x-2">
      <div class="flex space-x-2 items-end">
        <div>
          <Select id="kernelSelect" v-model="selectedKernel" @update:model-value="setKernel">
            <Label for="kernelSelect" class="pb-2">Kernel type</Label>
            <SelectTrigger class="w-45">
              <SelectValue placeholder="Select a kernel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel class="font-semibold">Kernels</SelectLabel>
                <SelectItem value='random'>
                  <LucideDices class="stroke-input" /> <p>Random</p>
                </SelectItem>
                <SelectItem v-for="userKernel, index in userKernelsNames" class="flex justify-between" :key="userKernel" :value="userKernel" @mouseenter="hoverIndex = index" @mouseleave="hoverIndex = -1">
                  <div
                    v-if="hoverIndex === index"
                    class="hover:bg-destructive/20 cursor-pointer z-50"
                    @pointerdown.stop.prevent="deleteKernel(userKernel)"
                  >
                    <LucideTrash class="w-4 h-4 stroke-destructive-foreground" />
                  </div>
                  <div v-else class="flex items-center space-x-2">
                    <LucideUserStar class="stroke-input" />
                  </div>
                  <span>{{ userKernel }}</span>
                </SelectItem>
                <SelectItem v-for="kernel in Object.values(Kernels)" :key="kernel.toString()" :value="kernel.valueOf()"
                  :class="kernel">
                  <LucideCpu class="stroke-input" /> {{ kernelNameMap[kernel] }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <SaveKernelDialog />
      </div>
      <div>
        <Select id="operationSelect" v-model="operation" @update:model-value="setOperation">
        <Label for="operationSelect" class="pb-2">Operation</Label>
          <SelectTrigger class="w-45">
            <SelectValue placeholder="Select an operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel class="font-semibold">Operations</SelectLabel>
              <SelectItem value='convolution'>
                Convolution
              </SelectItem>
              <SelectItem value='correlation'>
                Correlation
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div>
      <Label for="toggleKernelView">Toggle kernel view</Label>
      <Button id="toggleKernelView" variant="outline" class="mt-2" @click="visualsStore.toggleKernelView">
        <div class="flex items-center space-x-2">
          <LucideGrip class="stroke-taupe-500" v-if="visualsStore.kernelViewType === 'matrix'" />
          <LucideGrid class="stroke-taupe-500" v-else />
          <p>
            {{ visualsStore.kernelViewType === 'matrix' ? 'Matrix' : 'Feature Map' }}
          </p>
        </div>
      </Button>
    </div>
  </div>

</template>
