import "./Home.css";
import { useState, useEffect } from "react";
import MainPanel from "../../components/MainPanel/MainPanel";
import APIFetch from '../../utils/APIFetch';

function Home() {
  const [resp, setResp] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch("getHome");
      setResp(data);
    };
    fetchData();
  }, []);

  return (
    <div className="Home">
      {resp && <MainPanel data={resp} />}
    </div>
  );
}

export default Home;
