import * as React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Table, Space, Modal, Button, Select, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ReportsService from "./report-services";
import ReaderService from "./readers-services";

export default function Products() {
  const [form] = Form.useForm();

  const [titleMessage, newMessage] = React.useState("Manage Products");
  const [isDialogOpen, setisDialogOpen] = React.useState(false);
  const [dataSource, setState] = React.useState([]);
  const [readersData, setreadersData] = React.useState([]);
  const [updatingId, setUpdatingId] = React.useState(null);
  const tailLayout = {
    wrapperCol: {
      offset: 16,
    },
  };

  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const columns = [
    {
      key: "index",
      title: "No",
      dataIndex: "index",
    },
    {
      key: "bookName",
      title: "Book Name",
      dataIndex: "bookName",
    },
    {
      key: "author",
      title: "Author",
      dataIndex: "author",
    },
    {
      key: "sbn",
      title: "Book SBN",
      dataIndex: "sbn",
    },
    {
      key: "releaseYear",
      title: "Release Year",
      dataIndex: "releaseYear",
    },

    {
      key: "reader",
      title: "Reader",
      render: (_, record) => (
        <Space size="middle">{record.reader ? record.reader.name : null}</Space>
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
                updateItem(record);
              }}
            ></EditOutlined>
            <DeleteOutlined
              onClick={() => {
                deleteItem(record);
              }}
              style={{ marginLeft: 25, color: "red" }}
            ></DeleteOutlined>
          </>
        );
      },
    },
  ];

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onAddNew = () => {
    setisDialogOpen(() => {
      return true;
    });
  };

  const deleteItem = (record) => {
    Modal.confirm({
      title: "Are you sure that you want to delete this data?",
      okText: "Yes, delete the data",
      cancelText: "Cancel",
      onOk: () => {
        ReportsService.deleteData(record.id).then((res) => {
          reloadData();
        });
      },
    });
  };

  const reloadData = () => {
    ReportsService.all().then((res) => {
      const data = res.data
        .map((item) => ({
          id: item.id ? item.id : null,
          key: item.id ? item.id : null,
          releaseYear: item.releaseYear ? item.releaseYear : null,
          bookName: item.bookName ? item.bookName : null,
          sbn: item.sbn ? item.sbn : null,
          author: item.author ? item.author : null,
          description: item.description ? item.description : null,
          reader: item.reader ? item.reader : null,
        }))
        .map((item, index) => ({
          ...item,
          index: ++index,
        }));
      setState(() => {
        return data;
      });
    });
    setisDialogOpen(() => {
      return false;
    });
  };

  const updateItem = (record) => {
    console.log("dataz", record);

    const dataToupdate = {
      id: record.id ? record.id : null,
      author: record.author ? record.author : null,
      bookName: record.bookName ? record.bookName : null,
      releaseYear: record.releaseYear ? record.releaseYear : null,
      sbn: record.sbn ? record.sbn : null,
      readerId: record.reader ? record.reader.id : null,
      description: record.description ? record.description : null,
    };
    setisDialogOpen({ isDialogOpen: true });
    form.setFieldsValue(dataToupdate);
    setUpdatingId(() => {
      return record.id;
    });
  };

  const handleCancel = () => {
    setisDialogOpen(() => {
      return false;
    });
    form.resetFields();
  };
  const handleOk = () => {
    console.log("handle OK");
  };

  const onFinish = (values) => {
    const dataToSave = values;
    console.log("datas", updatingId);
    if (updatingId != null) {
      dataToSave.id = updatingId;
      ReportsService.updateData(dataToSave).then(() => {
        form.resetFields();
        reloadData();
      });
    } else {
      ReportsService.saveData(dataToSave).then(() => {
        form.resetFields();
        reloadData();
      });
    }
  };

  React.useEffect(() => {
    ReportsService.all().then((res) => {
      const data = res.data
        .map((item) => ({
          id: item.id ? item.id : null,
          key: item.id ? item.id : null,
          bookName: item.bookName ? item.bookName : null,
          releaseYear: item.releaseYear ? item.releaseYear : null,
          sbn: item.sbn ? item.sbn : null,
          author: item.author ? item.author : null,
          reader: item.reader ? item.reader : null,
          description: item.description ? item.description : null,
        }))
        .map((item, index) => ({
          ...item,
          index: ++index,
        }));
      setState(() => {
        return data;
      });
    });

    ReaderService.all().then((res) => {
      const data = res.data.map((item) => ({
        id: item.id ? item.id : null,
        key: item.id ? item.id : null,
        name: item ? item.name : null,
      }));

      setreadersData(() => {
        return data;
      });
    });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div className="products">
        <p>{titleMessage}</p>
        <Button onClick={onAddNew}>Add New</Button>
        <Modal
          title="Register Item"
          visible={isDialogOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={900}
        >
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Book Name"
              name="bookName"
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
              <Select maxTagCount={2} placeholder="Select a option" allowClear>
                {readersData.map((item, index) => {
                  return (
                    <Select.Option key={index} value={item.id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button key="submit" type="link" text="true" htmlType="submit">
                Submit
              </Button>

              <Button key="submit2" type="text" danger onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table columns={columns} dataSource={dataSource}></Table>
      </div>
    </div>
  );
}
