<template>
  <div class="developHistory" ref="developHistory">
    <a-button type="primary" @click="visible = true,title = '新增历程'" style="margin-bottom: 10px">新增</a-button>
    <a-table :columns="columns" :data-source="data" bordered :pagination="pagination" @change="change"
             style="word-break: break-all">
      <template #bodyCell="{ column,record }">
        <template v-if="column.dataIndex === 'operation'">
          <a @click="edit(record)" class="edit">修改</a>
          <a-popconfirm
              v-if="data.length"
              title="确定删除?"
              @confirm="onDelete(record)">
            <a class="edit">删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" :title="title" :footer="null" @cancel="cancel"
             :getContainer="()=>$refs.developHistory" width="40%">
      <a-form
          :model="formState"
          v-bind="layout"
          ref="formRef"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish">
        <a-form-item :name="['user', 'description']" label="描述" :rules="[{ required: true }]">
          <a-textarea v-model:value="formState.user.description" :auto-size="{ minRows: 5}"/>
        </a-form-item>
        <a-form-item :name="['user', 'date']" label="日期" :rules="[{ required: true }]">
          <a-date-picker v-model:value="formState.user.date" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"
                         style="width: 60%"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 16, offset: 8 }" style="text-align: right">
          <a-button style="margin: 0 8px" @click="cancel">取消</a-button>
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref
} from 'vue';
import {PlusOutlined} from '@ant-design/icons-vue';
import {message} from 'ant-design-vue';
import {addHistory, queryHistory, updateHistory, deleteHistory} from '../serves/index'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 80
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    width: 150,
  },
  {
    title: '标题',
    dataIndex: 'description',
    key: 'description',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 200
  }
];
export default defineComponent({
  components: {
    PlusOutlined,
  },
  setup() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: '${label} 不能为空!',
    };
    const formState = reactive({
      user: {
        date: '',
        description: ''
      },
    });
    const formRef = ref();
    return {
      visible: ref(false),
      title: ref('新增历程'),
      formState,
      layout,
      validateMessages,
      formRef,
      pagination: ref({
        current: 1,
        pageSize: 10,
        total: 100,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50'],
        showTotal: (total) => '共' + ` ${total} ` + '条',
      }),
      lastPageSize: 10,
      columns,
      data: ref([]),
      id: ref('')
    };
  },
  mounted() {
    this.queryData()
  },
  methods: {
    queryData() {
      let skip = this.pagination.current == 1 ? 0 : (this.pagination.current - 1) * this.pagination.pageSize
      let limit = this.pagination.pageSize
      queryHistory(skip, limit).then(res => {
        this.data = res.data
        this.pagination.total = res.total
      })
    },
    change(val) {
      if (this.lastPageSize != val.pageSize) {
        this.lastPageSize = val.pageSize
        this.pagination.current = 1
        this.pagination.pageSize = val.pageSize
      } else {
        this.pagination.current = val.current
        this.pagination.pageSize = val.pageSize
      }
      this.queryData()
    },
    onFinish(values) {
      if (this.title == '新增历程') {
        addHistory(values.user).then(res => {
          if (res.id) {
            message.success('新增成功！')
            this.cancel()
            this.pagination.current = 1
            this.queryData()
          }
        })
      } else {
        let params = values.user
        params.id = this.id
        updateHistory(params).then(res => {
          message.success('修改成功！')
          this.cancel()
          this.pagination.current = 1
          this.queryData()
        })
      }
    },
    onDelete(val) {
      deleteHistory(val.id).then(res => {
        this.queryData()
      })
    },
    edit(val) {
      this.title = '修改历程'
      this.visible = true
      this.formState.user.date = val.date
      this.formState.user.description = val.description
      this.id = val.id
    },
    cancel() {
      this.visible = false
      this.formState = reactive({
        user: {
          date: '',
          description: ''
        },
      });
      this.formRef.resetFields()
    }
  }

});
</script>

<style lang="scss">
.developHistory {
  text-align: left;

  .ant-input {
    width: 60%;
  }

  .edit {
    padding: 0px 10px;
  }

}
</style>