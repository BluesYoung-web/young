/*
 * @Author: zhangyang
 * @Date: 2023-05-30 09:25:24
 * @LastEditTime: 2023-07-31 09:47:51
 * @Description:
 */
import { ElButton, ElDrawer, ElTooltip } from 'element-plus';
import { defineComponent, onMounted, ref } from 'vue';
import type { PropType } from 'vue';
import type { TableHeadItemPro } from '..';
import Drag from './Drag';
import { useEventListener, useMediaQuery } from '@vueuse/core';

export default defineComponent({
  props: {
    tableHead: {
      required: true,
      type: Object as PropType<TableHeadItemPro[]>,
    },
  },
  emits: ['drag-end', 'change', 'save', 'reset'],
  setup(props, { emit }) {
    const showPopover = ref(false);

    const handleDragend = (list: TableHeadItemPro[]) => {
      emit('drag-end', list);
    };

    const handleChange = (item: TableHeadItemPro, check: boolean) => {
      emit('change', item, check);
    };

    onMounted(() => {
      useEventListener('click', (e) => {
        showPopover.value = false;
      });
    });

    const ltSm = useMediaQuery('(max-width: 639.9px)');

    return () => (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingBottom: '10px',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            showPopover.value = true;
          }}
          title='表头配置'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.5rem'
            height='1.5rem'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z'
            ></path>
          </svg>
        </div>
        <ElDrawer
          modelValue={showPopover.value}
          withHeader={false}
          onUpdate:modelValue={(e) => (showPopover.value = e)}
          size={ltSm.value ? '75%' : '30%'}
        >
          {{
            default: () => (
              <>
                <div style={{ color: '#999', textAlign: 'center', padding: '10px' }}>
                  拖动可排序，点击可以切换展示状态
                </div>
                <Drag list={props.tableHead} onDrag-end={handleDragend} onChange={handleChange} />
              </>
            ),
            footer: () => (
              <div style={{ textAlign: 'left' }}>
                <ElTooltip content='保存配置到本地，如果不保存，则页面刷新之后会丢失现有的个性化配置'>
                  <ElButton type='primary' onClick={() => emit('save')}>
                    保存
                  </ElButton>
                </ElTooltip>
                <ElTooltip content='快速恢复默认配置'>
                  <ElButton onClick={() => emit('reset')}>重置</ElButton>
                </ElTooltip>
              </div>
            ),
          }}
        </ElDrawer>
      </>
    );
  },
});
