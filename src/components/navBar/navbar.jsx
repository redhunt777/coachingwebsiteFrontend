import "./navBar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import SideBar from "./SideBar";
import ToggleButton from "./toggleButton";
import { useState } from "react";

const variance = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      delay: 0.1,
      stiffness: 70,
      damping: 40,
    },
  },
  close: {
    clipPath: "circle(30px at 50px 50px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 300,
      damping: 40,
    },
  },
};

export const Navbar = ({ url }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleNcert = () => {
    navigate("/ncert");
  };

  const handleNotes = () => {
    navigate("/");
  };

  const handlePyqs = () => {
    navigate("/pyqs");
  };

  const handleDpp = () => {
    navigate("/dpp");
  };

  const handleSyllabus = async () => {
    axios.get(`${url}/auth/data`).then(async (res) => {
      // Mark the callback function as async
      const data1 = res.data;
      axios.post(`${url}/syllabus`, data1).then(async (res) => {
        // Mark the callback function as async
        const fileName = res.data[0].fileName;
        if (fileName === undefined) {
          alert("Syllabus is not uploaded yet! Please try again later");
          return;
        }
        try {
          const response = await axios.get(`${url}/files/${fileName}`, {
            responseType: "blob", // Important: responseType 'blob' for binary data
          });

          // Create a blob URL for the file data
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const urlLocal = window.URL.createObjectURL(blob);
          // Create a link element and click it to trigger the download
          const a = document.createElement("a");
          a.href = urlLocal;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (error) {
          console.log("Error downloading file:", error);
          alert("Failed to download file.");
        }
      });
    });
  };

  return (
    <>
      <div className="navBar">
        <h2>Akshay's Classes</h2>
        <button className="btn btn-primary" onClick={handleProfile}>
          Profile
        </button>
      </div>

      <div className="subNavbar">
        <motion.button
          onClick={handleNotes}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Notes
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={handleSyllabus}
        >
          Download Syllabus
        </motion.button>

        <motion.button
          onClick={handleNcert}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Ncert
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleDpp()}
        >
          Daily Practice Problem(DPP)
        </motion.button>
        <motion.button
          onClick={handlePyqs}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Pyqs
        </motion.button>
      </div>

      <motion.div
        className="sideBar"
        animate={open ? "open" : "close"}
        initial="close"
        variants={variance}
      >
        <ToggleButton setOpen={setOpen}></ToggleButton>
        <SideBar
          handleDpp={handleDpp}
          handleNcert={handleNcert}
          handleSyllabus={handleSyllabus}
          handleNotes={handleNotes}
          handlePyqs={handlePyqs}
          state={open}
          setOpen={setOpen}
        ></SideBar>
      </motion.div>
      <div className="design"></div>
    </>
  );
};
