import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  Layout,
  Breadcrumb,
  Divider,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const { Content } = Layout;
let id = 0;

class SocialSignup extends Component<{} & FormComponentProps> {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
      }
    });
  };

  petInfo = (value: any): any => {
    //const { form } = this.props;
    //  const v: any = value;
  };

  remove = (k: any) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter((key: any) => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    //console.log('keys--->', keys);
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    //console.log('keys--->', keys);
    const formItems = keys.map((k: any, index: any) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'PetInfo' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`petname[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input pet's name or delete this field.",
            },
          ],
        })(
          <Input
            placeholder="PetName"
            style={{ width: '62%', marginRight: 8 }}
          />
        )}

        {getFieldDecorator(`petType[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input pet's Type or delete this field.",
            },
          ],
        })(
          <Input
            placeholder="PetType(ex: 개,고양이..)"
            style={{ width: '62%', marginRight: 8 }}
          />
        )}

        {getFieldDecorator(`petbreed[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input pet's breed or delete this field.",
            },
          ],
        })(
          <Input
            placeholder="Petbreed(ex: 말티즈, 레브라도리트리버..)"
            style={{ width: '62%', marginRight: 8 }}
          />
        )}

        {keys.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

    return (
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
        <div>
          <div style={{ width: '100%', marginRight: 8 }}>
            <Button type="primary" block>
              구글로그인
            </Button>
          </div>
          <div style={{ width: '100%', marginRight: 8 }}>
            <Button type="danger" block>
              카카오로그인
            </Button>
          </div>
        </div>

        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          <Divider orientation="left" className="first">
            닉네임 설정 [필수사항]
          </Divider>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="중복되지 않는 닉네임을 설정해주세요">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('nickname', {
                rules: [
                  {
                    required: true,
                    message: '닉네임을 입력해주세요!',
                    whitespace: true,
                  },
                ],
              })(<Input style={{ width: '62%', marginRight: 8 }} />)}
            </Form.Item>
            <div className="container">
              <Divider orientation="left" className="first">
                애완동물 정보 기입 [선택사항]
              </Divider>
              {formItems}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={this.add}
                  style={{ width: '62%' }}
                >
                  <Icon type="plus" /> 애완동물 정보를 기입해주세요
                </Button>
              </Form.Item>
            </div>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  I have read the <a href="1">agreement</a>
                </Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                저장
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    );
  }
}

export default Form.create()(SocialSignup);
