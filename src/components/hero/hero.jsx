import "./hero.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../navBar/navbar";
import { MainSection } from "../mainSection/MainSection";

const Notes = ({ url }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${url}/auth/verify`).then((res) => {
      if (res.data.status) {
        axios.get(`${url}/auth/data`).then((res) => {
          if (
            res.data.board === "rbse" &&
            res.data.class === 11 &&
            res.data.medium === "hindi"
          ) {
            axios.get(`${url}/notes/rbse/hindi/11`).then((res) => {
              console.log(res.data);
              setData(res.data);
            });
          } else if (
            res.data.board === "rbse" &&
            res.data.class === 11 &&
            res.data.medium === "english"
          ) {
            axios.get(`${url}/notes/rbse/english/11`).then((res) => {
              setData(res.data);
            });
          } else if (
            res.data.board === "rbse" &&
            res.data.class === 12 &&
            res.data.medium === "hindi"
          ) {
            axios.get(`${url}/notes/rbse/hindi/12`).then((res) => {
              setData(res.data);
            });
          } else if (
            res.data.board === "rbse" &&
            res.data.class === 12 &&
            res.data.medium === "english"
          ) {
            axios.get(`${url}/notes/rbse/english/12`).then((res) => {
              setData(res.data);
            });
          } else if (res.data.board === "cbse" && res.data.class === 11) {
            axios.get(`${url}/notes/cbse/11`).then((res) => {
              setData(res.data);
            });
          } else if (res.data.board === "cbse" && res.data.class === 12) {
            axios.get(`${url}/notes/cbse/12`).then((res) => {
              setData(res.data);
            });
          }
        });
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <div className="dashBoard">
        <Navbar url={url}></Navbar>

        {data.length === 0 && <h1 className="h11">Loading...</h1>}
        {data.map((item) => {
          return (
            <MainSection
              key={item.chapNum}
              chapName={item.title}
              chapNum={item.chapter}
              content={item.content}
              img_name={item.img_name}
              fileName={item.fileName}
              url1={url}
            ></MainSection>
          );
        })}
      </div>
    </>
  );
};
export default Notes;
