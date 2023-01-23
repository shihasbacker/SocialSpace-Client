// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import { Link } from "react-router-dom";
import { getUser, getUserData } from "../../Api/UserRequest";
import { useDispatch } from "react-redux";

const LogoSearch = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const setUser = (person) => {
    dispatch(getUser(person._id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getUserData(query);
      console.log(data, "kitti");
      setData(data);
    };
    if (query.length >= 1) fetchData();
  }, [query]);

  return (
    <div className="LogoSearch dropdown">
      <img src={Logo} alt="" />
               
      <div class="dropdown-content">
        {/* {place === "chatPage" ?data.map((person)=>(
        <>
      <p onClick={()=>setNewUser(person)} style={{cursor:"pointer"}}>{person.firstname}</p>
      <hr />
      </>
      )): */}
        {data.map((person) => (
          <>
            <Link
              key={person._id}
              onClick={() => setUser(person)}
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${person._id}`}
            >
              {person.firstname}
            </Link>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default LogoSearch;
