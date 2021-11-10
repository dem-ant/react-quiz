import React, {Component} from "react"
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import {createControl} from '../../form/formFramework'

export default class QuizCreator extends Component {

  state = {
    quiz: [],
    formControls: {
      question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {required: true}),
      option1: createControl({
        label: 'Вариант 1',
        errorMessage: 'Значение не может быть пустым'
      }, {required: true}),
      option2: '',
      option3: '',
      option4: '',
    }
  }

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = () => {

  }

  createQuizHandler = () => {
    
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>

            <input type='text' />
            <hr />
            <input type='text' />
            <input type='text' />
            <input type='text' />
            <input type='text' />

            <select></select>

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
            >
              Добавить вопрос
            </Button>
            <Button
              type='success'
              onClick={this.createQuizHandler()}
            >
              Создать вопрос
            </Button>
          </form>
        </div>

      </div>
    )
  }
}