import React, { Component } from 'react';
import { Form, Input, Button, Tabs } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Mutation } from 'react-apollo';

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}

class Rescue extends Component<{} & FormComponentProps> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(Object.values(values).join(','));
        let result = Object.values(values).join(',');
        this.setState({
          result: result,
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    //console.log('!!!!!!', this.state);
    return (
      <div>
        <div>
          지도 , 사진 첨부 예정
          <br />
          <br />
          <br />
          <br />
        </div>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="Animal">
            {getFieldDecorator('animal', {
              rules: [
                { required: true, message: 'Please input type of animal!' },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Status">
            {getFieldDecorator('status', {
              rules: [
                { required: true, message: "Please input animal's status!" },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Detail">
            {getFieldDecorator('detail', {
              rules: [
                { required: true, message: 'Please input detail location!' },
              ],
            })(<Input />)}
          </Form.Item>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="동의 사항" key="1" style={{ marginBottom: '5%' }}>
              허위 신고는 혼나요!
            </TabPane>
          </Tabs>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            {/* <Mutation></Mutation> */}
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Rescue);
export default WrappedNormalLoginForm;
