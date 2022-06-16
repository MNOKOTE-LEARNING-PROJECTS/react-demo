import * as React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Table } from "antd";
import Button from "@mui/material/Button";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Products() {
  const [titleMessage, newMessage] = React.useState("Manage Products");

  const [dataSource, setState] = React.useState([
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
  ]);

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "age",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "address",
      title: "Address",
      dataIndex: "address",
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
              style={{ marginLeft: 15, color: "red" }}
            ></DeleteOutlined>
          </>
        );
      },
    },
  ];

  const onAddNew = () => {
    setState((pre) => {
      const newData = {
        id: "1",
        key: "10",
        name: "Mfaume Mnokote",
        age: 48,
        address: "London",
      };
      console.log("...pre", [...pre, newData]);
      return [...pre, newData];
    });

    // newMessage((pre) => {
    //   const newMessage = "1234";
    //   return [newMessage];
    // });
  };

  const deleteItem = (record) => {
    console.log("Data", record);
  };

  const updateItem = (record) => {
    console.log("Data", record);
  };

  return (
    <div className="" style={{ height: 400, width: "100%" }}>
      <div className="products">
        <p>{titleMessage}</p>
        <Button onClick={onAddNew}>Add New</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
      </div>
    </div>
  );
}
