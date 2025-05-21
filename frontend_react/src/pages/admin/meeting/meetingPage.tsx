import Header from "../../../components/header/header";
import Calender from "../../../components/calender/calender";
import Sidebar from "../../../components/sidebar/sidebar";
import { GOOGLE_CALENDER_ID } from "../../../config";


const MeetingPage:React.FC = () => {
    
  return (
    <>
      <Header title="トップ" />
      <div
        style={{
          display: "flex",
          height: "calc(100vh - 60px)",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        <Sidebar />
        <div
          style={{
            flex: 1,
            padding: "2rem",
            overflow: "auto",
            minWidth: 0,
            boxSizing: "border-box",
            maxHeight: "100%",
          }}
        >
          <Calender calenderId={GOOGLE_CALENDER_ID} />
        </div>
      </div>
    </>
  );
}

export default MeetingPage;