import { Col, Row } from "react-bootstrap";
import { Footer } from "../components";
import Header from "../components/Header";

const Landing = () => {
  return (
    <>
      <Header />
     <Col md={7}>
      <lottie-player
        src="https://assets3.lottiefiles.com/packages/lf20_zjycbtqy.json"
        background="transparent"
        speed="1"
       
        loop
        // controls
        autoplay
      ></lottie-player>
      </Col>
      <Footer />
    </>
  );
};
export default Landing;
