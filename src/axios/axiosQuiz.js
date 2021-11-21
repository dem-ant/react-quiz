import axios  from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-363ff-default-rtdb.firebaseio.com/'
  }
)