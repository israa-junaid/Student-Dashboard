import React, {createContext, useState} from "react";
export const StudentDataContext = createContext();
import PropTypes from "prop-types";
import axios from "axios";
export const StudentDataProvider = ({children}) => {
  const [test, settest] = useState(false);

  //***STATE VALUES FOR THE FORM */
  const [val, setval] = useState({
    s_organization: "",
    s_leader: "",
    s_batch: "",
    s_internal: "",
    s_name1: "",
    s_name2: "",
    s_name3: "",
    internal_designation: "",
    s_external: "",
    external_designation: "",
    externalAdvisorAddress: "",
    externalAdvisorContactNo: "",
    orgDomain: "",
    orgAddress: "",
    orgContactNo: "",
    s_proj_title: "",
    group_count: 1,
    s_status: "true",
    stu1_id: "",
    stu2_id: "",
    stu3_id: "",
    isINVITE:""
  });
  const [bool, setbool] = useState(0);

  //STATE FOR GROUP1 MEMBER EMAIL AND CONTACTION
  const [mem1, setmem1] = useState({
    email: "example@gmail.com",
    contact: "0331-xxxxxxxxx",
    name: "abc--xyz",
  });
  //STATE FOR GROUP2 MEMBER EMAIL AND CONTACTION
  const [mem2, setmem2] = useState({
    email: "example@gmail.com",
    contact: "0331-xxxxxxxxx",
    name: "abc--xyz",
  });
  //STATE FOR GROUP3 MEMBER EMAIL AND CONTACTION
  const [mem3, setmem3] = useState({
    email: "example@gmail.com",
    contact: "0331-xxxxxxxxx",
    name: "abc--xyz",
  });
//Invite variable setting 
const [isINVITE, setisINVITE] = useState("");


  //****************STATE VALUE FOR STORING ALL STUDENT NAMES */
  const [nameslist, setnameslist] = useState([]);
  ///***FOR STORING FORM VALUES */
  const handleChange = (e) => {
    console.log("handleChange");
    const name = e.target.name;
    const value = e.target.value;
    setval((ev) => {
      return {...ev, [name]: value};
    });
  };
  // *** TO STORE ROLL NO AND FETCH DATA AS PER ROLL NO
  const handleGroup = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setval((ev) => {
      return {...ev, [name]: value};
    });

    // *** WHEN ROLL IS NO VALID SEND FETCH REQUEST AS PER ROLL NO
    if (value.length >= 8) {
      axios
        .get(`/student/${value}`)
        .then((res) => {
          console.log(res);
          const {s_name, email, contact} = res.data;
          if (name == "stu1_id") {
            setmem1({
              contact,
              email,
              name: s_name,
            });
          } else if (name == "stu2_id") {
            setmem2({contact, email, name: s_name});
          } else if (name == "stu3_id") {
            setmem3({contact, email, name: s_name});
          }
        })
        .catch((err) => {
          if (name == "stu1_id") {
            setmem1({
              email: "Not found",
              contact: "NOT found",
              name: "Not found",
            });
          } else if (name == "stu2_id") {
            setmem2({
              email: "Not found",
              contact: "NOT found",
              name: "Not found",
            });
          } else if (name == "stu3_id") {
            setmem3({
              email: "Not found",
              contact: "NOT found",
              name: "Not found",
            });
          }
        });
    }
  };
  const value = {
    test: test,
    settest: settest,
    testing: [test, settest],
    val: val,
    setval: setval,
    handleChange: handleChange,
    mem1: mem1,
    setmem1: setmem1,
    mem2: mem2,
    setmem2: setmem2,
    mem3: mem3,
    setmem3: setmem3,
    handleGroup: handleGroup,
    nameslist: nameslist,
    setnameslist: setnameslist,
    bool:bool,
    setbool :setbool
    
  };
  return (
    <StudentDataContext.Provider value={value}>
      {children}
    </StudentDataContext.Provider>
  );
};

StudentDataProvider.propTypes = {
  children: PropTypes.any,
};
