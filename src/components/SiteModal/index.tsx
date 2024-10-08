import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { CloseIcon } from "../../ui";
import { getImageName } from "../../utils/getImageName";
import { UserItem } from "../UserItem";

type Props = {
  id: string | null;
  closeFunctional: () => void;
};

type AppOverview = {
  appOverview: {
    appId: string;
    appName: string;
    appSources: string[];
    category: string;
  };
};

type AppUsers = {
  appUsers: string[];
};

const fetchData = async (url: string, setState: (data: any) => void) => {
  try {
    const data = await fetch(url, { method: "GET" });
    const response = await data.json();

    setState(response);
  } catch (error) {
    console.log("Something went wrong!");
  }
};

export function SiteModal({ id, closeFunctional }: Props) {
  const modalRef = useRef<HTMLElement | null>(null);
  const [data, setData] = useState<AppOverview | null>(null);
  const [users, setUsers] = useState<AppUsers | null>(null);

  function handleCloseModal() {
    if (modalRef.current) {
      modalRef.current.style.cssText = "";
      setTimeout(closeFunctional, 300);
    }
  }

  useEffect(() => {
    if (modalRef.current) {
      setTimeout(() => {
        modalRef.current!.style.cssText = "transform: translate3d(0,0,0)";
      }, 100);
    }

    fetchData(`/api/v1/app-service/get-app-overview/${id}`, setData);
    fetchData(`/api/v1/app-service/get-app-overview-users/${id}`, setUsers);
  }, [id]);

  return (
    <Box position={"fixed"} width={"100%"} height={"100%"} top={0} left={0}>
      <Box
        position={"fixed"}
        top={"65px"}
        right={0}
        width={"50%"}
        bgcolor={"#FAFAFA"}
        bottom={0}
        overflow={"auto"}
        borderLeft={"1px solid #DCDCDC"}
        padding={"21px 29px"}
        ref={modalRef}
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
        sx={{
          transition: "transform .3s ease, opacity .3s ease",
          transform: "translate3d(100%, 0, 0)",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            component="h2"
            variant="h5"
            sx={{ color: "#4C4C4C" }}
            mb={0}
          >
            App overview
          </Typography>

          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        {data && (
          <>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Box
                component={"img"}
                src={`https://cdn.brandfetch.io/${data.appOverview?.appId}`}
                width={22}
                height={22}
                borderRadius={"50%"}
                loading="lazy"
                boxShadow={"2.44444px 2.44444px 18.3333px rgba(0, 0, 0, 0.1)"}
              ></Box>
              <Typography component={"span"} sx={{ color: "#717171" }}>
                {data.appOverview?.appName}
              </Typography>
            </Box>
            <Box
              border={"1px solid #3E74FF"}
              borderRadius={"4px"}
              padding={"16px"}
              display={"flex"}
              flexDirection={"column"}
              gap={"10px"}
              mb={"14px"}
              bgcolor={"rgba(62, 116, 255, 0.05)"}
              color={"#4C4C4C"}
            >
              <Typography component={"p"}>
                App name: {data.appOverview.appName}
              </Typography>
              <Typography component={"p"}>
                Category: {data.appOverview.category}
              </Typography>
              <Typography component={"p"}>
                Users: {users?.appUsers?.length}
              </Typography>
              <Typography
                component={"div"}
                display={"inline-flex"}
                alignItems={"center"}
                gap={"10px"}
              >
                Connector:{" "}
                <Box display={"inline-flex"} alignItems={"center"} gap={"10px"}>
                  {data.appOverview.appSources.map((item, index) => {
                    const name = getImageName(item);
                    return (
                      <Box
                        key={index}
                        component={"img"}
                        src={`https://cdn.brandfetch.io/${name}`}
                        width={20}
                        height={20}
                        borderRadius={"50%"}
                        border={"1px solid #E8E9FF"}
                        loading="lazy"
                      ></Box>
                    );
                  })}
                </Box>
              </Typography>
            </Box>
          </>
        )}
        {users && users.appUsers?.length > 0 && (
          <Box
            border={"1px solid #E8E9FF"}
            borderRadius={"8px"}
            bgcolor={"white"}
          >
            <UserItem />
            {users?.appUsers?.map((item, index) => (
              <React.Fragment key={index}>
                <UserItem data={item} />
              </React.Fragment>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
