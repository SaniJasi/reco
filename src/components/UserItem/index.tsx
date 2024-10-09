import { Box, Avatar } from "@mui/material";

export const UserItem = ({ data }: { data?: string }) => {
  return (
    <Box
      padding={"16px"}
      sx={{ "&:not(:last-child)": { borderBottom: "1px solid #E8E9FF" } }}
    >
      {data ? (
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <Avatar alt={data} sx={{ width: 20, height: 20 }} />
          {data}
        </Box>
      ) : (
        "Username"
      )}
    </Box>
  );
};
