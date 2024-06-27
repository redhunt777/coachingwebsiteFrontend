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
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${url}/auth/verify`)
      .then((res) => {
        if (res.data.status) {
          if (
            res.data.board === "rbse" &&
            res.data.class === 11 &&
            res.data.medium === "hindi"
          ) {
            axios
              .get(`${url}/notes/rbse/hindi/11`)
              .then((res) => {
                setLoader(false);
                setData(res.data);
              })
              .catch((err) => {
                setLoader(false);
                console.log(err);
              });
          } else if (
            res.data.board === "rbse" &&
            res.data.class === 11 &&
            res.data.medium === "english"
          ) {
            axios
              .get(`${url}/notes/rbse/english/11`)
              .then((res) => {
                setLoader(false);
                setData(res.data);
              })
              .catch((err) => {
                setLoader(false);
                console.log(err);
              });
          } else if (
            res.data.board === "rbse" &&
            res.data.class === 12 &&
            res.data.medium === "hindi"
          ) {
            axios
              .get(`${url}/notes/rbse/hindi/12`)
              .then((res) => {
                setLoader(false);
                setData(res.data);
              })
              .catch((err) => {
                setLoader(false);
                console.log(err);
              });
          } else if (
            res.data.board === "rbse" &&
            res.data.class === 12 &&
            res.data.medium === "english"
          ) {
            axios
              .get(`${url}/notes/rbse/english/12`)
              .then((res) => {
                setLoader(false);
                setData(res.data);
              })
              .catch((err) => {
                setLoader(false);
                console.log(err);
              });
          } else if (res.data.board === "cbse" && res.data.class === 11) {
            axios
              .get(`${url}/notes/cbse/11`)
              .then((res) => {
                setLoader(false);
                setData(res.data);
              })
              .catch((err) => {
                setLoader(false);
                console.log(err);
              });
          } else if (res.data.board === "cbse" && res.data.class === 12) {
            axios
              .get(`${url}/notes/cbse/12`)
              .then((res) => {
                setLoader(false);
                setData(res.data);
              })
              .catch((err) => {
                setLoader(false);
                console.log(err);
              });
          } else {
            setLoader(false);
            navigate("/login");
          }
        } else {
          setLoader(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoader(false);
        navigate("/login");
      });
  }, []);

  return (
    <>
      <div className="dashBoard">
        <Navbar url={url}></Navbar>

        {loader ? (
          <div className="loader">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {data.length === 0 && (
              <h1 className="h11">
                There is no content uploaded yet, to display here.
              </h1>
            )}
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
          </>
        )}
      </div>
    </>
  );
};
export default Notes;
