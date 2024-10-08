import { Box, Avatar } from "@mui/material";

export const UserItem = ({ data }: { data?: string }) => {
  return (
    <Box padding={"16px"}>
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
