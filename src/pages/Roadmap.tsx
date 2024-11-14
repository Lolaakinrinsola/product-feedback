import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Nav from "../components/Nav";
import RoadmapList from "../components/RoadmapList";
import Whitebg from "../components/Whitebg";
import useStore from "../utils/Store";

const Roadmap = () => {
  const navigate = useNavigate();
  const { productRequest } = useStore();
  const planned = productRequest.filter((val: any) => val.status === "planned");
  const inProgress = productRequest.filter((val: any) => val.status === "in-progress"
  );
  const live = productRequest.filter((val: any) => val.status === "live");

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue); // Ensure newValue is a number
  };

function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  return (
    <div className="bg-darkwhite px-[15px] md:px-[5%] lg:px-[11%] py-[78px] min-h-screen">
      <Nav>
        <div className="grid m-0 p-0">
          <Button
            state={5}
            title="Go Back"
            onClick={() => navigate(-1)}
            className="!px-0 !py-0 !text-white w-fit"
          />
          <p className="font-bold text-white text-[24px]">Roadmap</p>
        </div>
      </Nav>
      {/* smaller screen */}
      <div className="md:hidden">
      <Box className='py-[20px]'>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label={`Planned (${planned.length})`} {...a11yProps(0)} />
    <Tab label= {`In-Progress (${inProgress.length})`} {...a11yProps(1)} />
    <Tab label={`Live  (${live.length})`} {...a11yProps(2)} />
  </Tabs>
</Box>
<CustomTabPanel value={value} index={0}>
<div className="grid gap-[32px] h-fit">
          <div className="grid">
            <p className="text-[18px] font-bold text-lightpurple">
              Planned ({planned?.length || 0})
            </p>
            <p className="text-lightpurple text-[16px] font-light">
              Ideas prioritized for research
            </p>
          </div>

          {planned?.length > 0 &&
            planned.map((val: any, index: any) => (
              <Whitebg
                className="rounded-sm border-t-[5px]  border-t-orange"
                key={index}
              >
                <RoadmapList
                  title={val.title}
                  description={val.description}
                  upvotes={val.upvotes}
                  category={val.category}
                  status={val.status}
                  comments={val.comments}
                  id={val.id}
                />
              </Whitebg>
            ))}
        </div>
</CustomTabPanel>
<CustomTabPanel value={value} index={1}>
<div className="grid gap-[32px] h-fit">
          <div className="grid">
            <p className="text-[18px] font-bold text-lightpurple">
              In-Progress ({inProgress?.length || 0})
            </p>
            <p className="text-lightpurple text-[16px] font-light">
              Ideas prioritized for research
            </p>
          </div>

          {inProgress?.length > 0 &&
            inProgress.map((val: any, index: any) => (
              <Whitebg
                className="rounded-sm border-t-[5px]  border-t-primary"
                key={index}
              >
                <RoadmapList
                  title={val.title}
                  description={val.description}
                  upvotes={val.upvotes}
                  category={val.category}
                  status={val.status}
                  comments={val.comments}
                  id={val.id}
                />
              </Whitebg>
            ))}
        </div>
</CustomTabPanel>
<CustomTabPanel value={value} index={2}>
<div className="grid gap-[32px] h-fit">
          <div className="grid">
            <p className="text-[18px] font-bold text-lightpurple">
              Live ({live?.length || 0})
            </p>
            <p className="text-lightpurple text-[16px] font-light">
              Ideas prioritized for research
            </p>
          </div>

          {live.length > 0 &&
            live.map((val: any, index: any) => (
              <Whitebg
                className="rounded-sm border-t-[5px]  border-t-lightBlue"
                key={index}
              >
                <RoadmapList
                  title={val.title}
                  description={val.description}
                  upvotes={val.upvotes}
                  category={val.category}
                  status={val.status}
                  comments={val.comments}
                  id={val.id}
                />
              </Whitebg>
            ))}
        </div>
</CustomTabPanel>

      </div>
      <div className="hidden md:grid md:grid-cols-3 gap-[30px] mt-[48px]">
        <div className="grid gap-[32px] h-fit">
          <div className="grid">
            <p className="text-[18px] font-bold text-lightpurple">
              Planned ({planned?.length || 0})
            </p>
            <p className="text-lightpurple text-[16px] font-light">
              Ideas prioritized for research
            </p>
          </div>

          {planned?.length > 0 &&
            planned.map((val: any, index: any) => (
              <Whitebg
                className="rounded-sm border-t-[5px]  border-t-orange"
                key={index}
              >
                <RoadmapList
                  title={val.title}
                  description={val.description}
                  upvotes={val.upvotes}
                  category={val.category}
                  status={val.status}
                  comments={val.comments}
                  id={val.id}
                />
              </Whitebg>
            ))}
        </div>

        <div className="grid gap-[32px] h-fit">
          <div className="grid">
            <p className="text-[18px] font-bold text-lightpurple">
              In-Progress ({inProgress?.length || 0})
            </p>
            <p className="text-lightpurple text-[16px] font-light">
              Ideas prioritized for research
            </p>
          </div>

          {inProgress?.length > 0 &&
            inProgress.map((val: any, index: any) => (
              <Whitebg
                className="rounded-sm border-t-[5px]  border-t-primary"
                key={index}
              >
                <RoadmapList
                  title={val.title}
                  description={val.description}
                  upvotes={val.upvotes}
                  category={val.category}
                  status={val.status}
                  comments={val.comments}
                  id={val.id}
                />
              </Whitebg>
            ))}
        </div>
        <div className="grid gap-[32px] h-fit">
          <div className="grid">
            <p className="text-[18px] font-bold text-lightpurple">
              Live ({live?.length || 0})
            </p>
            <p className="text-lightpurple text-[16px] font-light">
              Ideas prioritized for research
            </p>
          </div>

          {live.length > 0 &&
            live.map((val: any, index: any) => (
              <Whitebg
                className="rounded-sm border-t-[5px]  border-t-lightBlue"
                key={index}
              >
                <RoadmapList
                  title={val.title}
                  description={val.description}
                  upvotes={val.upvotes}
                  category={val.category}
                  status={val.status}
                  comments={val.comments}
                  id={val.id}
                />
              </Whitebg>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
