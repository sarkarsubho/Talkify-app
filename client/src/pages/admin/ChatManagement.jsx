import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Skeleton, Stack } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { transFormImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";
import { server } from "../../constants/config";
import { useFetchData } from "6pp";
import { useErrors } from "../../hooks/hook";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      console.log(params.row.name, params.row.avatar);
      return (
        <AvatarCard
          alt={params.row.name}
          avatar={params.row.avatar}
        ></AvatarCard>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar
          alt={params.row.creator.name}
          src={params.row.creator.avatar}
        ></Avatar>
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/chats`,
    "dashboard-chats"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  useEffect(() => {
    if (data) {
      setRows(
        data.groups.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((url) => transFormImage(url, 50)),
          members: i.members.map((e) => transFormImage(e.avatar, 50)),
          creator: {
            name: i.creator.name,
            avatar: transFormImage(i.creator.avatar, 50),
          },
        }))
      );
    }
    console.log(data);
  }, [data]);
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"}></Skeleton>
      ) : (
        <Table heading={"All Chats"} columns={columns} rows={rows}></Table>
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
