import React, { Component } from "react";
// import Button from "@mui/material/Button";
import ReportsService from "./report-services";
import ReaderService from "./readers-services";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Table, Space, Modal, Button, Select, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editForm: "",
      readers: [],
      title: "Manage Reports",
      dataSource: "",
      isDialogOpen: false,
      columns: [
        {
          key: "index",
          title: "No",
          dataIndex: "index",
        },
        {
          key: "name",
          title: "Author",
          dataIndex: "name",
        },

        {
          key: "reader",
          title: "Reader",
          render: (_, record) => (
            <Space size="middle">{record.reader.name}</Space>
          ),
        },
        {
          key: "actions",
          title: "Actions",
          render: (record) => {
            return (
              <>
                <EditOutlined
                  onClick={() => {
                    this.updateItem(record);
                  }}
                ></EditOutlined>
                <DeleteOutlined
                  onClick={() => {
                    this.deleteItem(record);
                  }}
                  style={{ marginLeft: 15, color: "red" }}
                ></DeleteOutlined>
              </>
            );
          },
        },
      ],
      tailLayout: {
        wrapperCol: {
          offset: 16,
          span: 30,
        },
      },

      layout: {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 20,
        },
      },
    };
  }

  deleteItem = (record) => {
    Modal.confirm({
      title: "Are you sure that you want to delete this data?",
      okText: "Yes, delete the data",
      cancelText: "Cancel",
      onOk: () => {
        ReportsService.deleteData(record.id).then((res) => {
          console.log(res);
        });
      },
    });
  };

  updateItem = (record) => {
    console.log("Data", record);
    this.setState({ isDialogOpen: true });
  };
  changeTitleState = () => {
    this.setState({ title: "Title Changed" });
  };

  handleCancel = () => {
    this.setState({ isDialogOpen: false });
    // form.resetFields();
  };
  handleOk = () => {
    console.log("handle OK");
  };
  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  onFinish = (values) => {
    const dataToSave = values;
    ReportsService.saveData(dataToSave).then((res) => {
      console.log("Data", res);
    });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  componentWillMount() {
    ReportsService.all().then((res) => {
      const data = res.data
        .map((item) => ({
          id: item.id ? item.id : null,
          key: item.id ? item.id : null,
          name: item.author ? item.author : null,
          reader: item.reader ? item.reader : null,
        }))
        .map((item, index) => ({
          ...item,
          index: ++index,
        }));
      this.setState({ dataSource: data });
    });
    ReaderService.all().then((res) => {
      const data = res.data.map((item) => ({
        id: item.id ? item.id : null,
        key: item.id ? item.id : null,
        name: item ? item.name : null,
      }));

      this.setState({ readers: data });
    });
  }

  render() {
    return (
      <div className="reports" style={{ height: 400, width: "100%" }}>
        <p>{this.state.title}</p>
        <Button onClick={this.openDialog}>Add New</Button>
        <Modal
          title="Register Item"
          visible={this.state.isDialogOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
            form={this.state.form}
            {...this.state.layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Book Name"
              name="name"
              rules={[{ required: true, message: "Please input Book name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Author"
              name="author"
              rules={[{ required: true, message: "Please input Book author!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Release Year"
              name="releaseYear"
              rules={[
                { required: true, message: "Please input Book release year!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="SBN"
              name="sbn"
              rules={[{ required: true, message: "Please input Book SBN!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input Book Deacription!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="readerId"
              label="Reader"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                maxTagCount={2}
                placeholder="Select a option"
                allowClear
              >
                {this.state.readers.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item {...this.state.tailLayout}>
              <Button key="submit" type="link" text="true" htmlType="submit">
                Submit
              </Button>

              <Button
                key="submit2"
                type="text"
                danger
                htmlType="submit"
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table
          columns={this.state.columns}
          dataSource={this.state.dataSource}
        ></Table>
      </div>
    );
  }
}
