import img from '../assets/images/not-found.png'

import {Link} from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
const Error = () => {

  return (
    <Card>
        <div className="full-page">
          <Image src = {img} alt ='not found' />
            <h3>Ohh! Page is Not Found</h3>
            <p>We can't seem to find the page you're looking for</p>
            <Link to='/'> Back Home</Link>
        </div>
    </Card>
  )
}

export default Error