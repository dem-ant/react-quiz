import React, {Component} from "react"
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {createControl} from '../../form/formFramework'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

function createOptionControl(numer) {
  return createControl({
    label: `Вариант ${numer}`,
    errorMessage: 'Значение не может быть пустым'
  }, {required: true})
}

function createFormControls() {
  return {
    question: createControl({
    label: 'Введите вопрос',
    errorMessage: 'Вопрос не может быть пустым'
  }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}
export default class QuizCreator extends Component {

  state = {
    quiz: [],
    rightAnswerId: 1,
    formControls: createFormControls()
  }

  submitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = () => {

  }

  createQuizHandler = () => {
    
  }

  onChangeHandler = (value, controlName) => {

  }

  renderConstrols() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event => this.onChangeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      )
    })
  }

  selectChengeHandler = event => {
    console.log(event.target.value)
  }

  render() {
    const select = <Select 
      label='Выберите правильный ответ'
      value={this.state.rightAnswerId}
      onChange={this.selectChengeHandler}
      optipons={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />


    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>

            {this.renderConstrols()}

            {select}

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