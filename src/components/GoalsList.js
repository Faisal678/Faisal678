import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getGoals, reset } from '../redux/goals/goalSlice'
import Spinner from './Spinner'

const GoalsList = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)
  console.log("🚀 ~ file: GoalsList.js:12 ~ GoalsList ~ goal", goals)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='mt-3'>
      <div className='card col-6 offset-3'>
        <div className='card-body'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Gaol</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {goals && goals.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item?.text}</td>
                    <td>{item?.createdAt}</td>
                    <td>action</td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default GoalsList