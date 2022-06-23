<template>
  <div class="imageUpload" ref="imageUpload">
    <a-button type="primary" @click="visible = true,title = '新增新闻'" style="margin-bottom: 10px">新增</a-button>
    <a-table :columns="columns" :data-source="data" bordered :pagination="pagination" @change="change"
             style="word-break: break-all">
      <template #bodyCell="{ column,record }">
        <template v-if="column.key === 'image'">
          <a-image
              :width="60"
              :src="record.img_url"
              :preview="{
                src: record.img_url,
              }"
          />
        </template>
        <template v-if="column.key === 'destination_url'">
          <a :href="record.destination_url" target="_blank">{{ record.destination_url }}</a>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a @click="edit(record)" class="edit">修改</a>
          <a-popconfirm
              class="edit"
              v-if="data.length"
              title="确定删除?"
              @confirm="onDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" :title="title" :footer="null" @cancel="cancel"
             :getContainer="()=>$refs.imageUpload" width="40%">
      <a-form
          :model="formState"
          v-bind="layout"
          ref="formRef"
          name="nest-messages"
          :validate-messages="validateMessages"
          @finish="onFinish">
        <a-form-item :name="['user', 'title']" label="标题" :rules="[{ required: true }]">
          <a-textarea v-model:value="formState.user.title" :auto-size="{ minRows: 4}"/>
        </a-form-item>
        <a-form-item :name="['user', 'author']" label="作者" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.author"/>
        </a-form-item>
        <a-form-item :name="['user', 'date']" label="日期" :rules="[{ required: true }]">
          <a-date-picker v-model:value="formState.user.date" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"
                         style="width: 60%"/>
        </a-form-item>
        <a-form-item :name="['user', 'img_url']" label="图片地址" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.img_url"/>
        </a-form-item>
        <a-form-item :name="['user', 'destination_url']" label="链接地址" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.destination_url"/>
        </a-form-item>
        <a-form-item label="上传图片">
          <a-upload
              v-model:file-list="fileList"
              name="in_file"
              :action="action"
              list-type="picture-card"
              :headers="headers"
              @change="uploadChange"
              @preview="handlePreview">
            <div v-if="fileList.length < 1">
              <plus-outlined/>
              <div style="margin-top: 8px">上传</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage"/>
          </a-modal>
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
import {addNews, queryNews, updateNews, deleteNews} from '../serves/index'
import {getLocalStorage} from "@/serves/localStorage";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 80
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    width: 400
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    align: 'center',
    width: 100
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    width: 120
  },
  {
    title: '图片缩略图',
    dataIndex: 'image',
    key: 'image',
    align: 'center',
    width: 120
  },
  {
    title: '图片地址',
    dataIndex: 'img_url',
    key: 'img_url',
    align: 'center',
  },
  {
    title: '链接地址',
    dataIndex: 'destination_url',
    key: 'destination_url',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    width: 150
  }
];

export default defineComponent({
  components: {
    PlusOutlined,
  },

  setup() {
    const previewVisible = ref(false);
    const previewImage = ref('');
    const previewTitle = ref('');
    const handleCancel = () => {
      previewVisible.value = false;
      previewTitle.value = '';
    };
    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
      previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
    };
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
        title: '',
        img_url: '',
        author: '',
        date: '',
        destination_url: ''
      },
    });
    const formRef = ref();
    return {
      visible: ref(false),
      fileList: ref([]),
      previewVisible,
      previewImage,
      handleCancel,
      previewTitle,
      handlePreview,
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
      title: ref('新增新闻'),
      id: ref(''),
    };
  },
  computed: {
    action() {
      return `${process.env.VUE_APP_SERVER_URL}/uploadfile/`
    },
    headers() {
      return {Authorization: getLocalStorage('access_token')}
    },
  },
  mounted() {
    this.queryData()
  },
  methods: {
    queryData() {
      let skip = this.pagination.current == 1 ? 0 : (this.pagination.current - 1) * this.pagination.pageSize
      let limit = this.pagination.pageSize
      queryNews(skip, limit).then(res => {
        this.data = res.data
        this.pagination.total = this.data.total
      })
    },
    uploadChange(val) {
      if (val.fileList[0].status === 'done' && val.fileList[0].response.accessUrl) {
        this.formState.user.img_url = val.fileList[0].response.accessUrl
        message.success('上传成功！');
      }
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
      if (this.title == '新增新闻') {
        addNews(values.user).then(res => {
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
        updateNews(params).then(res => {
          message.success('修改成功！')
          this.cancel()
          this.pagination.current = 1
          this.queryData()
        })
      }
    },
    onDelete(val) {
      deleteNews(val.id).then(res => {
        this.queryData()
      })
    },
    edit(val) {
      this.title = '修改新闻'
      this.visible = true
      this.formState = reactive({
        user: {
          title: val.title,
          img_url: val.img_url,
          author: val.author,
          date: val.date,
          destination_url: val.destination_url
        },
      });
      this.id = val.id
    },
    cancel() {
      this.visible = false
      this.formState = reactive({
        user: {
          title: '',
          img_url: '',
          author: '',
          date: '',
          destination_url: ''
        },
      });
      this.fileList = []
      this.formRef.resetFields()
    }
  }

});
</script>

<style lang="scss">
.imageUpload {
  text-align: left;

  .edit {
    padding: 0px 10px;
  }

  .ant-input {
    width: 60%;
  }

}
</style>
