import React, { useState } from 'react';
import type { ProFormColumnsType, ProFormLayoutType } from '@ant-design/pro-form';
import { BetaSchemaForm, ProFormSelect } from '@ant-design/pro-form';
import moment from 'moment';
import { DatePicker } from 'antd';

// import styles from './index.less';


const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '解决中',
    status: 'Processing',
  },
};

interface DataItem {
  name: string;
  state: string;
}

const columns: Array<ProFormColumnsType<DataItem>> = [
  {
    title: '标题',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: 'm',
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum,
    width: 'm',
  },
  {
    title: '标签',
    dataIndex: 'labels',
    width: 'm',
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createName',
    initialValue: [moment().add(-1, 'm'), moment()],
    renderFormItem: () => <DatePicker.RangePicker />,
  },
  {
    valueType: 'switch',
    title: '开关',
    dataIndex: 'Switch',
    fieldProps: {
      style: {
        width: '200px',
      },
    },
  },
  {
    title: '分组',
    valueType: 'group',
    columns: [
      {
        title: '状态',
        dataIndex: 'groupState',
        valueType: 'select',
        width: 'xs',
        valueEnum,
      },
      {
        title: '标题',
        width: 'md',
        dataIndex: 'groupTitle',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
      },
    ],
  },
  {
    title: '列表',
    valueType: 'formList',
    dataIndex: 'list',
    initialValue: [{ state: 'all', title: '标题' }],
    columns: [
      {
        valueType: 'group',
        columns: [
          {
            title: '状态',
            dataIndex: 'state',
            valueType: 'select',
            width: 'xs',
            valueEnum,
          },
          {
            title: '标题',
            dataIndex: 'title',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
            width: 'm',
          },
        ],
      },
    ],
  },
  {
    title: 'FormSet',
    valueType: 'formSet',
    dataIndex: 'formSet',
    columns: [
      {
        title: '状态',
        dataIndex: 'groupState',
        valueType: 'select',
        width: 'xs',
        valueEnum,
      },
      {
        title: '标题',
        dataIndex: 'groupTitle',
        tip: '标题过长会自动收缩',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
        width: 'm',
      },
    ],
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    transform: (value) => {
      return {
        startTime: value[0],
        endTime: value[1],
      };
    },
  },
];

export default function Colleges() {
  const [layoutType, setLayoutType] = useState<ProFormLayoutType>('Form');
  return (
    <>
      <ProFormSelect
        label="布局方式"
        options={[
          'Form',
          'ModalForm',
          'DrawerForm',
          'LightFilter',
          'QueryFilter',
          'StepsForm',
          'StepForm',
          'Embed',
        ]}
        fieldProps={{
          value: layoutType,
          onChange: (e) => setLayoutType(e),
        }}
      />
      <BetaSchemaForm<DataItem>
        trigger={<a>点击我</a>}
        layoutType={layoutType}
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={layoutType === 'StepsForm' ? [columns] : columns}
      />
    </>
  );
}
