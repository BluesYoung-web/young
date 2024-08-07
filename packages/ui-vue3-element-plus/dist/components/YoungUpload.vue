<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 14:09:31
 * @LastEditTime: 2024-06-19 09:20:23
 * @Description: 
-->

<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue';
import { ElUpload, ElButton, ElMessage } from 'element-plus';
import type { UploadUserFile } from 'element-plus';
import { YoungDialog, useImagePreview } from '..';
import { VueCropper } from 'vue-cropper';
import 'vue-cropper/dist/index.css';

interface Props {
  modelValue: string[];
  names?: string[];
  limit?: number;
  type?: 'image' | 'file';
  accept?: string;
  uploadFn: (file: File) => Promise<string>;
  cropper?: boolean;
  aspt?: [number, number];
  outputType?: string;
  cropperAttrs?: Record<string, any>;
  /**
   * 边长
   */
  size?: number;
  /**
   * 文件大小限制 单位 M
   */
  fileSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  limit: 1,
  type: 'image',
  accept: '',
  outputType: 'webp',
  cropper: false,
  aspt: () => [1, 1],
  cropperAttrs: () => ({}),
  size: 148
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'update:names', value: string[]): void;
  (e: 'change', value: string[]): void;
}>();

const fileNames = ref<string[]>(props.names || []);

const files = computed<UploadUserFile[]>(() =>
  props.modelValue.map((url, index) => ({
    uid: index,
    name: props.names?.[index] ?? fileNames.value?.[index] ?? url,
    status: 'success',
    url,
  })),
);

const exceed = () => ElMessage.error('超出数量限制！！！');
const del = (_: UploadUserFile, all: UploadUserFile[]) => {
  const arr = all.map((item) => item.url!);
  fileNames.value = fileNames.value.filter((item) => item !== _.name);
  emit('update:names', fileNames.value);
  emit('update:modelValue', arr);
  emit('change', arr);
};

const upload = async (file: UploadUserFile) => {
  if (file) {
    if (props.fileSize && (file.size || 0) > props.fileSize * 1024 * 1024) {
      ElMessage.error(`文件大小不能超过${props.fileSize}M`);
      const arr = files.value.filter(item => item.status === 'success').map(item => item.url!)
      emit('update:modelValue', arr)
      emit('change', arr)

      return;
    }

    if (props.type === 'image' && props.cropper) {
      showClipPopup.value = true;
      await nextTick();
      coverFile.value = URL.createObjectURL(file.raw as Blob);
      cropper.value.startCrop();
    } else {
      const name = file.name
      fileNames.value.push(name);
      const url = await props.uploadFn(file.raw as unknown as File);
      const arr = [
        ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
        url,
      ];
      emit('update:modelValue', arr);
      emit('update:names', fileNames.value);
      emit('change', arr);
    }
  }
};

const preView = (url: string) => {
  const index = props.modelValue.indexOf(url);
  useImagePreview({
    srcList: props.modelValue,
    index: index === -1 ? 0 : index,
  });
};

const limitStyle = computed(() =>
  props.modelValue.length < props.limit ? 'inline-flex' : 'none',
);

const cardSize = computed(() => `${props.size}px`);

const cropper = ref();
const coverFile = ref<string>();

const showClipPopup = ref(false);

const sureClip = () => {
  cropper.value.getCropBlob(async (blob: Blob) => {
    const url = await props.uploadFn(blob as File);
    const arr = [
      ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
      url,
    ];
    emit('update:modelValue', arr);
    emit('change', arr);
    coverFile.value = '';
  });
  showClipPopup.value = false;
};

const cancelClip = () => {
  coverFile.value = '';
  showClipPopup.value = false;
  const arr = [
    ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
  ];
  emit('update:modelValue', arr);
  emit('change', arr);
};
</script>

<template>
  <ElUpload v-bind="$attrs" :accept="accept ? accept : type === 'image' ? 'image/*' : '*'" :limit="limit"
    :list-type="type === 'image' ? 'picture-card' : undefined" :multiple="limit > 1" :file-list="files"
    :auto-upload="false" style="max-width: 500px;" @exceed="exceed" @change="upload" @remove="del"
    @preview="f => type === 'image' && preView(f.url!)">
    <div style="display: flex;">
      <svg v-if="modelValue.length < limit && type === 'image'" style="font-size: 1.875rem; line-height: 2.25rem;"
        xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z" />
      </svg>
      <div v-else-if="modelValue.length < limit" style="margin-right: 0.5rem;">
        <ElButton type="primary">上传文件</ElButton>
      </div>
      <div v-else style="cursor: not-allowed; pointer-events: none;">
        已达数量上限
      </div>
      ({{ props.modelValue.length }} / {{ props.limit }})
    </div>
  </ElUpload>

  <YoungDialog v-model="showClipPopup" width="75%" real-title="图片裁剪" sure-text="裁剪" @sure="sureClip"
    @clear="cancelClip">
    <VueCropper ref="cropper" auto-crop center-box :fixed-number="aspt" :img="coverFile" :output-type="outputType" fixed
      v-bind="cropperAttrs" />
  </YoungDialog>
</template>

<style scoped>
:deep(.el-upload--picture-card) {
  display: v-bind("limitStyle");
  --el-upload-picture-card-size: v-bind("cardSize");
  --el-upload-list-picture-card-size: v-bind("cardSize");
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: v-bind("cardSize");
  height: v-bind("cardSize");
}
</style>