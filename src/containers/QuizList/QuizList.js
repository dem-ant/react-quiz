import React, {Component} from "react"
import { NavLink } from "react-router-dom"
import classes from './QuizList.module.css'
import axios from '../../axios/axiosQuiz'
import map from 'lodash/map'
import Loader from "../../components/UI/Loader/Loader"

export default class QuizList extends Component {

  state = {
    quizes: [],
    loading: true
  }

  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {
    try {
      const response = await axios.get('quizes.json')

      const quizes = []
      for (const key in response.data) {
        quizes.push({
          id: key,
          name: map(response.data[key], 'question')
        })
      }

      this.setState({
        quizes,
        loading: false
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>
            Список тестов
          </h1>
          {
            this.state.loading 
              ? <Loader />
              : <ul>
                  {this.renderQuizes()}
                </ul>
          }
        </div>
      </div>
    )
  }
}