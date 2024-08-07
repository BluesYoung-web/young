<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 15:10:28
 * @LastEditTime: 2024-05-31 10:49:29
 * @Description: 
-->

<script lang="tsx" setup>
import { ref, watch } from 'vue';
import type { YoungSearchScheme } from '.';
import { ElForm, ElFormItem, ElButton, ElInputNumber, ElInput } from 'element-plus';
import { YoungSelect, YoungDateRange } from '..';
import { deepClone, randomId } from '@bluesyoung/utils';

interface Props {
  modelValue: Record<string, any>;
  searchScheme: YoungSearchScheme;
  fastSearch?: boolean;
  beforeSearch?: () => void;
  onSearch?: () => void;
  onReset?: () => void;
  dateTimeKey?: [string, string];
  pageKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fastSearch: true,
  onSearch: () => console.log('---表单元素触发请求---'),
  onReset: () => console.log('---触发重置请求---'),
  dateTimeKey: () => ['startcreatetime', 'endcreatetime'],
  pageKey: 'pageNum',
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: Props['modelValue']): void;
}>();

const form = ref<Record<string, any>>({});
watch(
  () => props.modelValue,
  (v) => {
    form.value = deepClone(v);
  },
  { immediate: true, deep: true },
);

function search() {
  console.log('---表单元素触发请求前---');
  if (props.beforeSearch) {
    props.beforeSearch();
  } else {
    console.log('---默认逻辑，重置分页---', props.pageKey)
    form.value[props.pageKey] = 1;
    emit('update:modelValue', { ...form.value });
  }
  props.onSearch();
}

const update = (up = true) => {
  emit('update:modelValue', { ...form.value });
  if (props.fastSearch && up) {
    search();
  };
};

// !直接在界面上调用，会导致频繁刷新引起意外的 bug，比如：输入框输入一个字符之后就会失去焦点
const randomSeed = randomId();
</script>

<template>
  <div v-bind="$attrs" style="max-width: 100%; margin: auto; padding: 20px;">
    <ElForm :model="modelValue">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, max-content)); gap: 10px 20px;">
        <div v-for="(item, index) in Object.keys(searchScheme)" :key="index + randomSeed">
          <ElFormItem :label="searchScheme[item].tip">
            <ElInput v-if="searchScheme[item].type === 'input'" v-model.trim="form[item]"
              v-bind="searchScheme[item].attrs" @change="update(false)"
              @keyup.enter="[searchScheme[item]?.effect?.(form[item]), update()]" />
            <ElInputNumber v-if="searchScheme[item].type === 'number'" v-bind="searchScheme[item].attrs"
              v-model.number="form[item]" @change="[searchScheme[item]?.effect?.(form[item]), update()]" />
            <YoungSelect v-if="searchScheme[item].type === 'select'" v-model="form[item]"
              v-bind="searchScheme[item].attrs" :options="searchScheme[item].options"
              @change="[searchScheme[item]?.effect?.(form[item]), update()]" />
            <YoungDateRange v-if="searchScheme[item].type === 'datetimerange'" v-model:start="form[dateTimeKey[0]]"
              v-model:end="form[dateTimeKey[1]]" v-bind="searchScheme[item].attrs"
              @change="[searchScheme[item]?.effect?.([form[dateTimeKey[0]], form[dateTimeKey[1]]]), update()]" />
            <component v-if="searchScheme[item].type === 'custom'" :is="searchScheme[item].render?.()" />
          </ElFormItem>
        </div>
        <slot name="custom" />
      </div>
      <div style="display: flex;">
        <ElButton type="primary" @click="search">
          搜索
        </ElButton>
        <ElButton @click="onReset">重置</ElButton>
        <slot name="btns" />
      </div>
    </ElForm>
  </div>
</template>