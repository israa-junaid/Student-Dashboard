import React, {useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
//import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
//import DateRange from "@material-ui/icons/DateRange";
//import LocalOffer from "@material-ui/icons/LocalOffer";
//import Update from "@material-ui/icons/Update";
//import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
import EmailIcon from "@material-ui/icons/Email";
import AssistantIcon from "@material-ui/icons/Assistant";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import FormatListNumberedRtlIcon from "@material-ui/icons/FormatListNumberedRtl";
import DoneAllIcon from "@material-ui/icons/DoneAll";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CompletedTask from "components/Tasks/CompletedTask.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
//import Quote from "components/Typography/Quote.js";
//import Success from "components/Typography/Success.js";
import WarningColor from "components/Typography/Warning.js";
import Info from "components/Typography/Info.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import { bugs, website, server } from "variables/general.js";
import {bugs, website} from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Success from "components/Typography/Success";

import {Link} from "react-router-dom";
//import {NavLink} from "react-router-dom";
import {useDispatch, connect, useSelector} from "react-redux";
import axios from "axios";
// import Userdata from "../../ApiStore/Userdata";
import {useHistory} from "react-router-dom";
import {LOGIN_SUCCESS, LOGIN_FAIL} from "../../ReduxStore/Actions";
const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  //*******************useefffect */
  //function callled in useeffect********************/

  const authy = async () => {
    await axios
      .get("/student/about")
      .then((res) => {
        const {
          personid,
          name,
          isSUBMIT,
          isACCEPTED,
          isINVITE,
          email,
          contact,
          department,
        } = res.data;
        // ********************************DISPATCHING ACTION IN CASE OF LOGIN SUCCESS****************/
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            auth: true,
            id: personid,
            name: name,
            isSUBMIT,
            isACCEPTED,
            isINVITE,
            email,
            department,
            contact,
          },
        });
      })
      .catch((err) => {
        // ***dispatching an action in case of LOGIN FAIL
        dispatch({
          type: LOGIN_FAIL,
          payload: {
            auth: false,
            id: "",
            name: "",
            email: "",
            contact: "",
            department: "",
            isSUBMIT: false,
            isACCEPTED: false,
            isINVITE: false,
          },
        });
        history.push("/auth/login");
      });
  };
  useEffect(() => {
    authy();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Submissions</p>
              <h3 className={classes.cardTitle}>
                0/10 <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <WarningColor>
                  <LabelImportantIcon />
                </WarningColor>
                Marked Submissions
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Next Submission</p>
              <h3 className={classes.cardTitle}>Proposal</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Submit Form
                </a> */}
                <Link to="../admin/form">Submit Form</Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <AssistantIcon />
              </CardIcon>
              <p className={classes.cardCategory}>External Advisor</p>
              <h3 className={classes.cardTitle}>Mr. Mehdi</h3>
            </CardHeader>
            {/* <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                <EmailIcon />
                www.mehdirajani@gmail.com
              </div>
            </CardFooter> */}
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <EmailIcon />
                </Success>
                www.mehdirajani@gmail.com
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Internal Advisor</p>
              <h3 className={classes.cardTitle}>Dr. Shariq</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Info>
                  <EmailIcon />
                </Info>
                www.shariqmehmood@gmail.com
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Weekly Tracker</h4>
              <p className={classes.cardCategory}>Weekly Progress Reports</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Monthly Tracker</h4>
              <p className={classes.cardCategory}>Monthly Progress Reports</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Updated on June 30,2020
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        {/* <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem> */}

        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="ToDo List:"
            headerColor="primary"
            tabs={[
              {
                tabName: "ToDo",
                tabIcon: FormatListNumberedRtlIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Completed",
                tabIcon: DoneAllIcon,
                tabContent: (
                  <CompletedTask
                    //checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              // {
              //   tabName: "Server",
              //   tabIcon: Cloud,
              //   tabContent: (
              //     <Tasks
              //       checkedIndexes={[1]}
              //       tasksIndexes={[0, 1, 2]}
              //       tasks={server}
              //     />
              //   ),
              // },
            ]}
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Group Details</h4>
              <p className={classes.cardCategoryWhite}>
                Members details and their status
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Roll No.", "Status"]}
                tableData={[
                  ["1", "Mehdi Rajani", "CT-18054", "Group Leader"],
                  ["2", "Kissa e Zehra", "CT-18022", "Group Member"],
                  ["3", "Zahra", "CT-18061", "Group Member"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
