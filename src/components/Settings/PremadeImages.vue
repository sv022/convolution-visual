<script setup
    lang="ts">

    import { Label } from '@/components/ui/label'
    import { useconv2dStore } from '@/stores/conv2d';
    import { useVisualsStore } from '@/stores/visuals';
    import exampleImages from '@/utils/exampleImages';
    const conv2dstore = useconv2dStore()
    const visualsStore = useVisualsStore()

    function setImage(index: number): void {
        visualsStore.clearHighlight()
        conv2dstore.resetInput()
        if (index == 0) {
            return
        }
        conv2dstore.setImage(exampleImages(index), 28, 28)
        conv2dstore.isExampleSelected = true
    }

</script>
<template>

    <div class="p-2">
        <Label>Example images</Label>
        <div class="flex p-2 flex-wrap space-y-2">
            <img width="80" src="@/assets/image_random.png" alt="0" @click="setImage(0)">
            <img width="80" src="@/assets/image_0.png" alt="0" @click="setImage(1)">
            <img width="80" src="@/assets/image_2.png" alt="0" @click="setImage(2)">
            <img width="80" src="@/assets/image_1.png" alt="0" @click="setImage(3)">
            <img width="80" src="@/assets/image_3.png" alt="0" @click="setImage(4)">
        </div>
    </div>

</template>
